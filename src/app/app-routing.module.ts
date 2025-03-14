import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProductCreateComponent} from "./product-create/product-create.component";
import {OrderListComponent} from "./order-list/order-list.component";
import {UserForgotPasswordComponent} from "./user-forgot-password/user-forgot-password.component";
import {CheckoutComponent} from "./checkout/checkout.component";

const routes: Routes = [
  {
    path: '', component: ProductListComponent,
  },
  {
    path: 'detailProduct/:id', component: ProductDetailComponent,
  },
  {
    path: 'detailUser', component: UserDetailComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'register', component: RegisterComponent,
  },
  {
    path: 'createProduct', component: ProductCreateComponent,
  },
  {
    path: 'orderList', component: OrderListComponent,
  },
  {
    path: 'forgotPassword', component: UserForgotPasswordComponent,
  },
  {
    path: 'checkout/:id', component: CheckoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
