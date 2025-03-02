import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';
import {
  BasketEntity,
  CategoryEntity,
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
        OrderEntity,
        BasketEntity,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DbModule {}
