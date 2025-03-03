import { IsString, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ type: String, description: 'Product name' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'Product description' })
  @IsString()
  description: string;

  @ApiProperty({ type: Number, description: 'Product price' })
  @IsNumber()
  price: number;

  @ApiProperty({ type: Number, description: 'Stock quantity' })
  @IsNumber()
  stock: number;

  @ApiProperty({ type: String, format: 'uuid', description: 'Category ID' })
  @IsUUID()
  category_id: string;
}
