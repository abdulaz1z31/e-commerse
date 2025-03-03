import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics', description: 'Kategoriya nomi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'All electronic devices and gadgets',
    description: 'Kategoriya descriptioni',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
