import {Component, OnInit} from '@angular/core';
import {OrderPayment} from "../../models/order-payment";
import {OrderPaymentService} from "../../services/order-payment.service";

@Component({
  selector: 'app-admin-control-order',
  templateUrl: './admin-control-order.component.html',
  styleUrls: ['./admin-control-order.component.css']
})
export class AdminControlOrderComponent implements OnInit {

  orderPayments?: OrderPayment[]
  idUser: any

  constructor(private orderPaymentService: OrderPaymentService,) {
    this.idUser = localStorage.getItem("id")
  }

  ngOnInit(): void {
    if (this.idUser == null || this.idUser == "") return
    this.getAllOrderPayment('');
  }

  getAllOrderPayment(status: string) {
    this.orderPaymentService.getAllOrderPaymentByIdUserAndOrderPaymentStatus
    (this.idUser, status).subscribe(rs => {
      this.orderPayments = rs;
    })
  }

}
