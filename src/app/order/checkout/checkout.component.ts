import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {environment} from "../../../environments/environment";
import {ShoppingCartDetailDTO} from "../../models/ShoppingCartDetailDTO";
import {ShoppingCartDTO} from "../../models/ShoppingCartDTO";
import {Address} from "../../models/address";
import {AddressService} from "../../services/address.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  idUser: any
  orderProductDetailDTOS?: ShoppingCartDetailDTO[]
  shoppingCartDTO?: ShoppingCartDTO
  idOrderProduct: any
  count = 0
  addressInUse?: Address

  constructor(private orderService: OrderService,
              private addressService: AddressService,) {
    this.idUser = localStorage.getItem("id")
    environment.previousUrl = window.location.pathname;
  }

  ngOnInit(): void {
    this.getAllOrderByUser();
    this.getAllProductsInCartByUser();
    this.getAddressInUse();
  }

  getAddressInUse() {
    if (this.idUser == null || this.idUser == '') return;
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
        this.idOrderProduct = this.orderProductDetailDTOS[0].idOrderProduct
        for (let i = 0; i < this.orderProductDetailDTOS.length; i++) {
          this.orderProductDetailDTOS[i].totalPrice =
            Number(this.orderProductDetailDTOS[i].totalPrice).toLocaleString('en-US');
          this.orderProductDetailDTOS[i].price =
            Number(this.orderProductDetailDTOS[i].price).toLocaleString('en-US');
        }
      }
    })
  }

  getAllProductsInCartByUser() {
    if (this.idUser == null || this.idUser == '') return;
    this.orderService.getAllProductsInCartByUser(this.idUser).subscribe(rs => {
      this.count = rs
      console.log("this.count: " + this.count)
    })
  }

  updateStatus() {
    this.orderService.changeStatus(this.idOrderProduct, this.idUser, "BOUGHT").subscribe()
  }

  removeFromCart(idOrderProductDetail: any) {
    this.orderService.removeFromCart(this.idUser, idOrderProductDetail).subscribe(() => {
      this.ngOnInit()
    })
  }
}
