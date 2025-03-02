import { Column, Entity } from 'typeorm';
import { UserRoles } from '../constants/user-role.enum';
import { BaseEntity } from 'src/common';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    name: 'role',
    default: UserRoles.user,
  })
  role: UserRoles;
}
