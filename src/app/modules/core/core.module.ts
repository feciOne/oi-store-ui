import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { CommonErrorDisplayComponent } from './components/common-error-display/common-error-display.component';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    FilterByPipe,
    CommonErrorDisplayComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterByPipe,
    CommonErrorDisplayComponent,
    PaginationComponent
  ]
})
export class CoreModule { }
