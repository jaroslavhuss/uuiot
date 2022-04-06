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
exports.UserDeleteDto = exports.UserUpdateDto = void 0;
const class_validator_1 = require("class-validator");
const custom_validators_1 = require("../../custom-validators");
class UserUpdateDto {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Name must be a text!' }),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Surname must be a text!' }),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "surname", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({
        message: 'Auth level must be a string',
    }),
    (0, class_validator_1.Validate)(custom_validators_1.AdminUserRoles, {
        message: 'Only iotadmin or iotuser is acceptable',
    }),
    __metadata("design:type", String)
], UserUpdateDto.prototype, "authLevel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UserUpdateDto.prototype, "isUserApproved", void 0);
exports.UserUpdateDto = UserUpdateDto;
class UserDeleteDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserDeleteDto.prototype, "id", void 0);
exports.UserDeleteDto = UserDeleteDto;
//# sourceMappingURL=user.dto.js.map