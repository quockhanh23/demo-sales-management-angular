import {Component, OnInit} from '@angular/core';
import {OrderService} from "../services/order.service";
import {OrderProductDetailDTO} from "../models/order-product-detail-dto";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  idUser: any
  orderProductDetailDTOS?: OrderProductDetailDTO[]

  constructor(private orderService: OrderService) {
    this.idUser = localStorage.getItem("id")
  }

  ngOnInit(): void {
    this.getAllOrderByUser();
  }

  getAllOrderByUser() {
    this.orderService.getDetailOrder(this.idUser).subscribe(rs => {
      this.orderProductDetailDTOS = rs.orderProductDetailDTOList
    })
  }

}
