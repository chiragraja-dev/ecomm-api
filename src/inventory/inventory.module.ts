import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { Product } from 'src/product/entity/product.entity';
import { Inventory } from './enity/inventory.entity';
import { JwtModule } from '@nestjs/jwt';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { ProductModule } from 'src/product/product.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, User, Inventory]),
        JwtModule,
        ProductModule,
        AuthModule
    ],
    controllers: [InventoryController],
    providers: [InventoryService],
    exports: [TypeOrmModule]
})
export class InventoryModule { }
