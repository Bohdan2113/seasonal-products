import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, LessThan } from 'typeorm';
import { Item } from './entities/item_entity';
import { Label } from './entities/label_entity';
import { Category } from './entities/category_entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,

    @InjectRepository(Label)
    private labelsRepository: Repository<Label>,

    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findSeasonalItems(): Promise<Item[]> {
    const seasonalLabel = await this.labelsRepository.findOneBy({ name: 'seasonal' });
    if (!seasonalLabel) return [];

    return this.itemsRepository.find({
      where: {
        labels: { id: seasonalLabel.id },
        price: LessThan(100),
      },
      relations: ['labels', 'category'],
    });
  }

  async findSimilarItems(): Promise<Item[]> {
    // Випадковий базовий товар
    const baseItem = await this.itemsRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.labels', 'label')
      .leftJoinAndSelect('item.category', 'category')
      .leftJoinAndSelect('category.parent', 'parent')
      .orderBy('RANDOM()')
      .getOne();

    if (!baseItem) return [];

    const labelIds = baseItem.labels.map((label) => label.id);

    // Якщо в категорії < 10 товарів беремо батьківський
    const sameCategoryCount = await this.itemsRepository.count({
      where: { category: { id: baseItem.category.id } },
    });

    const categoryIds = [baseItem.category.id];
    if (sameCategoryCount < 10 && baseItem.category.parent?.id) {
      categoryIds.push(baseItem.category.parent.id);
    }

    // Пошук схожих товарів
    const similarItems = await this.itemsRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.labels', 'label')
      .leftJoinAndSelect('item.category', 'category')
      .where('item.id != :baseId', { baseId: baseItem.id }) // виключити базовий
      .andWhere('item.categoryId IN (:...catIds)', { catIds: categoryIds })
      .andWhere('label.id IN (:...labelIds)', { labelIds })
      .addSelect('ABS(item.price - :basePrice)', 'price_diff')
      .setParameter('basePrice', baseItem.price)
      .orderBy('price_diff', 'ASC')
      .limit(5)
      .getMany();

    return similarItems;
  }

  async findLocalizedRandomItems() {
    const items = await this.itemsRepository
      .createQueryBuilder('item')
      .orderBy('RANDOM()')
      .limit(5)
      .getMany();

    return items.map((item) => ({
      name: item.name.ar || item.name.en,
      price: item.price,
    }));
  }
}
