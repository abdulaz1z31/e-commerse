import { Module } from '@nestjs/common';
import { AuthService } from 'src/domain/auth';
import { AuthController } from './controllers/auth.controller';
import { CustomJwtModule, HashingService } from 'src/infrastructure';
import { UserModule } from '../user/user.module';

@Module({
  imports: [CustomJwtModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, HashingService],
  exports: [AuthService],
})
export class AuthModule {}
