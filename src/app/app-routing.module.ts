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
import {CategoryCreateComponent} from "./category/category-create/category-create.component";
import {OrderPaymentDetailComponent} from "./payment/order-payment-detail/order-payment-detail.component";
import {AdminControlComponent} from "./admin/admin-control/admin-control.component";
import {AdminControlOrderComponent} from "./admin/admin-control-order/admin-control-order.component";

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
    path: 'createCategory', component: CategoryCreateComponent,
  },
  {
    path: 'orderPaymentDetail/:id', component: OrderPaymentDetailComponent,
  },
  {
    path: 'managementUser', component: AdminControlComponent,
  },
  {
    path: 'managementOrder', component: AdminControlOrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
