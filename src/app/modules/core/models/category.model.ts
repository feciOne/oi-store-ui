import { AttributeBase, GenericSingle } from './base.model';

export interface CategoryAttribute extends AttributeBase {
  name: string;
  category: GenericSingle<ParentCategoryInfo>
  description?: string;
}

export type ParentCategoryInfo = Omit<CategoryAttribute, 'category'>;


export interface CategoryListItem {
  id: number;
  name: string;
  parentId: number | null;
}
