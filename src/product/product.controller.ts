import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { Role } from 'src/auth/auth.controller';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('add')
    @Role([1])
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @ApiOperation({ summary: 'Add a new product' })
    @ApiResponse({ status: 201, description: 'Product added successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async addProduct(@Body() productDto: ProductDto) {
        return this.productService.addProduct(productDto);
    }
}
