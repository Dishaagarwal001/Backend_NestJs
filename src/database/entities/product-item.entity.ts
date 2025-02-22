import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Material } from './material.entity';
import { Product } from './product.entity';
import { Currency } from './currency.entity';
import { Color } from './color.entity';
import { ProductImage } from './product-images.entity';
import { UserFavourites } from './user-favourites.entity';

@Entity('product_items')
export class ProductItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'price' })
  price: number;

  @ManyToOne(() => Currency, { nullable: false })
  currency: Currency;

  @ManyToOne(() => Color, { nullable: false })
  color: Color;

  @ManyToOne(() => Material, { nullable: false })
  material: Material;

  @ManyToOne(() => Product, { nullable: false })
  product: Product;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];

  @OneToMany(
    () => UserFavourites,
    (userFavourites) => userFavourites.productItem,
  )
  favourites: UserFavourites[];
}
