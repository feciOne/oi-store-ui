import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { CategoryListItem } from '../../../core/models/category.model';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ProductListItem } from 'src/app/modules/core/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  serverUrl = environment.server.url;
  categoryList: CategoryListItem[] = [];
  subs: Subscription[] = [];
  
  total$!: Observable<number>;
  products$!: Observable<ProductListItem[]>;

  constructor(private readonly categoryService: CategoryService,
              private readonly productService: ProductService,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    const catSub = this.categoryService.getCategories().subscribe((res: CategoryListItem[]) => {
      this.categoryList = res;
      this.cdRef.detectChanges();
    });

    this.products$ = this.productService.getProducts(2, 5);
    this.total$ = this.productService.total$;

    this.subs.push(catSub);
  }

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      sub.unsubscribe();
    }
  }
}
