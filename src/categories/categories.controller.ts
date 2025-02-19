import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/categories.entity';
import { Category } from './entity/categories.entity';
import { Role } from 'src/auth/auth.controller';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) { }

    @Post()
    @Role(1)
    @UseGuards(JwtAuthGuard, RoleGuard)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto[]): Promise<Category[]> {
        return this.categoryService.createCategory(createCategoryDto);
    }
}
