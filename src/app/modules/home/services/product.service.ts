import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BaseOptionsRequest } from '../../core/models/base-options-request.model';
import { GenericList, GenericResponse, GenericResponseSingle, GenericSingle, Item } from '../../core/models/base.model';
import { CategoryAttribute, ParentCategoryInfo } from '../../core/models/category.model';
import { ImageAttribute, ImageItem } from '../../core/models/image.model';
import { PAGINATION, PARAMS } from '../../core/models/params.enum';
import { ProductAttribute, ProductListItem } from '../../core/models/product.model';
import { BaseApiService } from '../../core/services/base-api.service';
import { CategoryService } from '../../core/services/category/category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  currentProductDetail: ProductListItem | null = null;
  private _total = 0;
  private total$$ = new BehaviorSubject<number>(0);
  total$!: Observable<number>;

  constructor(private baseApiService: BaseApiService, private categoryService: CategoryService) {
    this.total$ = this.total$$.asObservable();
  }

  private isPageAvailable(page: number, pageSize: number): boolean {
    return page <= Math.ceil(this._total/pageSize);
  }

  getProduct(id: number): Observable<ProductListItem> {
    const params: BaseOptionsRequest = {
      [PARAMS.populate]: 'images,category,comment',
    };

    return this.baseApiService.get<GenericResponseSingle<ProductAttribute>>(`products/${id}`, params).pipe(
      map((response: GenericResponseSingle<ProductAttribute>) => response.data),
      map((item: Item<ProductAttribute>) => {
        return {
          id: item.id,
          name: item.attributes.name,
          description: item.attributes.description,
          price: item.attributes.price,
          images: this.getImageList(item.attributes.images),
          categoryName: this.getCategoryName(item.attributes.category)
        };
    }));
  }

  getProducts(page: number, pageSize: number, categoryId?: number): Observable<ProductListItem[]> {
    const catId = this.categoryService.getSelectedCategoryId();

    if (catId) categoryId = catId;
    if (!this.isPageAvailable(page, pageSize)) page = 1;

    const params: BaseOptionsRequest = {
      [PARAMS.populate]: 'images,category',
      [PARAMS.byCategoryId]: categoryId ? categoryId : null,
      [PAGINATION.page]: page && page !== 1 ? page : null,
      [PAGINATION.pageSize]: pageSize ? pageSize : null
    };

    return this.baseApiService.get<GenericResponse<ProductAttribute>>('products', params).pipe(
      map((response: GenericResponse<ProductAttribute>) => {
        const total: number = response.meta?.pagination?.total || 0
        this.total$$.next(total);
        this._total = total;

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
