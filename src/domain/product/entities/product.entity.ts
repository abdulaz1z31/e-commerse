import { BaseEntity } from 'src/common';
import { BasketEntity } from 'src/domain/basket';
import { ImageEntity } from 'src/domain/images';
import { OrderEntity } from 'src/domain/order';
import { SubCategoryEntity } from 'src/domain/subCategory';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

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

  @ManyToOne(() => SubCategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: SubCategoryEntity;

  @OneToMany(() => BasketEntity, (basket) => basket.product)
  baskets: BasketEntity[];

  @OneToMany(() => OrderEntity, (order) => order.product)
  orders: OrderEntity[];

  @OneToMany(() => ImageEntity, (image) => image.product)
  images: ImageEntity[];
}
