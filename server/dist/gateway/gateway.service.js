"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("../schemas");
const mongoose_2 = require("mongoose");
const argon = require("argon2");
let GatewayService = class GatewayService {
    constructor(gatewayModel, humidityModel, temperatureModel) {
        this.gatewayModel = gatewayModel;
        this.humidityModel = humidityModel;
        this.temperatureModel = temperatureModel;
    }
    async createGateway(dto) {
        const doesSuchANameExist = await this.gatewayModel.find({
            name: [dto.name],
        });
        if (doesSuchANameExist.length)
            return new common_1.BadRequestException('The Name must be unique');
        const hashed = await argon.hash(dto.password);
        dto.password = hashed;
        const gateway = await this.gatewayModel.create(dto);
        return gateway;
    }
    async getAllGateways() {
        const gateways = await this.gatewayModel.find({}).select("-password");
        return gateways;
    }
    async deleteGateway(id) {
        const user = await this.gatewayModel.findByIdAndDelete(id);
        return user;
    }
    async saveHumidity(data) {
        try {
            const savedHumidity = await this.humidityModel.insertMany(data);
            if (!savedHumidity) {
                throw new common_1.InternalServerErrorException('Humidity could not be saved - internal server error');
            }
            savedHumidity.forEach((doc) => {
                doc.wasSent = true;
            });
            return savedHumidity;
        }
        catch (error) {
            if (error)
                return new common_1.InternalServerErrorException(error.message);
        }
    }
    async saveTemperature(data) {
        try {
            const savedTemperature = await this.temperatureModel.insertMany(data);
            if (!savedTemperature) {
                throw new common_1.InternalServerErrorException('Temperature could not be saved - internal server error');
            }
            savedTemperature.forEach((doc) => {
                doc.wasSent = true;
            });
            return savedTemperature;
        }
        catch (error) {
            if (error)
                return new common_1.InternalServerErrorException(error.message);
        }
    }
    async getHumidity(id, startDate, endDate) {
        try {
            const sDate = new Date(startDate).toISOString();
            const eDate = new Date(new Date(endDate).setHours(23, 59, 59)).toISOString();
            const diffTime = Math.abs(new Date(startDate) - new Date(endDate));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
                if (!gwData)
                    throw new common_1.BadRequestException('gw not found');
                return gwData;
            }
            else if (diffDays > 0 && diffDays < 7) {
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
                if (!gwData)
                    throw new common_1.BadRequestException('gw not found');
                return gwData;
            }
            else {
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
                if (!gwData)
                    throw new common_1.BadRequestException('gw not found');
                return gwData;
            }
        }
        catch (error) {
            if (error) {
                return new common_1.BadRequestException('Not GW id!');
            }
        }
    }
    async getTemperature(id, startDate, endDate) {
        try {
            const sDate = new Date(startDate).toISOString();
            const eDate = new Date(new Date(endDate).setHours(23, 59, 59)).toISOString();
            const diffTime = Math.abs(new Date(startDate) - new Date(endDate));
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
                if (!gwData)
                    throw new common_1.BadRequestException('gw not found');
                return gwData;
            }
            else if (diffDays > 0 && diffDays < 7) {
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
                if (!gwData)
                    throw new common_1.BadRequestException('gw not found');
                return gwData;
            }
            else {
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
                if (!gwData)
                    throw new common_1.BadRequestException('gw not found');
                return gwData;
            }
        }
        catch (error) {
            if (error) {
                return new common_1.BadRequestException('Not GW id!');
            }
        }
    }
};
GatewayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Gateway.name)),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.Humidity.name)),
    __param(2, (0, mongoose_1.InjectModel)(schemas_1.Temperature.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], GatewayService);
exports.GatewayService = GatewayService;
//# sourceMappingURL=gateway.service.js.map