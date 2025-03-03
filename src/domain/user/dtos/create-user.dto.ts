import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../constants/user-role.enum';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'full name or name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'johndoe', description: 'username' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'strong password',
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: 'admin',
    description: 'user role',
    enum: UserRoles,
  })
  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: UserRoles;
}
