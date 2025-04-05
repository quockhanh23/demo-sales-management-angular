import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {OrderPayment} from "../models/order-payment";
import {OrderPaymentHistory} from "../models/order-payment-history";

const API_URL = environment.apiUrlHttp + "/api/payments"

@Injectable({
  providedIn: 'root'
})
export class OrderPaymentService {

  constructor(private http: HttpClient) {
  }

  createPayment(orderPayment: any): Observable<any> {
    return this.http.post<any>(API_URL + '/create-payment', orderPayment)
  }

  updateStatusPayment(idOrderPayment: any, status: string): Observable<any> {
    return this.http.put<any>(API_URL + `/update-status-payment?idOrderPayment=${idOrderPayment}&status=${status}`, {})
  }

  getAllOrderPaymentByIdUserAndOrderPaymentStatus(idUser: any, orderPaymentStatus: any): Observable<OrderPayment[]> {
    return this.http.get<OrderPayment[]>(API_URL + `/get-all-order-payment?idUser=${idUser}&orderPaymentStatus=${orderPaymentStatus}`)
  }

  getDetailOrderPayment(idUser: any, idOrderPayment: any): Observable<OrderPayment> {
    return this.http.get<OrderPayment>(API_URL + `/get-detail-order-payment?idUser=${idUser}&idOrderPayment=${idOrderPayment}`)
  }

  getAllHistoryOfOrderPayment(idUser: any, idOrderPayment: any): Observable<OrderPaymentHistory[]> {
    return this.http.get<OrderPaymentHistory[]>(API_URL + `/get-all-history-order-payment?idUser=${idUser}&idOrderPayment=${idOrderPayment}`)
  }
}
