import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { HomeComponent } from './components';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'account',
    loadChildren: () => import('../../modules/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard],
  },
  { path: 'product/:id', loadChildren: () => import('../product/product.module').then(m => m.ProductModule) },
  { path: 'home', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
