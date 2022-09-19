import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../core/core.module';
import * as components from './components';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  components.HomeComponent,
  components.TitleCardComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  providers: []
})
export class HomeModule { }
