import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseOptionsRequest } from '../../models/base-options-request.model';
import { Item, GenericResponse } from '../../models/base.model';
import { CategoryAttribute, CategoryListItem, ParentCategoryInfo } from '../../models/category.model';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly baseApiService: BaseApiService) { }

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
}
