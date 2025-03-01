import { Inventory } from "src/inventory/enity/inventory.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('userProfile')
export class User {
    @PrimaryGeneratedColumn()
    UserID: number;

    @Column({ nullable: false })
    FirstName: string;

    @Column({ nullable: false })
    LastName: string;

    @Column({ nullable: false })
    Email: string;

    @Column({ nullable: false })
    PasswordHash: string;

    @Column({ nullable: true })
    PhoneNumber: string;

    @Column({ type: 'date', nullable: true })
    DateOfBirth?: Date;

    @Column({ nullable: true })
    Gender?: string;

    @Column({ nullable: true })
    Address?: string;

    @Column({ nullable: true })
    City?: string;

    @Column({ nullable: true })
    State?: string;

    @Column({ nullable: true })
    Country?: string;

    @Column({ nullable: true })
    PostalCode?: string;

    @Column({ nullable: true })
    ProfilePictureURL?: string;

    @Column({ default: true })
    IsActive: boolean;

    @Column({ nullable: false })
    Role: number;

    @CreateDateColumn({ default: () => 'GETDATE()' })
    CreatedAt: Date;

    @UpdateDateColumn({ default: () => 'GETDATE()' })
    UpdatedAt: Date;

    @OneToMany(() => Inventory, inventory => inventory.user)
    inventories: Inventory[];
}