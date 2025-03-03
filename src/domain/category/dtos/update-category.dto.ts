import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    example: 'Electronics',
    description: 'Kategoriya nomi',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Updated description for category',
    description: 'Kategoriya descriptioni',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
