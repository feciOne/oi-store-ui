import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { CategoryListItem } from '../../../core/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  categoryList!: CategoryListItem[];
  subs: Subscription[] = [];

  constructor(private readonly categoryService: CategoryService) { }

  ngOnInit(): void {
    const catSub = this.categoryService.getCategories().subscribe((res: CategoryListItem[]) => {
      this.categoryList = res;
    });

    this.subs.push(catSub);
  }

  ngOnDestroy(): void {
    for (let sub of this.subs) {
      sub.unsubscribe();
    }
  }
}
