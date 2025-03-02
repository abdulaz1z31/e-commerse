import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { UserRoles } from '../constants/user-role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  role: UserRoles;
}
