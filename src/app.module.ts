import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AuthModule,
  BasketModule,
  CategoryModule,
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
    DbModule,
    AuthModule,
    UserModule,
    RolesModule,
    CustomJwtModule,
    CategoryModule,
    SubCategoryModule,
    FileModule,
    ProductModule,
    BasketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
