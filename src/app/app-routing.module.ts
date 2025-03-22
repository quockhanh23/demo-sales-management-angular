import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "./product/product-list/product-list.component";
import {ProductDetailComponent} from "./product/product-detail/product-detail.component";
import {UserDetailComponent} from "./user/user-detail/user-detail.component";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./user/register/register.component";
import {ProductCreateComponent} from "./product/product-create/product-create.component";
import {OrderListComponent} from "./order/order-list/order-list.component";
import {UserForgotPasswordComponent} from "./user/user-forgot-password/user-forgot-password.component";
import {CheckoutComponent} from "./order/checkout/checkout.component";
import {OrderDetailComponent} from "./order/order-detail/order-detail.component";

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
  {
    path: 'orderDetail/:id', component: OrderDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
