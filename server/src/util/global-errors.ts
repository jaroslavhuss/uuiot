import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(500).send({
      error: 'Global Server error',
    });
  }
}
