import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import {
  CategoryEntity,
  CategoryService,
  ImageEntity,
  ImageService,
} from 'src/domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from 'src/infrastructure/fileSerivce/fileService.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, ImageEntity])],
  controllers: [CategoryController],
  providers: [CategoryService, ImageService, FileService],
  exports: [],
})
export class CategoryModule {}
