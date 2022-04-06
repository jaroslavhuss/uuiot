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
exports.JwtStrategyGateway = exports.JwtStrategyAdmin = exports.JwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const schemas_1 = require("../../schemas");
const mongoose_2 = require("mongoose");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    constructor(config, userModel) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
        });
        this.userModel = userModel;
    }
    async validate(payload) {
        const user = await this.userModel
            .findById({ _id: payload.sub })
            .select('-password');
        if (!user)
            throw new common_1.ForbiddenException('You must be logged in!');
        if (!user.isUserApproved)
            throw new common_1.ForbiddenException(`${user.name} ${user.surname} was not approved yet by the admin!`);
        delete user.password;
        return { user, payload };
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
let JwtStrategyAdmin = class JwtStrategyAdmin extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwtadmin') {
    constructor(config, userModel) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
        });
        this.userModel = userModel;
    }
    async validate(payload) {
        const user = await this.userModel
            .findById({ _id: payload.sub })
            .select('-password');
        if (!user)
            throw new common_1.ForbiddenException('You must be logged in!');
        if (!user.isUserApproved)
            throw new common_1.ForbiddenException(`${user.name} ${user.surname} was not approved yet by the admin!`);
        if (user.authLevel !== 'iotadmin')
            throw new common_1.ForbiddenException('Not enough privileges!');
        return { user, payload };
    }
};
JwtStrategyAdmin = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], JwtStrategyAdmin);
exports.JwtStrategyAdmin = JwtStrategyAdmin;
let JwtStrategyGateway = class JwtStrategyGateway extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwtgateway') {
    constructor(config, gatewayModel) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
        });
        this.gatewayModel = gatewayModel;
    }
    async validate(payload) {
        const gateway = await this.gatewayModel
            .findOne({ name: payload.name })
            .select('-password');
        if (!gateway)
            throw new common_1.ForbiddenException('You must be logged in!');
        return { gateway };
    }
};
JwtStrategyGateway = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.Gateway.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], JwtStrategyGateway);
exports.JwtStrategyGateway = JwtStrategyGateway;
//# sourceMappingURL=jwt.strategy.js.map