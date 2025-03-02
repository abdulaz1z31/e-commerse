import { IsString, IsNumber, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsUUID()
  category_id: string;

  @IsString()
  image: string;
}
