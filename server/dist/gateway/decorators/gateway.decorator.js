"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGateway = void 0;
const common_1 = require("@nestjs/common");
exports.getGateway = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.gateway.id;
});
//# sourceMappingURL=gateway.decorator.js.map