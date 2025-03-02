import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateSubCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsUUID()
  @IsOptional()
  category_id?: string;
}
