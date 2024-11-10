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
  count = 0
  checkUser = false;

  constructor(private productService: ProductService,
              private orderService: OrderService) {
    this.idUser = localStorage.getItem("id")
  }

  ngOnInit(): void {
    this.checkUser = this.idUser == null || this.idUser == '';
    this.getAllProduct()
    this.getAllProductsInCartByUser()
    console.log("this.idUser :" + this.idUser)
  }

  getAllProduct() {
    console.log("getAllProduct")
    this.productService.getAllProduct().subscribe(rs => {
      this.products = rs;
    }, error => {
      console.log(error)
    })
    console.log("products: " + JSON.stringify(this.products))
  }

  addToCart(id: any) {
    this.idProduct = id;
    let listId = [this.idProduct];
    // @ts-ignore
    this.orderService.addToCart(0, this.idUser, listId).subscribe()
    this.getAllProductsInCartByUser()
  }

  getAllProductsInCartByUser() {
    if (this.idUser == null || this.idUser == '') return;
    this.orderService.getAllProductsInCartByUser(this.idUser).subscribe(rs => {
      this.count = rs
    })
  }
}
