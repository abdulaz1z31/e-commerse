import { IsNotEmpty } from 'class-validator';
import { UserRoles } from 'src/domain/user';

export class RegisterAuthDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: UserRoles;
}
