import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Category } from './categoryEntity';
import { Label } from './labelEntity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb', { nullable: true })
  name: {
    en?: string;
    fr?: string;
    ar?: string;
    ua?: string;
  };

  @Column({ nullable: true })
  description: string;

  @Column('text', { array: true, default: [] })
  images: string[];

  @Column('float')
  price: number;

  @ManyToOne(() => Category, (category) => category.items, { nullable: true })
  category: Category;

  @ManyToMany(() => Label, (label) => label.items, { cascade: true })
  @JoinTable()
  labels: Label[];
}
