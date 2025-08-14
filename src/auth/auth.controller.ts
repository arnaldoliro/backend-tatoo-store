import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthRegisterDto } from './dto/register.dto';
import { UserLoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  @Post('login')
  async singIn(@Body() data: UserLoginDto) {
    const { email, password } = data
    return await this.authService.signIn(email, password)
  }

  @Post('register')
  async register(@Body() data: AuthRegisterDto) {
    const {email, password, name} = data
    return await this.authService.signUp(email, password, name)
  }

  // @Get('profile')
  // async getProfile(@Request() req) {
  //   return req.user
  // }
}
