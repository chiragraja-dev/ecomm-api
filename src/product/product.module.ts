import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Product]), JwtModule],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [TypeOrmModule]
})
export class ProductModule { }
