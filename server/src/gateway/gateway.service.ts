import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gateway, GatewayDocument } from 'src/schemas';
import { Humidity, HumidityDocument } from 'src/schemas';
import { Model } from 'mongoose';
import { createGateWayDto, GatewaySaveHumidityDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class GatewayService {
  constructor(
    @InjectModel(Gateway.name) private gatewayModel: Model<GatewayDocument>,
    @InjectModel(Humidity.name) private humidityModel: Model<HumidityDocument>,
  ) {}
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

  async getAllGateways() {
    const gateways = await this.gatewayModel.find({});
    return gateways;
  }

  async deleteGateway(id: string) {
    const user = await this.gatewayModel.findByIdAndDelete(id);
    return user;
  }

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

  async getHumidity(id: string) {
    try {
      const gwData = await this.humidityModel.find({ gw: id });
      return gwData;
    } catch (error) {
      if (error) {
        return new BadRequestException('Not GW id!');
      }
    }
  }
}
