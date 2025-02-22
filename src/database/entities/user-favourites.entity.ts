import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { ProductItem } from './product-item.entity';

@Entity('user_favourites')
export class UserFavourites {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favourites, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => ProductItem, (productItem) => productItem.favourites, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  productItem: ProductItem;
}
