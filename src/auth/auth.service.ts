import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async signUp(email: string, password: string, name: string) {
    try {
      const existingUser = await this.prisma.user.findUnique({where: {email : email}})

      if(existingUser) {
        throw new BadRequestException('Email in use') 
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const dataWithPassword = {
        email: email,
        password: hashedPassword,
        name: name,
      };

      const createdUser = await this.userService.create(dataWithPassword);

      const { password: _, ...userWithoutPassword } = createdUser;

      return userWithoutPassword;

    } catch (error) {
      console.error(error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async signIn(email: string, password: string) {
    try {
      const user = await this.userService.findByEmail(email)

      if(!user) {
        throw new UnauthorizedException('Invalid Credentials')
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)

      if(!isPasswordValid) {
        throw new UnauthorizedException('Invalid Credentials')
      }

      const payload = { userame: user.email, sub: user.id }
      return { accessToken: this.jwtService.sign(payload) }

    } catch (error) {
      console.error(error);

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
