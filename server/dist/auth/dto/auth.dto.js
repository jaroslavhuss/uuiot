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
exports.UserIdDto = exports.SignUpDto = exports.AuthDto = void 0;
const class_validator_1 = require("class-validator");
class AuthDto {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], AuthDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'Minimum length is 6 with special characters' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Maximum length is 20' }),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak - it has to contain at least one Capital Letter and one number.',
    }),
    __metadata("design:type", String)
], AuthDto.prototype, "password", void 0);
exports.AuthDto = AuthDto;
class SignUpDto {
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6, { message: 'Minimum length is 6 with special characters' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Maximum length is 20' }),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak - it has to contain at least one Capital Letter and one number.',
    }),
    __metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6, { message: 'Minimum length is 6 with special characters' }),
    (0, class_validator_1.MaxLength)(20, { message: 'Maximum length is 20' }),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak - it has to contain at least one Capital Letter and one number.',
    }),
    __metadata("design:type", String)
], SignUpDto.prototype, "confirmedPassword", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Name must be a text!' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Name is mandatory!' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Surname must be a text!' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Surname is mandatory!' }),
    __metadata("design:type", String)
], SignUpDto.prototype, "surname", void 0);
exports.SignUpDto = SignUpDto;
class UserIdDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserIdDto.prototype, "id", void 0);
exports.UserIdDto = UserIdDto;
//# sourceMappingURL=auth.dto.js.map