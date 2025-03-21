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
import { OrderDetailComponent } from './order/order-detail/order-detail.component';

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
    OrderDetailComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
