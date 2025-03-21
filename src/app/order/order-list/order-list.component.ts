import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {ShoppingCartDetailDTO} from "../../models/ShoppingCartDetailDTO";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  idUser: any
  orderProductDetailDTOS?: ShoppingCartDetailDTO[]
  idOrderProduct: any
  count = 0
  isLoading: boolean = true;

  constructor(private orderService: OrderService) {
    this.idUser = localStorage.getItem("id")
    environment.previousUrl = window.location.pathname;
  }

  ngOnInit(): void {
    this.getAllOrderByUser();
    this.getAllProductsInCartByUser();
  }

  removeFromCart(idOrderProductDetail: any) {
    this.orderService.removeFromCart(this.idUser, idOrderProductDetail).subscribe(() => {
      this.ngOnInit()
    })
  }

  getAllOrderByUser() {
    this.orderService.getDetailOrder(this.idUser).subscribe(rs => {
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
      this.isLoading = false;
    })
  }

  getAllProductsInCartByUser() {
    if (this.idUser == null || this.idUser == '') return;
    this.orderService.getAllProductsInCartByUser(this.idUser).subscribe(rs => {
      this.count = rs
      console.log("this.count: " + this.count)
    })
  }

  increaseProduct(idProduct: any) {
    this.orderService.increaseProduct(this.idUser, idProduct).subscribe(() => {
      this.ngOnInit()
    })
  }

  decreaseProduct(idProduct: any) {
    this.orderService.decreaseProduct(this.idUser, idProduct).subscribe(() => {
      this.ngOnInit()
    })
  }
}
