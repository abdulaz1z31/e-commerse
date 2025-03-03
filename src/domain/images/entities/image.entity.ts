import { BaseEntity } from 'src/common';
import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';
import { OwnerType } from '../constants/image.enum';
import { ProductEntity } from 'src/domain/product';
import { CategoryEntity } from 'src/domain/category';
import { SubCategoryEntity } from 'src/domain/subCategory';

@Entity('image')
export class ImageEntity extends BaseEntity {
  @Column()
  image: string;

  @Column({ type: 'uuid', name: 'product_id', nullable: true })
  @Index()
  product_id: string;

  @Column({ type: 'uuid', name: 'category_id', nullable: true })
  @Index()
  category_id: string;

  @Column({ type: 'uuid', name: 'sub_category_id', nullable: true })
  @Index()
  sub_category_id: string;

  @Column({ type: 'enum', enum: OwnerType })
  @Index()
  ownerType: OwnerType;

  @ManyToOne(() => ProductEntity, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ManyToOne(() => SubCategoryEntity, (sub_category) => sub_category.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sub_category_id' })
  sub_category: SubCategoryEntity;
}
