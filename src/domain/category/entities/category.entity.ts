import { BaseEntity } from 'src/common';
import { ImageEntity } from 'src/domain/images';
import { SubCategoryEntity } from 'src/domain/subCategory';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('category')
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => SubCategoryEntity, (subcategory) => subcategory.category)
  sub_categories: SubCategoryEntity[];

  @OneToMany(() => ImageEntity, (image) => image.category)
  images: ImageEntity[];
}
