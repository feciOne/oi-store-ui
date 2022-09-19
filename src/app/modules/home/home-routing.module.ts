import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { HomeComponent } from './components';
import { ProductDetailResolver } from './resolvers/product-detail/product-detail.resolver';
import { ProductService } from './services/product.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'account',
    loadChildren: () => import('../../modules/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'product/:id',
    loadChildren: () => import('../product/product.module').then(m => m.ProductModule),
    resolve: {
      productDetails: ProductDetailResolver
    }
    // While using store like solution we don't need ActivatedRoute to get data
    // resolve: [ProductDetailResolver]
  },
  { path: 'home', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
