import { IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'full name or name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'johndoe',
    description: 'username',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    example: 'NewP@ssw0rd!',
    description: 'parol',
  })
  @IsOptional()
  @IsStrongPassword()
  password?: string;
}
