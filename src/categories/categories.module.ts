import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/categories.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([Category]), AuthModule, JwtModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [TypeOrmModule]
})
export class CategoriesModule { }
