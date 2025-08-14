import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthRegisterDto } from 'src/auth/dto/register.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.findAll()
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.findById(id)
  }

  @Post('create')
  async createUser(data: AuthRegisterDto) {
    return this.userService.create(data)
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(id)
  }
}
