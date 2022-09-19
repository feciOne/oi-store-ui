import { AttributeBase, GenericList, GenericSingle } from './base.model';
import { ParentCategoryInfo } from './category.model';
import { CommentAttribute, CommentListItem } from './comment.model';
import { ImageAttribute, ImageItem } from './image.model';

export interface ProductAttribute extends AttributeBase {
  name: string;
  description: string;
  price: string;
  category: GenericSingle<ParentCategoryInfo>;
  images: GenericList<ImageAttribute>;
  comments?: GenericList<CommentAttribute>;
}

export interface ProductListItem {
  id: number;
  name: string;
  description: string;
  price: string;
  categoryName: string;
  images: ImageItem[];
  comments?: CommentListItem[];
}
