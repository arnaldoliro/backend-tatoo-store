import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}


  async create(data: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        username: data.name, // Trocar para username
      },
      select: {
        id: true,
      }
    })

    if(userExists) {
      throw new BadRequestException('User already exists')
    }

    const createdUser = await this.prisma.user.create({
      data: {
        usernmane: data.name,
        name: data.name,
        password: data.password,
      },
    })

    return createdUser;
  }

  async findAll() {
    const users = await this.prisma.user.findAll()

    return users
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {id: id},
    })

    if(!user) {
      throw new NotFoundException('User not found')
    }

    return user;
  }

  async findWithoutPassword(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      omit: {
        password: true,
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: id },
      data: {
        name: data.name,
      },
      omit: {
        password: true,
      },
    });
  }

  async delete(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.delete({
      where: { id: id },
    });
  }

  updatePassword(username: string, newPassword: string) {
    return this.prisma.user.update({
      where: { username },
      data: {
        password: newPassword,
      },
    });
  }
}
