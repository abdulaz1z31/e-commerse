import { BaseEntity } from 'src/common';
import { CategoryEntity } from 'src/domain/category';
import { ImageEntity } from 'src/domain/images';
import { ProductEntity } from 'src/domain/product';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('sub_category')
export class SubCategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'uuid', name: 'category_id' })
  category_id: string;

  @ManyToOne(() => CategoryEntity, (category) => category.sub_categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];

  @OneToMany(() => ImageEntity, (image) => image.sub_category, {
    cascade: true,
  })
  images: ImageEntity[];
}
