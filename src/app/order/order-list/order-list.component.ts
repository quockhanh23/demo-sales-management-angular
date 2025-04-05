import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {ShoppingCartDetailDTO} from "../../models/ShoppingCartDetailDTO";
import {environment} from "../../../environments/environment";
import {formatPrice} from "../checkout/checkout.component";

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
  openModal = false;

  constructor(private orderService: OrderService) {
    this.idUser = localStorage.getItem("id")
    environment.previousUrl = window.location.pathname;
  }

  ngOnInit(): void {
    this.checkLogin();
    if (this.idUser == null || this.idUser == '') return;
    this.getAllOrderByUser();
    this.getAllProductsInCartByUser();
  }

  checkLogin(): any {
    const modalControl = document.getElementById('control-modal') as HTMLInputElement;
    if (modalControl) {
      modalControl.checked = this.idUser == null || this.idUser == '';
      this.openModal = true;
    }
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
        formatPrice(this.orderProductDetailDTOS);
      }
      this.isLoading = false;
    })
  }

  getAllProductsInCartByUser() {
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
