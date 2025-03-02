import { BaseEntity } from 'src/common';
import { Entity, Column } from 'typeorm';

@Entity()
export class OrderEntity extends BaseEntity {
  @Column()
  user_id: string;

  @Column()
  product_id: string;

  @Column()
  quantity: number;

  @Column({ default: 'pending' })
  status: string;
}
