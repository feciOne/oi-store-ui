import { AttributeBase, GenericList, GenericSingle } from './base.model';
import { ParentCategoryInfo } from './category.model';
import { ImageAttribute, ImageItem } from './image.model';

export interface ProductAttribute extends AttributeBase {
  name: string;
  description: string;
  price: string;
  images: GenericList<ImageAttribute>;
  category: GenericSingle<ParentCategoryInfo>;
}

export interface ProductListItem {
  id: number;
  name: string;
  description: string;
  price: string;
  images: ImageItem[];
  categoryName: string;
}
