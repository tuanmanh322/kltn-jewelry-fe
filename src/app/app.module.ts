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
import {AdminComponent} from './admin/admin.component';
import {ProductDetailComponent} from './modules/product-detail/product-detail.component';
import {TinTucComponent} from './modules/tin-tuc/tin-tuc.component';
import {ErrorPageComponent} from './share/error-page/error-page.component';
import {TinTucDetailComponent} from './modules/tin-tuc-detail/tin-tuc-detail.component';
import {HttpConfigInterceptor} from './share/intercepter/http-config.interceptor';
import {ErrorInterceptor} from './share/intercepter/errror.interceptor';
import {HasAnyAuthorityDirective} from './share/directive/has-any-auth.directive';
import { PaginatorComponent } from './share/paginator/paginator.component';
import {AuthService} from './share/service/auth.service';
import {EventManagement} from './share/service/event.managements';
import {StorageService} from './share/service/storage.service';
import { CarouselModule } from 'ngx-owl-carousel-o';

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
    AdminComponent,
    ProductDetailComponent,
    TinTucComponent,
    ErrorPageComponent,
    TinTucDetailComponent,
    HasAnyAuthorityDirective,
    PaginatorComponent
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
    CarouselModule
  ],
  providers: [
    ApiService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    AuthService,
    EventManagement,
    StorageService
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
