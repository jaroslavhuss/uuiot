import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignUpDto } from './dto';
import { GatewayLogInDto } from 'src/gateway/dto';
@Controller('auth')
export class AuthController {
  // Tohle udělá novou instanci AuthService, aby to člověk nemusel psát jak úplný trotl
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('/signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Post('/gateway-signin')
  gatewaySignIn(@Body() dto: GatewayLogInDto) {
    return this.authService.gatewaySignIn(dto);
  }
}
