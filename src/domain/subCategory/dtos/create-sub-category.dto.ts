import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSubCategoryDto {
  @ApiProperty({ example: 'Electronics', description: 'Subcategory name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Devices and gadgets',
    description: 'Subcategory description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Parent category ID',
  })
  @IsUUID()
  @IsNotEmpty()
  category_id: string;
}
