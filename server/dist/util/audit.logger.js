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
exports.AuditLogger = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const audit_schema_1 = require("../schemas/audit.schema");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
let AuditLogger = class AuditLogger {
    constructor(auditModel, jwt) {
        this.auditModel = auditModel;
        this.jwt = jwt;
        this.logger = new common_1.Logger('AUDIT');
    }
    use(request, response, next) {
        const { ip, method, originalUrl, params, body } = request;
        const userAgent = request.get('user-agent') || '';
        response.on('finish', () => {
            const { statusCode } = response;
            const contentLength = response.get('content-length');
            if (body.hasOwnProperty("password")) {
                body.password = null;
            }
            this.auditModel.create({
                method,
                originalUrl,
                statusCode,
                contentLength,
                userAgent,
                ip,
                params: JSON.stringify(params),
                body: JSON.stringify(body),
                user: JSON.stringify(this.jwt.decode(request.headers.authorization.split(" ")[1]))
            });
        });
        next();
    }
};
AuditLogger = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(audit_schema_1.Audit.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, jwt_1.JwtService])
], AuditLogger);
exports.AuditLogger = AuditLogger;
//# sourceMappingURL=audit.logger.js.map