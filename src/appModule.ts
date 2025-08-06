import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './itemsModule';

import { Item } from './entities/itemEntity';
import { Label } from './entities/labelEntity';
import { Category } from './entities/categoryEntity';

@Module({
  imports: [
    ItemsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      // migrations: ['src/migrations/*.ts'], 
      synchronize: false,
      ssl: true,
    }),
    TypeOrmModule.forFeature([Item, Label, Category]),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
