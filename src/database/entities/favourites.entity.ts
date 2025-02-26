import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { Folder } from './folder.entity';
import { ProductItem } from './product-item.entity';

@Entity('favorites')
@Unique(['folder', 'productItem']) // Prevents duplicate items in the same folder
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Folder, (folder) => folder.favorites, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  folder: Folder;

  @ManyToOne(() => ProductItem, (productItem) => productItem.favorites, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  productItem: ProductItem;
}
