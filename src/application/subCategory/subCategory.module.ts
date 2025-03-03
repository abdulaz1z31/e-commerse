import { Module } from '@nestjs/common';
import { SubCategoryController } from './controllers/subCategory.controller';
import {
  ImageEntity,
  ImageService,
  SubCategoryEntity,
  SubCategoryService,
} from 'src/domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from 'src/infrastructure/fileSerivce/fileService.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategoryEntity, ImageEntity])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, ImageService, FileService],
  exports: [],
})
export class SubCategoryModule {}
