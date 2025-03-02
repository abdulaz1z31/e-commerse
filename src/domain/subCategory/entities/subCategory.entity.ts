import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity('sub_category')
export class SubCategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'name', unique: true })
  name: string;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @Column({ type: 'varchar', name: 'image' })
  image: string;

  @Column({ type: 'uuid', name: 'category_id' })
  category_id: string;
}
