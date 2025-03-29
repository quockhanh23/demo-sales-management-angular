import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrlHttps + "/api/orders"

@Injectable({
  providedIn: 'root'
})
export class OrderPaymentService {

  constructor(private http: HttpClient) {
  }
}
