import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Gateway,
  GatewayDocument,
  Humidity,
  HumidityDocument,
  Temperature,
  TemperatureDocument,
} from "../schemas"
import { Model } from 'mongoose';
import {
  createGateWayDto,
  GatewaySaveHumidityDto,
  GatewaySaveTemperatureDto,
} from './dto';
import * as argon from 'argon2';
@Injectable()
export class GatewayService {
  constructor(
    @InjectModel(Gateway.name) private gatewayModel: Model<GatewayDocument>,
    @InjectModel(Humidity.name) private humidityModel: Model<HumidityDocument>,
    @InjectModel(Temperature.name)
    private temperatureModel: Model<TemperatureDocument>,
  ) {}
  /**
   * @param dto
   * @returns created gateway
   */
  async createGateway(dto: createGateWayDto) {
    const doesSuchANameExist = await this.gatewayModel.find({
      name: [dto.name],
    });
    if (doesSuchANameExist.length)
      return new BadRequestException('The Name must be unique');

    const hashed = await argon.hash(dto.password);
    dto.password = hashed;
    const gateway = await this.gatewayModel.create(dto);
    return gateway;
  }

  /**
   * @returns list of all gateways
   */
  async getAllGateways() {
    const gateways = await this.gatewayModel.find({}).select("-password");
    return gateways;
  }

  /**
   * @param id
   * @returns delets gateway based on ID
   */
  async deleteGateway(id: string) {
    const user = await this.gatewayModel.findByIdAndDelete(id);
    return user;
  }

  /**
   *
   * @param data
   * @returns created humidity documents
   */
  async saveHumidity(data: GatewaySaveHumidityDto) {
    try {
      const savedHumidity = await this.humidityModel.insertMany(data);
      if (!savedHumidity) {
        throw new InternalServerErrorException(
          'Humidity could not be saved - internal server error',
        );
      }
      savedHumidity.forEach((doc) => {
        doc.wasSent = true;
      });
      return savedHumidity;
    } catch (error: any) {
      if (error) return new InternalServerErrorException(error.message);
    }
  }

  /**
   *
   * @param data
   * @returns created temperature documents
   */
  async saveTemperature(data: GatewaySaveTemperatureDto) {
    try {
      const savedTemperature = await this.temperatureModel.insertMany(data);
      if (!savedTemperature) {
        throw new InternalServerErrorException(
          'Temperature could not be saved - internal server error',
        );
      }
      savedTemperature.forEach((doc) => {
        doc.wasSent = true;
      });
      return savedTemperature;
    } catch (error: any) {
      if (error) return new InternalServerErrorException(error.message);
    }
  }

