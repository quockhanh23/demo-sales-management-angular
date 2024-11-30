import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {FooterComponent} from './footer/footer.component';
import {HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ProductCreateComponent} from './product-create/product-create.component';
import {OrderListComponent} from './order-list/order-list.component';
import {UserForgotPasswordComponent} from './user-forgot-password/user-forgot-password.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
