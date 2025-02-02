import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseController } from './database/database.controller';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database/database.config';

@Module({

  imports: [
    TypeOrmModule.forRoot(databaseConfig()),
    DatabaseModule,
    AuthModule
  ],
  controllers: [AppController, DatabaseController, AuthController],
  providers: [AppService],
})
export class AppModule { }
