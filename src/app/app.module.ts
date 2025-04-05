import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {ProductListComponent} from './product/product-list/product-list.component';
import {ProductDetailComponent} from './product/product-detail/product-detail.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './user/login/login.component';
import {FooterComponent} from './footer/footer.component';
import {HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from './user/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProductCreateComponent} from './product/product-create/product-create.component';
import {OrderListComponent} from './order/order-list/order-list.component';
import {UserForgotPasswordComponent} from './user/user-forgot-password/user-forgot-password.component';
import {AdminControlComponent} from './admin/admin-control/admin-control.component';
import {CheckoutComponent} from './order/checkout/checkout.component';
import {CategoryCreateComponent} from './category/category-create/category-create.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {OrderPaymentDetailComponent} from './payment/order-payment-detail/order-payment-detail.component';
import {AdminControlOrderComponent} from './admin/admin-control-order/admin-control-order.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    ProductListComponent,
    ProductDetailComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent,
    ProductCreateComponent,
    OrderListComponent,
    UserForgotPasswordComponent,
    AdminControlComponent,
    CheckoutComponent,
    CategoryCreateComponent,
    OrderPaymentDetailComponent,
    AdminControlOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
