import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../auth/entity/user.entity';
import { Product } from '../../product/entity/product.entity';

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    inventory_id: number;

    @Column()
    product_id: number;

    @Column({ default: 0 })
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    user_id: number;

    @ManyToOne(() => User, user => user.inventories)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Product, product => product.inventories)
    @JoinColumn({ name: 'product_id' })
    product: Product
}
