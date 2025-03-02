import { Controller, Post, Body } from '@nestjs/common';
import { UserID, Public } from 'src/common/decorators';
import { AuthService, LoginAuthDto, RegisterAuthDto } from 'src/domain/auth';
import { RefreshDto } from 'src/domain/auth/dtos/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('register')
  async register(@Body() userData: RegisterAuthDto) {
    return await this.authService.register(userData);
  }

  @Public()
  @Post('login')
  async login(@Body() loginData: LoginAuthDto) {
    return await this.authService.login(loginData);
  }

  @Post('refresh')
  async refreshTokens(dto: RefreshDto, @UserID() id: string) {
    return await this.authService.refreshToken(dto, id);
  }
}
