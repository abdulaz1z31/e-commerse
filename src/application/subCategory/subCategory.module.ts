import { Module } from '@nestjs/common';
import { SubCategoryController } from './controllers/subCategory.controller';
import { ImageEntity, SubCategoryEntity, SubCategoryService } from 'src/domain';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoryEntity, ImageEntity])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  exports: [],
})
export class SubCategoryModule {}
