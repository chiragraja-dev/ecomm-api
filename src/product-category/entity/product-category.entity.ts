
import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../product/entity/product.entity';
import { Category } from '../../categories/entity/categories.entity';

@Entity({ name: 'product_categories' })
export class ProductCategory {
    @PrimaryColumn()
    product_id: number;

    @PrimaryColumn()
    category_id: number;

    @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
    created_at: Date;

    @ManyToOne(() => Product, product => product.categories)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category;
}
