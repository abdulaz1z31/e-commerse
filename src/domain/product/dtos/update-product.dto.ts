import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({ type: String, description: 'Product name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ type: String, description: 'Product description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ type: Number, description: 'Product price' })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({ type: Number, description: 'Stock quantity' })
  @IsOptional()
  @IsNumber()
  stock?: number;

  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    description: 'Category ID',
  })
  @IsOptional()
  @IsUUID()
  category_id?: string;
}
