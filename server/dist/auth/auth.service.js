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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../schemas/user.schema");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
let AuthService = class AuthService {
    constructor(jwt, userModel, gatewayModel) {
        this.jwt = jwt;
        this.userModel = userModel;
        this.gatewayModel = gatewayModel;
    }
    async signup(dto) {
        if (dto.password !== dto.confirmedPassword)
            throw new common_1.BadRequestException('Password and Confirmed password are different!');
        const hashedPwd = await argon.hash(dto.password);
        const findIfMongoEmailIsTaken = await this.userModel.findOne({
            email: dto.email,
        });
        if (findIfMongoEmailIsTaken)
            throw new common_1.BadRequestException('Email is already taken!');
        const user = await this.userModel.create({
            password: hashedPwd,
            email: dto.email,
            isUserApproved: false,
            name: dto.name,
            surname: dto.surname,
        });
        const tokens = await this.signToken(user._id, user.email, user.authLevel);
        await this.userModel.findByIdAndUpdate(user._id, {
            refresh_token: tokens.refresh_token,
        }, {
            new: true,
        });
        return tokens;
    }
    async signin(dto) {
        const user = await this.userModel.findOne({
            email: dto.email,
        });
        if (!user)
            throw new common_1.ForbiddenException('This user does not exists');
        const passwordMatch = await argon.verify(user.password, dto.password);
        if (!passwordMatch)
            throw new common_1.BadRequestException('Wrong password');
        const tokens = await this.signToken(user._id, user.email, user.authLevel);
        await this.userModel.findOneAndUpdate({ _id: user.id }, { lastLoggedIn: new Date(), refresh_token: tokens.refresh_token }, { new: true });
        user.password = null;
        return {
            user,
            tokens: await this.signToken(user.id, user.email, user.authLevel),
        };
    }
    async logout(id) {
        const user = await this.userModel.findByIdAndUpdate(id.id, {
            refresh_token: '',
        }, { new: true });
        if (!user)
            throw new common_1.BadRequestException('User could not be logged off since it does not exist');
        delete user.password;
        return user;
    }
    async signToken(userId, email, authLevel) {
        const config = new config_1.ConfigService();
        const payload = {
            sub: userId,
            email,
            authLevel,
        };
        const token = await this.jwt.signAsync(payload, {
            expiresIn: config.get('JWT_EXPIRE'),
            secret: config.get('JWT_SECRET'),
        });
        const rToken = await this.jwt.signAsync(payload, {
            expiresIn: config.get('JWT_EXPIRE_REFRESH'),
            secret: config.get('JWT_REFRESH_SECRET'),
        });
        return { access_token: token, refresh_token: rToken };
    }
    async updateRefreshToken(userId, refresh_token) {
        const hash = await argon.hash(refresh_token);
        await this.userModel.findByIdAndUpdate(userId, {
            rtToken: hash,
        });
    }
    async gatewaySignIn(dto) {
        const gateway = await this.gatewayModel.findOne({ name: dto.name });
        if (!gateway)
            throw new common_1.BadRequestException('This gateway does not exist!');
        const passwordMatch = await argon.verify(gateway.password, dto.password);
        if (!passwordMatch)
            throw new common_1.BadRequestException('Wrong password');
        return this.gatewaySignToken(dto.name);
    }
    async gatewaySignToken(name) {
        const config = new config_1.ConfigService();
        const token = await this.jwt.signAsync({ name }, {
            expiresIn: config.get('JWT_EXPIRE'),
            secret: config.get('JWT_SECRET'),
        });
        return { gateway_access_token: token };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(schemas_1.Gateway.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model,
        mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map