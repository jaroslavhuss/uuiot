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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayID = exports.GatewayLogInDto = exports.createGateWayDto = exports.GatewaySaveTemperatureDto = exports.GatewaySaveHumidityDto = exports.GatewaySaveDto = void 0;
const class_validator_1 = require("class-validator");
class GatewaySaveDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GatewaySaveDto.prototype, "gatewayName", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GatewaySaveDto.prototype, "temp", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GatewaySaveDto.prototype, "hum", void 0);
exports.GatewaySaveDto = GatewaySaveDto;
class GatewaySaveHumidityDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GatewaySaveHumidityDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GatewaySaveHumidityDto.prototype, "humidity", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], GatewaySaveHumidityDto.prototype, "wasSent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GatewaySaveHumidityDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GatewaySaveHumidityDto.prototype, "gw", void 0);
exports.GatewaySaveHumidityDto = GatewaySaveHumidityDto;
class GatewaySaveTemperatureDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GatewaySaveTemperatureDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GatewaySaveTemperatureDto.prototype, "temperature", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Boolean)
], GatewaySaveTemperatureDto.prototype, "wasSent", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GatewaySaveTemperatureDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GatewaySaveTemperatureDto.prototype, "gw", void 0);
exports.GatewaySaveTemperatureDto = GatewaySaveTemperatureDto;
class createGateWayDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3, { message: 'Name must have at least 3 letters!' }),
    __metadata("design:type", String)
], createGateWayDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6, { message: 'Minimum length is 6 with special characters' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Maximum length is 20' }),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak - it has to contain at least one Capital Letter and one number.',
    }),
    __metadata("design:type", String)
], createGateWayDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], createGateWayDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], createGateWayDto.prototype, "creator", void 0);
exports.createGateWayDto = createGateWayDto;
class GatewayLogInDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3, { message: 'Name must have at least 3 letters!' }),
    __metadata("design:type", String)
], GatewayLogInDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6, { message: 'Minimum length is 6 with special characters' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Maximum length is 20' }),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak - it has to contain at least one Capital Letter and one number.',
    }),
    __metadata("design:type", String)
], GatewayLogInDto.prototype, "password", void 0);
exports.GatewayLogInDto = GatewayLogInDto;
class GatewayID {
}
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], GatewayID.prototype, "id", void 0);
exports.GatewayID = GatewayID;
//# sourceMappingURL=gateway.dto.js.map