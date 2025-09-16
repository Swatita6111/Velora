import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @Column('json')
  items: any; // array of product items
}
