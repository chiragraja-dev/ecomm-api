import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseController } from './database/database.controller';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database/database.config';
import { ProfileController } from './profile/profile.controller';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesService } from './categories/categories.service';
import { CategoriesController } from './categories/categories.controller';
import { JwtModule } from '@nestjs/jwt';
import { RoleGuard } from './auth/role.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig()),
    JwtModule.register({}),
    DatabaseModule,
    AuthModule,
    ProfileModule,
    ProductModule,
    CategoriesModule
  ],
  controllers: [
    AppController,
    DatabaseController,
    AuthController,
    ProfileController,
    ProductController,
    CategoriesController
  ],
  providers: [AppService,
    ProfileService,
    ProductService,
    CategoriesService,
    RoleGuard],
})
export class AppModule { }
