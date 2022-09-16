import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { CategoryListItem } from '../../../core/models/category.model';
import { merge, Observable, Subscription, switchMap } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ProductListItem } from 'src/app/modules/core/models/product.model';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup } from '@angular/forms';

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

  filterForm: FormGroup = new FormGroup({
    page: new FormControl('1'),
    pageSize: new FormControl('1')
  });

  constructor(private readonly categoryService: CategoryService,
              private readonly productService: ProductService,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    const catSub = this.categoryService.getCategories().subscribe((res: CategoryListItem[]) => {
      this.categoryList = res;
      this.cdRef.detectChanges();
    });

    this.total$ = this.productService.total$;
    this.products$ = merge(this.categoryService.selectedCategory$, this.filterForm.valueChanges).pipe(
      switchMap(() => this.productService.getProducts(this.filterForm.get('page')?.value, this.filterForm.get('pageSize')?.value))
    )

    const pageSizeSub = this.filterForm.get('pageSize')!.valueChanges.subscribe(() => console.log('Listening any form control like here!'));

    this.subs.push(...[catSub, pageSizeSub]);
  }

  selectCategory(category: CategoryListItem): void {
    this.categoryService.setSelectedCategory(category);
  }

  pageChanged(pageIndex: number): void {
    this.filterForm.patchValue({ page: pageIndex });
  }

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      sub.unsubscribe();
    }
  }
}
