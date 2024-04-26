import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { AuthGuard } from './auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserUpdateComponent } from './user-update/user-update.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: ProductDetailsComponent,
    path: 'details/:productId',
  },
  {
    component: UserAuthComponent,
    path: 'user-auth',
  },
  {
    component: SearchComponent,
    path: 'search/:query',
  },
  {
    component: CartPageComponent,
    path: 'cart-page',
  },
  {
    component: CheckoutComponent,
    path: 'checkout',
  },
  {
    component: UserUpdateComponent,
    path: 'user-update',
  },
  { path: 'seller', loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule) },
  // {
  //   component: MyOrdersComponent,
  //   path: 'my-orders',
  // },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
