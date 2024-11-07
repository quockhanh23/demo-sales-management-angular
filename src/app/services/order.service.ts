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
    return this.http.get<any>(API_URL + `/addToCart?idOrder=${idOrder}&idUser=${idUser}&listIdProduct=${listIdProduct}`)
  }

  count(idUser: any): Observable<any> {
    return this.http.get<any>(API_URL + `/count?idUser=${idUser}`)
  }

  getAllOrderByUser(idUser: any): Observable<any> {
    return this.http.get<any>(API_URL + `/count?idUser=${idUser}`)
  }
}
