import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Item } from './item_entity';

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Item, (item) => item.labels)
  items: Item[];
}
