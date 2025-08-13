import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}


  async create(data: CreateUserDto) {
    try {
      console.log('Entrando no service')

      console.log('Username: ', data.username)

      const userExists = await this.prisma.user.findUnique({
      where: {
        username: data.username,
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
          username: data.username,
          name: data.name,
          password: data.password,
        },
      })

      return createdUser;
    
    } catch(err) {
      console.error(err)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany()

    if(!users || users === null) {
      throw new NotFoundException('Users not found')
    }

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
