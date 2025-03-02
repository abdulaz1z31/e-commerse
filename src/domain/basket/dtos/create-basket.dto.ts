import { IsInt, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class CreateBasketDto {
  @IsNotEmpty()
  @IsUUID()
  product_id: string;

  @IsInt()
  @IsPositive()
  quantity: number;
}
