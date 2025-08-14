import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({
    example: 'email@example.com',
  })
  @IsEmail({}, { message: 'Username must be a valid e-mail' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Senh@12345',
  })
  password: string;
}