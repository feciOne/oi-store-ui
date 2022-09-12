import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { CommonErrorDisplayComponent } from './components/common-error-display/common-error-display.component';



@NgModule({
  declarations: [
    FilterByPipe,
    CommonErrorDisplayComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterByPipe,
    CommonErrorDisplayComponent
  ]
})
export class CoreModule { }
