import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getGateway = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.gateway.id;
  },
);
