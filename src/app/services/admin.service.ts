import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDTO} from "../models/user-dto";
import {environment} from "../../environments/environment";
import {OrderPayment} from "../models/order-payment";

const API_URL = environment.apiUrlHttp + "/api/admin"

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getAllUser(idAdmin: any): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(API_URL + '/get-all-user?idAdmin=' + `${idAdmin}`)
  }

  userAction(idAdmin: any, idUser: any, type: string): Observable<any> {
    return this.http.put<any>(API_URL + `/user-action?idAdmin=${idAdmin}&idUser=${idUser}}&type=${type}`, {})
  }

  getAllOrderWaiting(idAdmin: any): Observable<OrderPayment[]> {
    return this.http.get<OrderPayment[]>(API_URL + '/order-waiting?idAdmin=' + `${idAdmin}`)
  }

}
