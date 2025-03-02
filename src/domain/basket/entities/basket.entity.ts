import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common';
import { UserEntity } from 'src/domain/user';
import { ProductEntity } from 'src/domain/product';

@Entity('basket')
export class BasketEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  product_id: string;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => UserEntity, (user) => user.baskets)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.baskets)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
