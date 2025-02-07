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

@Module({

  imports: [
    TypeOrmModule.forRoot(databaseConfig()),
    DatabaseModule,
    AuthModule,
    ProfileModule
  ],
  controllers: [AppController, DatabaseController, AuthController, ProfileController],
  providers: [AppService, ProfileService],
})
export class AppModule { }
