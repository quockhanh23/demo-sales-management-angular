import {Component, OnInit} from '@angular/core';
import {OrderPayment} from "../../models/order-payment";
import {OrderPaymentService} from "../../services/order-payment.service";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {OrderPaymentHistory} from "../../models/order-payment-history";
import {ShoppingCartDetailDTO} from "../../models/ShoppingCartDetailDTO";
import {OrderService} from "../../services/order.service";
import {AddressService} from "../../services/address.service";
import {Address} from "../../models/address";
import {User} from "../../models/user";

@Component({
  selector: 'app-order-payment-detail',
  templateUrl: './order-payment-detail.component.html',
  styleUrls: ['./order-payment-detail.component.css']
})
export class OrderPaymentDetailComponent implements OnInit {

  orderPayment?: OrderPayment
  orderPaymentHistories?: OrderPaymentHistory[]
  orderProductDetailDTOS?: ShoppingCartDetailDTO[]
  addressInUse?: Address
  user?: User
  idUser: any

  constructor(private orderPaymentService: OrderPaymentService,
              private userService: UserService,
              private addressService: AddressService,
              private orderService: OrderService,
              private activatedRoute: ActivatedRoute,) {
    this.idUser = localStorage.getItem("id")
  }

  ngOnInit(): void {
    if (this.idUser == null || this.idUser == '') return;
    this.activatedRoute.paramMap.subscribe(rs => {
      const idOrderPayment = rs.get('id')
      this.getDetailOrderPayment(idOrderPayment);
      this.getAllHistoryOfOrderPayment(idOrderPayment);
    })
    this.getAddressInUse();
    this.getInformation(this.idUser);
  }

  getDetailOrderPayment(idOrderPayment: any) {
    this.orderPaymentService.getDetailOrderPayment(this.idUser, idOrderPayment).subscribe(rs => {
      this.orderPayment = rs;
      this.getDetailShoppingCartById(this.orderPayment?.idShoppingCart);
    })
  }

  getAllHistoryOfOrderPayment(idOrderPayment: any) {
    this.orderPaymentService.getAllHistoryOfOrderPayment(this.idUser, idOrderPayment).subscribe(rs => {
      this.orderPaymentHistories = rs;
    })
  }

  getAddressInUse() {
    this.addressService.getAddressInUse(this.idUser).subscribe(rs => {
      this.addressInUse = rs
    })
  }

  getInformation(idUser: any) {
    this.userService.getInformation(idUser).subscribe(rs => {
      this.user = rs
    })
  }

  getDetailShoppingCartById(idShoppingCart: any) {
    this.orderService.getDetailShoppingCartById(idShoppingCart).subscribe(rs => {
      this.orderProductDetailDTOS = rs.shoppingCartDetailDTOList
      if (this.orderProductDetailDTOS != null && this.orderProductDetailDTOS.length > 0) {
        for (let i = 0; i < this.orderProductDetailDTOS.length; i++) {
          this.orderProductDetailDTOS[i].totalPrice =
            Number(this.orderProductDetailDTOS[i].totalPrice).toLocaleString('en-US');
          this.orderProductDetailDTOS[i].price =
            Number(this.orderProductDetailDTOS[i].price).toLocaleString('en-US');
        }
      }
    })
  }
}
