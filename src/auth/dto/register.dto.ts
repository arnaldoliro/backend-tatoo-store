import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class AuthRegisterDto {
  @ApiProperty({
    example: 'Seu Nome',
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Username is required' })
  @ApiProperty({
    example: 'seuemail@example.com',
  })
  @IsEmail({}, { message: 'Username must be a valid e-mail' })
  email: string;

  @ApiProperty({
    example: 'Senh@1234',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    },
  )
  password: string;
}