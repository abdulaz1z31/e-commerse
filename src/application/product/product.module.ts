import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import {
  ImageEntity,
  ImageService,
  ProductEntity,
  ProductService,
  SubCategoryEntity,
} from 'src/domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from 'src/infrastructure/fileSerivce/fileService.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, ImageEntity, SubCategoryEntity]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ImageService, FileService],
  exports: [ProductService],
})
export class ProductModule {}
