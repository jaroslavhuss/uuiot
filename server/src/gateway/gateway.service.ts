import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Gateway, GatewayDocument } from 'src/schemas';
import { Model } from 'mongoose';
import { createGateWayDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class GatewayService {
  constructor(
    @InjectModel(Gateway.name) private gatewayModel: Model<GatewayDocument>,
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
}
