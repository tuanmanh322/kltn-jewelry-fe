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


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
    component: CartComponent
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];
export const AppRoutes = RouterModule.forRoot(routes, {initialNavigation: 'enabled', scrollPositionRestoration: 'enabled'});