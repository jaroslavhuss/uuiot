import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gateway, GatewayDocument } from 'src/schemas';
import { Value, ValueDocument } from 'src/schemas';
import { Model } from 'mongoose';
import { createGateWayDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class GatewayService {
  constructor(
    @InjectModel(Gateway.name) private gatewayModel: Model<GatewayDocument>,
    @InjectModel(Value.name) private valueModel: Model<ValueDocument>,
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

  async saveGateWayData(
    data: { teplota: number; date: string; vlhkost: number; gw: string }[],
  ) {
    const savedData = await this.valueModel.insertMany(data);
    if (!savedData) return false;
    return true;
  }

  async getGatewayData(id: string) {
    try {
      const gwData = await this.valueModel.find({ gw: id });
      return gwData;
    } catch (error) {
      if (error) {
        return new BadRequestException('Not GW id!');
      }
    }
  }
}
