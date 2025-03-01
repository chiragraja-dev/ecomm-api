import { Category } from 'src/categories/entity/categories.entity';
import { Inventory } from 'src/inventory/enity/inventory.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    product_id: number;

    @Column({ type: 'nvarchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: 'nvarchar', length: 255, nullable: true })
    image_url: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
    created_at: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'GETDATE()', onUpdate: 'GETDATE()' })
    updated_at: Date;

    @ManyToMany(() => Category, category => category.products)
    @JoinTable({
        name: 'product_categories',
        joinColumn: { name: 'product_id', referencedColumnName: 'product_id' },
        inverseJoinColumn: { name: 'category_id', referencedColumnName: 'category_id' },
    })
    categories: Category[];

    @OneToMany(() => Inventory, inventory => inventory.user)
    inventories: Inventory[];
}



