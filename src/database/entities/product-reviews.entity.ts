import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { ProductItem } from './product-item.entity';

@Entity('product_reviews')
export class ProductReview {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductItem, { nullable: false })
  productItem: ProductItem;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @Column({ type: 'int', width: 1, name: 'rating' })
  rating: number;
}
