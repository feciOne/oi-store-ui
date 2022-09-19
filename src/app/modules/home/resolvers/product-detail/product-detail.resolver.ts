import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { ProductListItem } from 'src/app/modules/core/models/product.model';
import { ProductService } from '../../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolver implements Resolve<ProductListItem> {
  constructor(private productService: ProductService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductListItem> {
    const id = route.paramMap.get('id');

    return this.productService.getProduct(id ? +id : 0);

    // Store like solution way: Call Action here and data will be written to store/service then mapping null is enough
    /* return this.productService.getProduct(id ? +id : 0).pipe(
      tap((details: ProductListItem) => {
        this.productService.currentProductDetail = details;
      }),
      map(() => null)
    ); */
  }
}
