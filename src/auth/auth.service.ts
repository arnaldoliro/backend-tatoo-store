import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  async signUp(data) {
    try {
      const existingUser = await this.userService.findByEmail(data.email);

      if (existingUser) {
        throw new BadRequestException('Email in use');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const createdUser = await this.prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name
        },
      });

      const { password: _, ...userWithoutPassword } = createdUser;

      return userWithoutPassword;

    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }

  async signIn(data) {
    try {
      
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException('Internal Server Error')
    }
  }
}
