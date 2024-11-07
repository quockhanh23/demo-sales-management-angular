import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ProductDTO} from "../models/product-dto";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: ProductDTO[]
  idUser: any
  idProduct: any
  count: any

  constructor(private productService: ProductService,
              private orderService: OrderService) {
    this.idUser = localStorage.getItem("id")
  }

  ngOnInit(): void {
    this.getAllProduct()
    this.countProduct()
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe(rs => {
      this.products = rs;
    }, error => {
      console.log(error)
    })
  }

  addToCart(id: any) {
    this.idProduct = id;
    let listId = [this.idProduct];
    // @ts-ignore
    this.orderService.addToCart(0, this.idUser, listId).subscribe()
    this.countProduct()
  }

  countProduct() {
    this.orderService.count(this.idUser).subscribe(rs => {
      this.count = rs
    })
  }
}
