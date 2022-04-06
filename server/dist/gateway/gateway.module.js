"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayModule = void 0;
const common_1 = require("@nestjs/common");
const gateway_controller_1 = require("./gateway.controller");
const gateway_service_1 = require("./gateway.service");
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("../schemas");
let GatewayModule = class GatewayModule {
};
GatewayModule = __decorate([
    (0, common_1.Module)({
        controllers: [gateway_controller_1.GatewayController],
        providers: [gateway_service_1.GatewayService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: schemas_1.Gateway.name, schema: schemas_1.GatewaySchema },
                { name: schemas_1.Humidity.name, schema: schemas_1.HumiditySchema },
                { name: schemas_1.Temperature.name, schema: schemas_1.TemperatureSchema },
            ]),
        ],
    })
], GatewayModule);
exports.GatewayModule = GatewayModule;
//# sourceMappingURL=gateway.module.js.map