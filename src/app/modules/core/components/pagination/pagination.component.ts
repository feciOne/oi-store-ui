import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnChanges {
  private _total: number = 0;
  numberOfPages!: number;

  @Input()
  pageSize: number = 1;
  @Input()
  set total(val: number) {
    this._total = val;
    this.numberOfPages = Math.ceil(val/this.pageSize);
  }
  @Output()
  onSelectPage = new EventEmitter<number>();

  page = 1;

  Math = Math; // We can make available such default keywords for templates
  array = () => new Array(this.numberOfPages);

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const pSizeChanges = changes['pageSize'];

    if (pSizeChanges) {
      // Do some logic here related with input prop pageSize
      this.numberOfPages = Math.ceil(this._total/pSizeChanges.currentValue);

      if (this.page > this.numberOfPages) this.page = 1;
    }
  }

  ngOnInit(): void {

  }

  goToPage(pageIndex: number): void {
    this.page = pageIndex;
    this.onSelectPage.emit(pageIndex);
  }
}
