import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BaseOptionsRequest } from '../../core/models/base-options-request.model';
import { GenericList, GenericResponse, GenericSingle, Item } from '../../core/models/base.model';
import { CategoryAttribute, ParentCategoryInfo } from '../../core/models/category.model';
import { ImageAttribute, ImageItem } from '../../core/models/image.model';
import { PAGINATION, PARAMS } from '../../core/models/params.enum';
import { ProductAttribute } from '../../core/models/product.model';
import { BaseApiService } from '../../core/services/base-api.service';

@Injectable()
export class ProductService {
  private total$$ = new BehaviorSubject<number>(0);
  total$!: Observable<number>;

  constructor(private baseApiService: BaseApiService) {
    this.total$ = this.total$$.asObservable();
  }

  getProducts(pageSize: number, categoryId?: number): Observable<any> {
    const params: BaseOptionsRequest = {
      [PARAMS.populate]: 'images,category',
      [PARAMS.byCategoryId]: categoryId ? categoryId : null,
      [PAGINATION.pageSize]: pageSize ? pageSize : null
    };
    return this.baseApiService.get<GenericResponse<ProductAttribute>>('products', params).pipe(
      map((response: GenericResponse<ProductAttribute>) => {
        const total: number = response.meta?.pagination?.total || 0
        this.total$$.next(total);

        return response.data
      }),
      map((data: Item<ProductAttribute>[]) => data.map((item: Item<ProductAttribute>) => {

        return {
          id: item.id,
          name: item.attributes.name,
          description: item.attributes.description,
          price: item.attributes.price,
          images: this.getImageList(item.attributes.images),
          categoryName: this.getCategoryName(item.attributes.category)
        };
      }))
    )
  }

  private getImageList(imgs: GenericList<ImageAttribute>): ImageItem[] {
    return imgs.data.map((img: Item<ImageAttribute>) => {
      return {
        name: img.attributes.name,
        caption: img.attributes.caption,
        alternativeText: img.attributes.alternativeText,
        url: img.attributes.url
      };
    });
  }

  private getCategoryName(cat: GenericSingle<CategoryAttribute | ParentCategoryInfo>): string {
    return cat.data.attributes.name;
  }
}
