import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'src/domain/user';

export class RegisterAuthDto {
  @ApiProperty({
    example: 'John',
    description: 'Full name or name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'kepler', description: 'username' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'SecureP@ss123',
    description: 'Strong parol',
    minLength: 6,
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'admin',
    description: 'User role',
    enum: UserRoles,
  })
  @IsNotEmpty()
  role: UserRoles;
}
