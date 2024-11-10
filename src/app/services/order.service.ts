import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = 'http://localhost:8080/api/orders'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  addToCart(idOrder: any, idUser: any, listIdProduct: []): Observable<any> {
    return this.http.get<any>(API_URL + `/add-to-cart?idOrder=${idOrder}&idUser=${idUser}&listIdProduct=${listIdProduct}`)
  }

  getAllProductsInCartByUser(idUser: any): Observable<any> {
    return this.http.get<any>(API_URL + `/count-order?idUser=${idUser}`)
  }
}
