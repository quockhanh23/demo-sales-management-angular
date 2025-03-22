import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

const API_URL = 'http://localhost:8080/api/products'

@Injectable({
  providedIn: 'root'
})
export class OrderPaymentService {

  constructor(private http: HttpClient) {
  }
}
