import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { AuthService } from 'src/domain/auth';
import { RegisterAuthDto } from 'src/domain/auth/dtos/register.dto';
import { LoginAuthDto } from 'src/domain/auth/dtos/login.dto';
import { RefreshDto } from 'src/domain/auth/dtos/refresh.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register qilish' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'conflict',
  })
  @ApiBody({ type: RegisterAuthDto })
  async register(@Body() userData: RegisterAuthDto) {
    return await this.authService.register(userData);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login qilish' })
  @ApiResponse({ status: HttpStatus.OK, description: 'login' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid credintionals',
  })
  @ApiBody({ type: LoginAuthDto })
  async login(@Body() loginData: LoginAuthDto) {
    return await this.authService.login(loginData);
  }

  @Post('refresh')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh token bilan yangi access token olish' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Yangi access token',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'refresh token expired',
  })
  @ApiBody({ type: RefreshDto })
  async refreshTokens(@Body() dto: RefreshDto) {
    return await this.authService.refreshToken(dto);
  }
}
