import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
}
