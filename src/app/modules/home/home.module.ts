import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../core/core.module';
import * as components from './components';
import { ProductService } from './services/product.service';


@NgModule({
  declarations: [
    components.HomeComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule
  ],
  providers: [ProductService]
})
export class HomeModule { }