  /**
   * @param id (gw id)
   * @returns all GW humidity values based on GW ID and date range
   */
  async getHumidity(id: string, startDate: any, endDate: any) {
    try {
      const sDate = new Date(startDate).toISOString();
      const eDate = new Date(
        new Date(endDate).setHours(23, 59, 59),
      ).toISOString();
      const diffTime: any = Math.abs(
        //@ts-ignore
        new Date(startDate) - new Date(endDate),
      );
      const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 0) {
        const gwData = await this.humidityModel
          .find({
            gw: id,
            date: {
              $gte: sDate,
              $lte: diffDays > 0 && eDate,
            },
          })
          .sort({ date: 1 });

        if (!gwData) throw new BadRequestException('gw not found');

      

        return gwData;
      } else if (diffDays > 0 && diffDays < 7) {
        const gwData = await this.humidityModel
          .aggregate([
            {
              $match: {
                date: {
                  $gte: sDate,
                  $lte: eDate,
                },
              },
            },
            {
              $addFields: {
                y: {
                  $substr: ['$date', 0, 4],
                },
                m: {
                  $substr: ['$date', 5, 2],
                },
                d: {
                  $substr: ['$date', 8, 2],
                },
                h: {
                  $substr: ['$date', 11, 2],
                },
              },
            },
            {
              $group: {
                _id: {
                  gw: '$gw',
                  y: '$y',
                  m: '$m',
                  d: '$d',
                  h: '$h',
                },
                count: {
                  $sum: 1,
                },
                humidity: {
                  $avg: '$humidity',
                },
              },
            },
            {
              $addFields: {
                gw: '$_id.gw',
              },
            },
            {
              $addFields: {
                _id: {
                  $concat: [
                    '$_id.y',
                    '-',
                    '$_id.m',
                    '-',
                    '$_id.d',
                    'T',
                    '$_id.h',
                    ':00',
                    ':00Z',
                  ],
                },
              },
            },
            {
              $addFields: {
                date: '$_id',
              },
            },
          ])
          .sort({ date: 1 });
        if (!gwData) throw new BadRequestException('gw not found');
        return gwData;
      } else {
        const gwData = await this.humidityModel
          .aggregate([
            {
              $match: {
                date: {
                  $gte: sDate,
                  $lte: eDate,
                },
              },
            },
            {
              $group: {
                _id: {
                  gw: '$gw',
                  date: {
                    $substr: ['$date', 0, 10],
                  },
                },
                count: {
                  $sum: 1,
                },
                humidity: {
                  $avg: '$humidity',
                },
              },
            },
            {
              $addFields: {
                gw: '$_id.gw',
                date: '$_id.date',
              },
            },
          ])
          .sort({ date: 1 });

        if (!gwData) throw new BadRequestException('gw not found');
        return gwData;
      }
    } catch (error) {
      if (error) {
        return new BadRequestException('Not GW id!');
      }
    }
  }

  /**
   *
   * @param id (gw id)
   * @returns all GW temperature values based on GW ID and date range
   */
  async getTemperature(id: string, startDate: string, endDate: string) {
    try {
      const sDate = new Date(startDate).toISOString();
      const eDate = new Date(
        new Date(endDate).setHours(23, 59, 59),
      ).toISOString();
      const diffTime: any = Math.abs(
        //@ts-ignore
        new Date(startDate) - new Date(endDate),
      );
      const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        const gwData = await this.temperatureModel
          .find({
            gw: id,
            date: {
              $gte: sDate,
              $lte: diffDays > 0 && eDate,
            },
          })
          .sort({ date: 1 });

        if (!gwData) throw new BadRequestException('gw not found');
        return gwData;
      } else if (diffDays > 0 && diffDays < 7) {
        const gwData = await this.temperatureModel
          .aggregate([
            {
              $match: {
                date: {
                  $gte: sDate,
                  $lte: eDate,
                },
              },
            },
            {
              $addFields: {
                y: {
                  $substr: ['$date', 0, 4],
                },
                m: {
                  $substr: ['$date', 5, 2],
                },
                d: {
                  $substr: ['$date', 8, 2],
                },
                h: {
                  $substr: ['$date', 11, 2],
                },
              },
            },
            {
              $group: {
                _id: {
                  gw: '$gw',
                  y: '$y',
                  m: '$m',
                  d: '$d',
                  h: '$h',
                },
                count: {
                  $sum: 1,
                },
                temperature: {
                  $avg: '$temperature',
                },
              },
            },
            {
              $addFields: {
                gw: '$_id.gw',
              },
            },
            {
              $addFields: {
                _id: {
                  $concat: [
                    '$_id.y',
                    '-',
                    '$_id.m',
                    '-',
                    '$_id.d',
                    'T',
                    '$_id.h',
                    ':00',
                    ':00Z',
                  ],
                },
              },
            },
            {
              $addFields: {
                date: '$_id',
              },
            },
          ])
          .sort({ date: 1 });
        if (!gwData) throw new BadRequestException('gw not found');
        return gwData;
      } else {
        const gwData = await this.temperatureModel
          .aggregate([
            {
              $match: {
                date: {
                  $gte: sDate,
                  $lte: eDate,
                },
              },
            },
            {
              $group: {
                _id: {
                  gw: '$gw',
                  date: {
                    $substr: ['$date', 0, 10],
                  },
                },
                count: {
                  $sum: 1,
                },
                temperature: {
                  $avg: '$temperature',
                },
              },
            },
            {
              $addFields: {
                gw: '$_id.gw',
                date: '$_id.date',
              },
            },
          ])
          .sort({ date: 1 });

        if (!gwData) throw new BadRequestException('gw not found');
        return gwData;
      }
    } catch (error) {
      if (error) {
        return new BadRequestException('Not GW id!');
      }
    }
  }
}
