import { Controller, Get, Render } from '@nestjs/common';
import { ItemsService } from './items_service';

@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('seasonal')
  async getSeasonalItems() {
    const items = await this.itemsService.findSeasonalItems();
    return items;
  }

    @Get('similar')
  async getSimilarItems() {
    return await this.itemsService.findSimilarItems();
  }

  @Get('random')
  async getRandomLocalizedItems() {
    return await this.itemsService.findLocalizedRandomItems();
  }
}
