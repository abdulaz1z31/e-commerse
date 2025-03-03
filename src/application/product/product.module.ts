import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ImageEntity, ProductEntity, ProductService } from 'src/domain';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ImageEntity])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
