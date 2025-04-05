import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrlHttp + "/api/orders"

@Injectable({
  providedIn: 'root'
})
export class OrderPaymentHistoryService {

  constructor(private http: HttpClient) {
  }
}
