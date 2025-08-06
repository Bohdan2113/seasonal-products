import { Controller, Get } from '@nestjs/common';
import { ItemsService } from './itemsService';
import { ItemResponse } from './itemResponse'; 
import { plainToInstance } from 'class-transformer'; 

@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('seasonal')
  async getSeasonalItems() {
    const items = await this.itemsService.findSeasonalItems();
    return plainToInstance(ItemResponse, items, {
      excludeExtraneousValues: true,
    });;
  }

  @Get('similar')
  async getSimilarItems() {
     const items = await this.itemsService.findSimilarItems();
     return plainToInstance(ItemResponse, items, {
      excludeExtraneousValues: true, 
    });
  }

  @Get('random')
  async getRandomLocalizedItems() {
    return await this.itemsService.findLocalizedRandomItems();
  }
}
