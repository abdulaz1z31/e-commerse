import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'uuid', name: 'category_id' })
  category_id: string;

  @Column({})
  image: string;
}
