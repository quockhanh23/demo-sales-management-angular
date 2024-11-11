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
    if (this.checkUser) return;
    this.productService.getAllProduct().subscribe(rs => {
      this.products = rs;
      // console.log("products: " + JSON.stringify(this.products))
    }, error => {
      console.log(error)
    })
  }

  addToCart(product: ProductDTO) {
    // console.log("product: " + JSON.stringify(product))
    // @ts-ignore
    this.orderService.addToCart(0, this.idUser, product).subscribe()
    this.getAllProductsInCartByUser()
  }

  getAllProductsInCartByUser() {
    if (this.idUser == null || this.idUser == '') return;
    this.orderService.getAllProductsInCartByUser(this.idUser).subscribe(rs => {
      this.count = rs
      console.log("this.count: " + this.count)
    })
  }
}
