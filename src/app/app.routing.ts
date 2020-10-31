import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './modules/contact/contact.component';
import {TinTucComponent} from './modules/tin-tuc/tin-tuc.component';
import {CartComponent} from './modules/cart/cart.component';
import {ErrorPageComponent} from './share/error-page/error-page.component';
import {AccountComponent} from './auth/account/account.component';
import {ProductComponent} from './modules/product/product.component';
import {ProductDetailComponent} from './modules/product-detail/product-detail.component';
import {TinTucDetailComponent} from './modules/tin-tuc-detail/tin-tuc-detail.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {CartItemComponent} from './modules/cart/cart-item/cart-item.component';
import {CustomGuard} from './share/guard/custom.guard';
import {CartOrderComponent} from './modules/cart/cart-order/cart-order.component';
import {ProfileUserComponent} from './modules/profile-user/profile-user.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CustomGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'news',
    component: TinTucComponent
  },
  {
    path: 'news-detail/:id',
    component: TinTucDetailComponent
  },
  {
    path: 'cart',
    component: CartItemComponent
  },
  {
    path: 'product/order/:id',
    component: CartOrderComponent
  },
  {
    path: 'profile-user',
    component: ProfileUserComponent
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];
export const AppRoutes = RouterModule.forRoot(routes, {initialNavigation: 'enabled', scrollPositionRestoration: 'enabled'});
