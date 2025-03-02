import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryEntity, CategoryService } from 'src/domain';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: []
})
export class CategoryModule {}
