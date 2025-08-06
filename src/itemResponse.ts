import { Expose, Transform } from 'class-transformer';
import { Category } from './entities/categoryEntity'; 
import { Label } from './entities/labelEntity';  

type TransformedObject = {
  id: number;
  name: string;
}

export class ItemResponse {
  @Expose()
  id: number;

  @Expose()
  name: {
    en?: string;
    fr?: string;
    ar?: string;
    ua?: string;
  };

  @Expose() 
  description: string;
  
  @Expose()
  price: number;
  
  @Expose()
  images: string[];

 @Expose()
  @Transform(({ obj }: { obj: { category: Category } }) => 
    obj.category ? { id: obj.category.id, name: obj.category.name } : null
  )
  category: TransformedObject;

  @Expose()
  @Expose()
  @Transform(({ obj }: { obj: { labels: Label[] } }) => 
    obj.labels
      ?.filter(label => !!label) 
      .map(label => ({ id: label.id, name: label.name })) ?? []
  )
  labels: TransformedObject[];
}