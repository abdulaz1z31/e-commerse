import { BaseEntity } from 'src/common';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { OrderStatus } from '../constants/order.enum';
import { ProductEntity } from 'src/domain/product';
import { UserEntity } from 'src/domain/user';

@Entity('order')
export class OrderEntity extends BaseEntity {
  @Column({ type: 'uuid', name: 'user_id' })
  user_id: string;

  @Column({ type: 'uuid', name: 'product_id' })
  product_id: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.pending })
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orders)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
