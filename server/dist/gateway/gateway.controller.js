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
exports.GatewayController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const passport_1 = require("@nestjs/passport");
const gateway_service_1 = require("./gateway.service");
const decorators_1 = require("../auth/decorators");
const decorators_2 = require("./decorators");
let GatewayController = class GatewayController {
    constructor(gateWayService) {
        this.gateWayService = gateWayService;
    }
    saveHumidity(body, gateway) {
        const humidityArray = body.map((h) => {
            h.gw = gateway;
            return h;
        });
        return this.gateWayService.saveHumidity(humidityArray);
    }
    saveTemperature(body, gateway) {
        const temperatureArray = body.map((h) => {
            h.gw = gateway;
            return h;
        });
        return this.gateWayService.saveTemperature(temperatureArray);
    }
    async createGateWay(dto, user) {
        dto.creator = user.user.name + ' ' + user.user.surname;
        const gateway = await this.gateWayService.createGateway(dto);
        return gateway;
    }
    async getAllGateways() {
        const gateways = await this.gateWayService.getAllGateways();
        return gateways;
    }
    async deleteGateway(id) {
        const user = await this.gateWayService.deleteGateway(id);
        return user;
    }
    async getGateWayHumidityData(body) {
        const sDate = new Date(body.startDate).toISOString().split('T')[0];
        const eDate = new Date(body.endDate).toISOString().split('T')[0];
        if (sDate > eDate)
            throw new common_1.BadRequestException('Bad date range');
        const data = await this.gateWayService.getHumidity(body.id, sDate, eDate);
        return data;
    }
    async getGateWayTemperatureData(body) {
        const sDate = new Date(body.startDate).toISOString().split('T')[0];
        const eDate = new Date(body.endDate).toISOString().split('T')[0];
        if (sDate > eDate)
            throw new common_1.BadRequestException('Bad date range');
        const data = await this.gateWayService.getTemperature(body.id, sDate, eDate);
        return data;
    }
};
__decorate([
    (0, common_1.Post)('save/humidity'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwtgateway')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_2.getGateway)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "saveHumidity", null);
__decorate([
    (0, common_1.Post)('save/temperature'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwtgateway')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_2.getGateway)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "saveTemperature", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwtadmin')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.getUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.createGateWayDto, Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "createGateWay", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getAllGateways", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwtadmin')),
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "deleteGateway", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('data/humidity/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getGateWayHumidityData", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)('data/temperature/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GatewayController.prototype, "getGateWayTemperatureData", null);
GatewayController = __decorate([
    (0, common_1.Controller)('gateway'),
    __metadata("design:paramtypes", [gateway_service_1.GatewayService])
], GatewayController);
exports.GatewayController = GatewayController;
//# sourceMappingURL=gateway.controller.js.map