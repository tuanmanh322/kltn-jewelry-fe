import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from './share/service/api.service';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {AccountComponent} from './auth/account/account.component';
import {FooterComponent} from './layout/footer/footer.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {AppRoutes} from './app.routing';
import {HomeComponent} from './home/home.component';
import {ProductListComponent} from './home/product-list/product-list.component';
import {ProductSalesComponent} from './home/product-sales/product-sales.component';
import {TinTucJewelryComponent} from './home/tin-tuc-jewelry/tin-tuc-jewelry.component';
import {ContactComponent} from './modules/contact/contact.component';
import {CartComponent} from './modules/cart/cart.component';
import {CartItemComponent} from './modules/cart/cart-item/cart-item.component';
import {CartOrderComponent} from './modules/cart/cart-order/cart-order.component';
import {ProductComponent} from './modules/product/product.component';
import {ProductDetailComponent} from './modules/product-detail/product-detail.component';
import {TinTucComponent} from './modules/tin-tuc/tin-tuc.component';
import {ErrorPageComponent} from './share/error-page/error-page.component';
import {TinTucDetailComponent} from './modules/tin-tuc-detail/tin-tuc-detail.component';
import {HttpConfigInterceptor} from './share/intercepter/http-config.interceptor';
import {ErrorInterceptor} from './share/intercepter/errror.interceptor';
import {HasAnyAuthorityDirective} from './share/directive/has-any-auth.directive';
import {PaginatorComponent} from './share/paginator/paginator.component';
import {AuthService} from './share/service/auth.service';
import {EventManagement} from './share/service/event.managements';
import {StorageService} from './share/service/storage.service';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {MoneyTransferPipe} from './share/pipe/money-transfer.pipe';
import {Ng5SliderModule} from 'ng5-slider';
import {ProfileUserComponent} from './modules/profile-user/profile-user.component';
import {LoadSuccessComponent} from './modules/load-success/load-success.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {AutoCompleteService} from './share/service/auto-complete.service';
import {ListCartComponent} from './admin/cart/list-cart/list-cart.component';
import {CategoryCreateComponent} from './admin/category/category-create/category-create.component';
import {CategoryEditComponent} from './admin/category/category-edit/category-edit.component';
import {ColorCreateComponent} from './admin/color/color-create/color-create.component';
import {ColorEditComponent} from './admin/color/color-edit/color-edit.component';
import {NewsCreateComponent} from './admin/news/news-create/news-create.component';
import {NewsEditComponent} from './admin/news/news-edit/news-edit.component';
import {ProductCreateComponent} from './admin/product/product-create/product-create.component';
import {ProductEditComponent} from './admin/product/product-edit/product-edit.component';
import {SaleCreateComponent} from './admin/sale/sale-create/sale-create.component';
import {SaleEditComponent} from './admin/sale/sale-edit/sale-edit.component';
import {TradeCreateComponent} from './admin/trade-mark/trade-create/trade-create.component';
import {TradeEditComponent} from './admin/trade-mark/trade-edit/trade-edit.component';
import {UserCreateComponent} from './admin/user/user-create/user-create.component';
import {UserEditComponent} from './admin/user/user-edit/user-edit.component';
import {UserListComponent} from './admin/user/user-list/user-list.component';
import {TradeListComponent} from './admin/trade-mark/trade-list/trade-list.component';
import {SaleListComponent} from './admin/sale/sale-list/sale-list.component';
import {OrderListComponent} from './admin/orders/order-list/order-list.component';
import {NewsListComponent} from './admin/news/news-list/news-list.component';
import {ContactListComponent} from './admin/contact/contact-list/contact-list.component';
import {ColorListComponent} from './admin/color/color-list/color-list.component';
import {ListCategoryComponent} from './admin/category/list-category/list-category.component';
import {AdminComponent} from './admin/admin/admin.component';
import {ProductListAdminComponent} from './admin/product/product-list-admin/product-list-admin.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    ProductListComponent,
    ProductSalesComponent,
    TinTucJewelryComponent,
    ContactComponent,
    CartComponent,
    CartItemComponent,
    CartOrderComponent,
    ProductComponent,
    ProductDetailComponent,
    TinTucComponent,
    ErrorPageComponent,
    TinTucDetailComponent,
    HasAnyAuthorityDirective,
    PaginatorComponent,
    MoneyTransferPipe,
    ProfileUserComponent,
    LoadSuccessComponent,
    ListCartComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    ColorCreateComponent,
    ColorEditComponent,
    NewsCreateComponent,
    NewsEditComponent,
    ProductCreateComponent,
    ProductEditComponent,
    SaleCreateComponent,
    SaleEditComponent,
    TradeCreateComponent,
    TradeEditComponent,
    UserCreateComponent,
    UserEditComponent,
    UserListComponent,
    TradeListComponent,
    SaleListComponent,
    SaleListComponent,
    ProductListComponent,
    OrderListComponent,
    NewsListComponent,
    ContactListComponent,
    ColorListComponent,
    ListCategoryComponent,
    AdminComponent,
    ProductListAdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutes,
    CarouselModule,
    Ng5SliderModule,
    CKEditorModule,
    NgbModule
  ],
  providers: [
    ApiService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    AuthService,
    EventManagement,
    StorageService,
    AutoCompleteService
  ],
  bootstrap: [AppComponent],
  exports: [
    FooterComponent,
    NavbarComponent,
    HasAnyAuthorityDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
