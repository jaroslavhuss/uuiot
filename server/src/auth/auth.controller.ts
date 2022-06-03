import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignUpDto, UserIdDto } from './dto';
import { GatewayLogInDto } from '../gateway/dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { ok } from 'assert';
@Controller('auth')
export class AuthController {
  // Tohle udělá novou instanci AuthService, aby to člověk nemusel psát jak úplný trotl
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  //Only logged user can call this - we need ID of the current user!
  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Body() dto: UserIdDto) {
    return this.authService.logout(dto);
  }

  //Only logged user can call this - we need ID of the current user!
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Req() req: { user: { sub: string } }) {
    const id = req.user.sub;
    console.log(id);
    return ok;
  }

  @Post('/gateway-signin')
  @HttpCode(HttpStatus.OK)
  gatewaySignIn(@Body() dto: GatewayLogInDto) {
    return this.authService.gatewaySignIn(dto);
  }

  @Get('/')
  justatest() {
    return 'funguju';
  }
}
