import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {environment} from "../../../environments/environment";
import {ShoppingCartDetailDTO} from "../../models/ShoppingCartDetailDTO";
import {ShoppingCartDTO} from "../../models/ShoppingCartDTO";
import {Address} from "../../models/address";
import {AddressService} from "../../services/address.service";
import {OrderPaymentService} from "../../services/order-payment.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  idUser?: any
  orderProductDetailDTOS?: ShoppingCartDetailDTO[]
  shoppingCartDTO?: ShoppingCartDTO
  idOrderProduct?: any
  count = 0
  addressInUse?: Address
  messageError?: string

  constructor(private orderService: OrderService,
              private addressService: AddressService,
              private orderPaymentService: OrderPaymentService) {
    this.idUser = localStorage.getItem("id")
    environment.previousUrl = window.location.pathname;
  }

  ngOnInit(): void {
    if (this.idUser == null || this.idUser == '') return;
    this.getAllOrderByUser();
    this.getAllProductsInCartByUser();
    this.getAddressInUse();
  }

  getAddressInUse() {
    this.addressService.getAddressInUse(this.idUser).subscribe(rs => {
      this.addressInUse = rs
    })
  }

  getAllOrderByUser() {
    this.orderService.getDetailOrder(this.idUser).subscribe(rs => {
      this.shoppingCartDTO = rs
      this.shoppingCartDTO.totalPrice = Number(this.shoppingCartDTO.totalPrice).toLocaleString('en-US');
      this.orderProductDetailDTOS = rs.shoppingCartDetailDTOList
      if (this.orderProductDetailDTOS != null && this.orderProductDetailDTOS.length > 0) {
        this.idOrderProduct = this.orderProductDetailDTOS[0]?.idOrderProduct
        formatPrice(this.orderProductDetailDTOS);
      }
    })
  }

  getAllProductsInCartByUser() {
    this.orderService.getAllProductsInCartByUser(this.idUser).subscribe(rs => {
      this.count = rs
    }, error => {
      console.log("Lỗi getAllProductsInCartByUser: " + JSON.stringify(error))
    })
  }

  updateStatus() {
    this.orderService.changeStatus(this.idOrderProduct, this.idUser, "BOUGHT").subscribe()
    const currentDate = new Date();
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 3);
    const noteValue = (document.getElementById("note") as HTMLSelectElement).value;
    let payment = {
      idUser: this.idUser,
      idShoppingCart: this.idOrderProduct,
      idAddress: this.addressInUse?.id,
      note: noteValue,
      totalOrderAmount: this.shoppingCartDTO?.totalPrice,
      deliveryMethod: 'COD',
      estimatedDelivery: newDate,
    }
    this.orderPaymentService.createPayment(payment).subscribe(() => {
    }, error => {
      this.messageError = error.error.message
      console.log("Lỗi createPayment: " + JSON.stringify(error))
    })
  }

  removeFromCart(idOrderProductDetail: any) {
    this.orderService.removeFromCart(this.idUser, idOrderProductDetail).subscribe(() => {
      this.ngOnInit()
    })
  }
}

export function formatPrice(orderProductDetailDTOS: ShoppingCartDetailDTO[]) {
  if (orderProductDetailDTOS != null && orderProductDetailDTOS.length > 0) {
    for (let i = 0; i < orderProductDetailDTOS.length; i++) {
      orderProductDetailDTOS[i].totalPrice = Number(orderProductDetailDTOS[i].totalPrice).toLocaleString('en-US');
      orderProductDetailDTOS[i].price = Number(orderProductDetailDTOS[i].price).toLocaleString('en-US');
    }
  }
}
