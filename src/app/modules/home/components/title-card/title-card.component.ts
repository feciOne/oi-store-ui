import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryListItem } from 'src/app/modules/core/models/category.model';
import { CategoryService } from 'src/app/modules/core/services/category/category.service';

@Component({
  selector: 'app-title-card',
  templateUrl: './title-card.component.html',
  styleUrls: ['./title-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleCardComponent implements OnInit {
  selectedCategory$!: Observable<CategoryListItem | null>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.selectedCategory$ = this.categoryService.selectedCategory$;
  }

}
