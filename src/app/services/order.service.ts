import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductDTO} from "../models/product-dto";
import {ShoppingCartDTO} from "../models/ShoppingCartDTO";

const API_URL = 'http://localhost:8080/api/orders'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  addToCart(idUser: any, productDTO: ProductDTO): Observable<ProductDTO> {
    return this.http.post<ProductDTO>(API_URL + `/add-to-cart?idUser=${idUser}`, productDTO)
  }

  removeFromCart(idUser: any, idProduct: any): Observable<any> {
    return this.http.delete<ProductDTO>(API_URL +
      `/remove-from-cart?idUser=${idUser}&idProduct=${idProduct}`)
  }

  increaseProduct(idUser: any, idProduct: any): Observable<any> {
    return this.http.get<ProductDTO>(API_URL +
      `/increase-product?idUser=${idUser}&idProduct=${idProduct}`)
  }

  decreaseProduct(idUser: any, idProduct: any): Observable<any> {
    return this.http.get<ProductDTO>(API_URL +
      `/decrease-product?idUser=${idUser}&idProduct=${idProduct}`)
  }

  getAllProductsInCartByUser(idUser: any): Observable<any> {
    return this.http.get<any>(API_URL + `/count-order?idUser=${idUser}`)
  }

  getDetailOrder(idUser: any): Observable<ShoppingCartDTO> {
    return this.http.get<ShoppingCartDTO>(API_URL + `/all-in-cart?idUser=${idUser}`)
  }

  changeStatus(idOrderProduct: any, idUser: any, status: any): Observable<any> {
    return this.http.get<any>(API_URL +
      `/change-status?idOrderProduct=${idOrderProduct}&idUser=${idUser}&status=${status}`)
  }

  getAllOrderComplete(idUser: any): Observable<ShoppingCartDTO[]> {
    return this.http.get<ShoppingCartDTO[]>(API_URL + `/get-all-complete?idUser=${idUser}`)
  }
}
