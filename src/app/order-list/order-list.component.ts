import {Component, OnInit} from '@angular/core';
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  idUser: any

  constructor(private orderService: OrderService) {
    this.idUser = localStorage.getItem("id")
  }

  ngOnInit(): void {
  }

  getAllOrderByUser() {

  }

}
