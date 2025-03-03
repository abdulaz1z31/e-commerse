import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AuthModule,
  BasketModule,
  CategoryModule,
  OrderModule,
  ProductModule,
  SubCategoryModule,
  UserModule,
} from './application';
import { DbModule, CustomJwtModule, RolesModule } from './infrastructure';
import { FileModule } from './infrastructure/fileSerivce/fileService.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CustomJwtModule,
    RolesModule,
    DbModule,
    UserModule,
    AuthModule,
    CategoryModule,
    SubCategoryModule,
    FileModule,
    ProductModule,
    BasketModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
