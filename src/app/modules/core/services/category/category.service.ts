import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BaseOptionsRequest } from '../../models/base-options-request.model';
import { Item, GenericResponse } from '../../models/base.model';
import { CategoryAttribute, CategoryListItem, ParentCategoryInfo } from '../../models/category.model';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _selectedCategory: CategoryListItem | null = null;
  selectedCategory$$ = new BehaviorSubject<CategoryListItem | null>(null); // null <=> {} as CategoryListItem
  selectedCategory$!: Observable<CategoryListItem | null>;

  constructor(private readonly baseApiService: BaseApiService) {
    this.selectedCategory$ = this.selectedCategory$$.asObservable();
  }

  /* getCategories(): Observable<Item<CategoryAttribute>[]> {
    const params: BaseOptionsRequest = { ['populate'] : 'category' };

    return this.baseApiService.get<GenericResponse<CategoryAttribute>>('categories', params).pipe(
      map((response: GenericResponse<CategoryAttribute>) => response.data)
    );
  } */
  getCategories(): Observable<CategoryListItem[]> {
    const params: BaseOptionsRequest = { ['populate'] : 'category' };

    return this.baseApiService.get<GenericResponse<CategoryAttribute>>('categories', params).pipe(
      map((response: GenericResponse<CategoryAttribute>) => response.data),
      map((data: Item<CategoryAttribute>[]) => data.map((item: Item<CategoryAttribute>) => {
        const parentData: Item<ParentCategoryInfo> = item.attributes.category.data;
        const parentId = parentData ? parentData.id : null;

        return {
          id: item.id,
          name: item.attributes.name,
          parentId
        };
      }))
    );
  }

  setSelectedCategory(category: CategoryListItem): void {
    this._selectedCategory = category;
    this.selectedCategory$$.next(category);
  }

  getSelectedCategoryId(): number | null {
    return this._selectedCategory?.id || null;
  }
}
