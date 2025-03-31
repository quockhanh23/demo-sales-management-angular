import {Component, OnInit} from '@angular/core';
import {OrderPayment} from "../../models/order-payment";
import {OrderPaymentService} from "../../services/order-payment.service";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {OrderPaymentHistory} from "../../models/order-payment-history";

@Component({
  selector: 'app-order-payment-detail',
  templateUrl: './order-payment-detail.component.html',
  styleUrls: ['./order-payment-detail.component.css']
})
export class OrderPaymentDetailComponent implements OnInit {

  orderPayment?: OrderPayment
  orderPaymentHistories?: OrderPaymentHistory[]
  idUser: any

  constructor(private orderPaymentService: OrderPaymentService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,) {
    this.idUser = localStorage.getItem("id")
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(rs => {
      const id = rs.get('id')
      this.getDetailOrderPayment(id);
      this.getAllHistoryOfOrderPayment(id);
    })
  }

  getDetailOrderPayment(idOrderPayment: any) {
    this.orderPaymentService.getDetailOrderPayment(this.idUser, idOrderPayment).subscribe(rs => {
      this.orderPayment = rs;
    })
  }

  getAllHistoryOfOrderPayment(idOrderPayment: any) {
    this.orderPaymentService.getAllHistoryOfOrderPayment(this.idUser, idOrderPayment).subscribe(rs => {
      this.orderPaymentHistories = rs;
    })
  }

}
