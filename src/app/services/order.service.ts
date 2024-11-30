import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductDTO} from "../models/product-dto";
import {OrderProductDTO} from "../models/order-product-dto";

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

  getAllProductsInCartByUser(idUser: any): Observable<any> {
    return this.http.get<any>(API_URL + `/count-order?idUser=${idUser}`)
  }

  getDetailOrder(idUser: any): Observable<OrderProductDTO> {
    return this.http.get<OrderProductDTO>(API_URL + `/all-in-cart?idUser=${idUser}`)
  }
}
