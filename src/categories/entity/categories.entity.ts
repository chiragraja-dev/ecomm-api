import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
    @ApiProperty({ example: 1, description: 'Unique identifier for the category' })
    @PrimaryGeneratedColumn()
    category_id: number;

    @ApiProperty({ example: 'Electronics', description: 'The category name' })
    @Column({ type: 'nvarchar', length: 100, unique: true })
    name: string;

    @ApiProperty({
        example: 'Electronic products like mobile phones, laptops, smartwatches',
        description: 'A brief description of the category',
        required: false
    })
    @Column({ type: 'text', nullable: true })
    description?: string;

    @ApiProperty({ example: '2024-02-13T12:00:00Z', description: 'The date when the category was created' })
    @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
    created_at: Date;

    @ApiProperty({ example: '2024-02-13T12:30:00Z', description: 'The date when the category was last updated' })
    @UpdateDateColumn({ type: 'datetime', default: () => 'GETDATE()', onUpdate: 'GETDATE()' })
    updated_at: Date;
}
