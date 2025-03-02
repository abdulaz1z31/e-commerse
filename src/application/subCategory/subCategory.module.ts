import { Module } from '@nestjs/common';
import { SubCategoryController } from './controllers/subCategory.controller';
import { SubCategoryEntity, SubCategoryService } from 'src/domain';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoryEntity])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  exports: [],
})
export class SubCategoryModule {}
