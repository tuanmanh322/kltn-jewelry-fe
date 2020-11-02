import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './modules/contact/contact.component';
import {TinTucComponent} from './modules/tin-tuc/tin-tuc.component';
import {ErrorPageComponent} from './share/error-page/error-page.component';
import {ProductComponent} from './modules/product/product.component';
import {ProductDetailComponent} from './modules/product-detail/product-detail.component';
import {TinTucDetailComponent} from './modules/tin-tuc-detail/tin-tuc-detail.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {CartItemComponent} from './modules/cart/cart-item/cart-item.component';
import {CustomGuard} from './share/guard/custom.guard';
import {CartOrderComponent} from './modules/cart/cart-order/cart-order.component';
import {ProfileUserComponent} from './modules/profile-user/profile-user.component';
import {LoadSuccessComponent} from './modules/load-success/load-success.component';
import {AdminGuard} from './share/guard/admin.guard';
import {UserListComponent} from './admin/user/user-list/user-list.component';
import {ListCategoryComponent} from './admin/category/list-category/list-category.component';
import {TradeListComponent} from './admin/trade-mark/trade-list/trade-list.component';
import {ColorListComponent} from './admin/color/color-list/color-list.component';
import {ContactListComponent} from './admin/contact/contact-list/contact-list.component';
import {SaleListComponent} from './admin/sale/sale-list/sale-list.component';
import {OrderListComponent} from './admin/orders/order-list/order-list.component';
import {NewsListComponent} from './admin/news/news-list/news-list.component';
import {AdminComponent} from './admin/admin/admin.component';
import {ProductListAdminComponent} from './admin/product/product-list-admin/product-list-admin.component';
import {AuthGuard} from './share/guard/auth.guard';


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
    path: 'admin',
    canActivate: [AdminGuard],
    component: AdminComponent

  },
  {
    path: 'admin/user/list',
    component: UserListComponent,
    canActivate: [AdminGuard]
  },

  {
    path: 'admin/category/list',
    component: ListCategoryComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/trade-mark/list',
    component: TradeListComponent,
    canActivate: [AdminGuard]
  },

  {
    path: 'admin/type/list',
    component: ColorListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/contact/list',
    component: ContactListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/sale/list',
    component: SaleListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/product/list',
    component: ProductListAdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/order/list',
    component: OrderListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/news/list',
    component: NewsListComponent,
    canActivate: [AdminGuard]
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
    path: 'order',
    component: CartOrderComponent
  },
  {
    path: 'profile-user',
    component: ProfileUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'load-success',
    component: LoadSuccessComponent
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];
export const AppRoutes = RouterModule.forRoot(routes, {initialNavigation: 'enabled', scrollPositionRestoration: 'enabled'});
