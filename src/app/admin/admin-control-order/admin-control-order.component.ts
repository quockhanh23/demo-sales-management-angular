import {Component, OnInit} from '@angular/core';
import {OrderPayment} from "../../models/order-payment";
import {OrderPaymentService} from "../../services/order-payment.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-admin-control-order',
  templateUrl: './admin-control-order.component.html',
  styleUrls: ['./admin-control-order.component.css']
})
export class AdminControlOrderComponent implements OnInit {

  orderPayments?: OrderPayment[]
  idUser: any
  heightDiv = 'height: 400px'

  constructor(private orderPaymentService: OrderPaymentService,) {
    this.idUser = localStorage.getItem("id")
    environment.previousUrl = window.location.pathname;
  }

  ngOnInit(): void {
    if (this.idUser == null || this.idUser == "") return
    this.getAllOrderPayment('');
  }

  getAllOrderPayment(status: string) {
    this.orderPaymentService.getAllOrderPaymentByIdUserAndOrderPaymentStatus
    (this.idUser, status).subscribe(result => {
      this.orderPayments = result;
      if (result?.length > 5) {
        let px = 15 * result?.length
        this.heightDiv = 'height' + px + 'px'
      }
    })
  }

}
