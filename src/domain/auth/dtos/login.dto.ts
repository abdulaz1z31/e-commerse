import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ example: 'johndoe', description: 'Foydalanuvchi nomi' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'SecureP@ss123',
    description: 'Foydalanuvchi paroli',
  })
  @IsNotEmpty()
  password: string;
}
