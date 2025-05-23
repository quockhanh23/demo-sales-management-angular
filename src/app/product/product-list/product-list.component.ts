import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductDTO} from "../../models/product-dto";
import {OrderService} from "../../services/order.service";
import {environment} from "../../../environments/environment";
import {PageImpl} from "../../models/page-impl";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productDTOPage?: PageImpl
  products?: ProductDTO[]
  idUser: any
  role?: any
  countAllProduct?: number = 0
  countProductOfUser = 0
  checkUser = false;
  currentPage?: number = 0;
  currentPageAddOne?: number = 1;
  previousPageNumber?: number = 1;
  currentNumber?: number = 2;
  nextPageNumber?: number = 3;
  sizePage = 0;
  isLoading: boolean = true;

  searchForm: FormGroup = this.formBuilder.group({
    productName: new FormControl(''),
  });

  constructor(private productService: ProductService,
              private orderService: OrderService,
              private formBuilder: FormBuilder) {
    this.idUser = localStorage.getItem("id")
    this.role = localStorage.getItem("role")
    environment.previousUrl = window.location.pathname;
    console.log("environment.previousUrl: " + environment.previousUrl)
  }

  ngOnInit(): void {
    this.idUser = localStorage.getItem("id")
    this.checkUser = this.idUser == null || this.idUser == '';
    this.getAllProduct(this.currentPage, 8);
    this.getAllProductsInCartByUser()
  }

  checkRoleAdmin() {
    if (this.role == null) return false;
    return this.role == "ROLE_ADMIN";
  }

  getAllProduct(page: any, size: any) {
    let checkError = false;
    let stock = "1";
    try {
      stock = (document.getElementById("stock") as HTMLSelectElement).value
    } catch (error) {
      checkError = true;
    }
    if (checkError) {
      stock = "1"
    } else {
      if ("Còn hàng" == stock) {
        stock = "1"
      } else {
        stock = "0"
      }
    }
    let product = {
      productName: this.searchForm.value.productName,
    }
    this.productService.getAllProduct(product.productName, stock, page, size).subscribe(rs => {
      this.productDTOPage = rs
      this.products = rs.content;
      if (this.products != null && this.products.length > 0) {
        for (let i = 0; i < this.products.length; i++) {
          this.products[i].price = Number(this.products[i].price).toLocaleString('en-US');
        }
      }
      this.sizePage = this.productDTOPage?.page?.size;
      this.countAllProduct = rs?.content?.length
      this.isLoading = false;
    }, error => {
      console.log("Lỗi getAllProduct: ", JSON.stringify(error))
    })
  }

  addToCart(product: ProductDTO) {
    this.orderService.addToCart(this.idUser, product).subscribe(() => {
      this.getAllProductsInCartByUser()
      this.ngOnInit()
    })
  }

  getAllProductsInCartByUser() {
    if (this.idUser == null || this.idUser == '') return;
    this.orderService.getAllProductsInCartByUser(this.idUser).subscribe(rs => {
      this.countProductOfUser = rs
    })
  }

  previousPage() {
    if (this.currentPage != null && this.currentPage > 0) {
      this.isLoading = true;
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
    // @ts-ignore
    console.log("this.currentPage" + this.currentPage)
    console.log("this.productDTOPage?.number" + this.productDTOPage?.page?.number)
    console.log("this.productDTOPage?.totalElements" + this.productDTOPage?.page?.totalElements)
    if (this.currentPage != null && (this.currentPage + 1)
      // @ts-ignore
      * this.productDTOPage?.page.number < this.productDTOPage?.page?.totalElements) {
      this.isLoading = true;
      this.currentPage++;
      this.currentPageAddOne = this.currentPage + 1
      this.getAllProduct(this.currentPage, 8);
      this.currentNumber = this.currentPage + 1
      this.previousPageNumber = this.currentPage
      this.nextPageNumber = this.currentPage + 2
    }
  }

  getSnackbar() {
    let x = document.getElementById("snackbar");
    // @ts-ignore
    x.className = "show";
    setTimeout(function () {
      // @ts-ignore
      x.className = x.className.replace("show", "");
    }, 3000);
  }
}
