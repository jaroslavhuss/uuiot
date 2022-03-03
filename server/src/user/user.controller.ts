import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { getUser } from 'src/auth/decorators';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private user: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  whoAmI(@getUser() user: User) {
    return user;
  }

  @UseGuards(AuthGuard('jwtadmin'))
  @Get('admin')
  whoAmIAdmin(@getUser() user: User) {
    return user;
  }

  @UseGuards(AuthGuard('jwtadmin'))
  @Patch('update/:id')
  async updateUser(@Body() body: User, @Param('id') id: string) {
    const user = await this.user.updateUser(id, body);
    return user;
  }

  @UseGuards(AuthGuard('jwtadmin'))
  @Get('all')
  async getAllUsers() {
    const users = await this.user.getAllUsers();
    return users;
  }
}
