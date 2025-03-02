import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateBasketDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  quantity?: number;
}
