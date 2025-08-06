import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/itemEntity';
import { Label } from './entities/labelEntity';
import { Category } from './entities/categoryEntity';
import { ItemsService } from './itemsService';
import { ItemsController } from './itemsController';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Label, Category])],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
