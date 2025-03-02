import { Column, Entity, OneToMany } from 'typeorm';
import { UserRoles } from '../constants/user-role.enum';
import { BaseEntity } from 'src/common';
import { BasketEntity } from 'src/domain/basket';
import { OrderEntity } from 'src/domain/order';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    name: 'role',
    default: UserRoles.user,
  })
  role: UserRoles;

  @OneToMany(() => BasketEntity, (basket) => basket.user)
  baskets: BasketEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
