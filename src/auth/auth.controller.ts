import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthRegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  @Post('login')
  async singIn(@Body() auth) {
    return await this.authService.signIn(auth)
  }

  @Post('register')
  async register(@Body() auth: AuthRegisterDto) {
    return await this.authService.register(auth)
  }

  // @Get('profile')
  // async getProfile(@Request() req) {
  //   return req.user
  // }
}
