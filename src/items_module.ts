import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item_entity';
import { Label } from './entities/label_entity';
import { Category } from './entities/category_entity';
import { ItemsService } from './items_service';
import { ItemsController } from './items_controller';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Label, Category])],
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
