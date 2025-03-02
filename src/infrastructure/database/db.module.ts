import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';
import {
  BasketEntity,
  CategoryEntity,
  ImageEntity,
  OrderEntity,
  ProductEntity,
  SubCategoryEntity,
  UserEntity,
} from 'src/domain';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      entities: [
        UserEntity,
        CategoryEntity,
        SubCategoryEntity,
        ProductEntity,
        ImageEntity,
        BasketEntity,
        OrderEntity,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DbModule {}
