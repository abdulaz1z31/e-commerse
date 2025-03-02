import { BaseEntity } from 'src/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'name', unique: true })
  name: string;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @Column({ type: 'varchar', name: 'image' })
  image: string;
}
