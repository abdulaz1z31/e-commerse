import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterAuthDto } from '../dtos/register.dto';
import { LoginAuthDto } from '../dtos/login.dto';
import { UserService } from 'src/domain/user';
import { HashingService, TokenService } from 'src/infrastructure';
import { RefreshDto } from '../dtos/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: TokenService,
    private readonly hashingService: HashingService,
  ) {}
  async register(data: RegisterAuthDto) {
    const exitingUsername = this.userService.isUsernameExists(data.username);
    if (!exitingUsername) {
      throw new ConflictException('Username already exists');
    }
    const user = await this.userService.save(data);
    return {
      message: 'Created',
      statusCode: 201,
      data: {
        id: user.id,
      },
    };
  }
  async login(data: LoginAuthDto) {
    const user = await this.userService.findByUsername(data.username);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const checkPassword = this.hashingService.decrypt(
      data.password,
      user.password,
    );
    if (!checkPassword) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload = {
      id: user.id,
      role: user.role,
    };
    const accessToken = this.jwtService.createAccessToken(payload);
    const refreshToken = this.jwtService.createRefreshToken(payload);
    return {
      statusCode: 200,
      message: 'Logged in',
      data: {
        accessToken,
        refreshToken,
      },
    };
  }
  async refreshToken(dto: RefreshDto, id: string) {
    const decode = await this.jwtService.verifyRefreshToken(dto.refresh_token);
    if (decode.id != id) {
      throw new BadRequestException('Bad request');
    }
    const accessToken = this.jwtService.createAccessToken(decode);

    return {
      message: 'Success',
      statusCode: 200,
      data: { accessToken },
    };
  }
}
