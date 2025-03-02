import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common';

@Entity()
export class BasketEntity extends BaseEntity {
  @Column()
  user_id: string;

  @Column()
  product_id: string;

  @Column({ default: 1 })
  quantity: number;
}
