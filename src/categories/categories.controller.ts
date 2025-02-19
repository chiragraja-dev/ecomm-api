import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.entity';
import { Category } from './entity/categories.entity';
import { Role } from 'src/auth/auth.controller';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) { }

    @Post('add')
    @Role([1, 2])
    @UseGuards(JwtAuthGuard, RoleGuard)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto[]): Promise<Category[]> {
        return this.categoryService.createCategory(createCategoryDto);
    }

    @Put('update/:id')
    @Role([1, 2])
    @UseGuards(JwtAuthGuard, RoleGuard)
    async UpdateCat(@Param('id') id: number, @Body() updateCat: UpdateCategoryDto): Promise<Category[]> {
        return this.categoryService.updateCategory(id, updateCat)
    }

    @Get('get-all')
    async getCategories(): Promise<Category[]> {
        return this.categoryService.getCategories()
    }

    @Get('get/:id')
    async getCategoryById(@Param('id') id: number): Promise<Category> {
        return this.categoryService.getCategoryById(id)
    }

    @Delete('delete/:id')
    @Role([1, 2])
    @UseGuards(JwtAuthGuard, RoleGuard)
    async deleteCategory(@Param('id') id: number): Promise<{ message: string }> {
        return this.categoryService.deleteCategory(id)
    }


}
