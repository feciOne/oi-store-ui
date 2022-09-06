import { CategoryListItem } from '../models/category.model';

export function getChildCategories(categories: CategoryListItem[], id: number): [CategoryListItem[], CategoryListItem[]] {
  const mainCategories: CategoryListItem[] = [];
  const subCategories: CategoryListItem[] = categories.filter((item, idx) => {
    const control = item.parentId === id;

    control ? null : mainCategories.push(item);

    return control;
  });

  return [mainCategories, subCategories];
}
