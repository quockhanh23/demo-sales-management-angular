import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ProductDTO} from "../models/product-dto";
import {OrderService} from "../services/order.service";
import {environment} from "../../environments/environment";
import {PageImpl} from "../models/page-impl";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productDTOPage?: PageImpl
  products?: ProductDTO[]
  idUser: any
  countAllProduct: number = 0
  countProductOfUser = 0
  checkUser = false;
  currentPage?: number = 0;
  currentPageAddOne?: number = 1;
  previousPageNumber?: number = 1;
  currentNumber?: number = 2;
  nextPageNumber?: number = 3;

  constructor(private productService: ProductService,
              private orderService: OrderService) {
    this.idUser = localStorage.getItem("id")
    environment.previousUrl = window.location.pathname;
  }

  ngOnInit(): void {
    this.idUser = localStorage.getItem("id")
    this.checkUser = this.idUser == null || this.idUser == '';
    this.getAllProduct(0, 8)
    this.getAllProductsInCartByUser()
    console.log("this.idUser :" + this.idUser)
  }

  getAllProduct(page: any, size: any) {
    console.log("getAllProduct")
    this.productService.getAllProduct(page, size).subscribe(rs => {
      this.productDTOPage = rs
      this.products = rs.content;
      // @ts-ignore
      this.countAllProduct = rs.content.length
      // console.log("products: " + JSON.stringify(this.products))
    }, error => {
      console.log(error)
    })
  }

  addToCart(product: ProductDTO) {
    // console.log("product: " + JSON.stringify(product))
    // @ts-ignore
    this.orderService.addToCart(0, this.idUser, product).subscribe(() => {
      this.getAllProductsInCartByUser()
    })
  }

  getAllProductsInCartByUser() {
    if (this.idUser == null || this.idUser == '') return;
    this.orderService.getAllProductsInCartByUser(this.idUser).subscribe(rs => {
      this.countProductOfUser = rs
      console.log("this.count: " + this.countProductOfUser)
    })
  }

  previousPage() {
    if (this.currentPage != null && this.currentPage > 0) {
      this.currentPage--;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllProduct(this.currentPage, 8);
      if (this.currentPage == 0 || this.currentPage == 1) {
        this.currentNumber = 2
        this.previousPageNumber = 1
        this.nextPageNumber = 3
      } else {
        this.currentNumber = this.currentPage + 1
        this.previousPageNumber = this.currentPage
        this.nextPageNumber = this.currentPage + 2
      }
    }
  }

  nextPage() {
    if (this.products == null || this.products.length == 0) return
    if (this.currentPage != null && (this.currentPage + 1)
      // @ts-ignore
      * this.productDTOPage?.number < this.productDTOPage?.totalElements) {
      this.currentPage++;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllProduct(this.currentPage, 8);
      this.currentNumber = this.currentPage + 1
      this.previousPageNumber = this.currentPage
      this.nextPageNumber = this.currentPage + 2
    }
  }
}
