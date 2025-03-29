import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Star} from "../models/star";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrlHttps + "/api/stars"

@Injectable({
  providedIn: 'root'
})
export class StarService {

  constructor(private http: HttpClient) {
  }

  getAllStarByProduct(idProduct: any): Observable<Star[]> {
    return this.http.get<Star[]>(API_URL + '/get-star?idProduct=' + `${idProduct}`)
  }

  create(idProduct: any, idUser: any, type: any): Observable<any> {
    return this.http.get<any>(API_URL + `/create-star?idProduct=${idProduct}&idUser=${idUser}&type=${type}`)
  }

  getAllStarByProductAndUser(idProduct: any,  idUser: any): Observable<Star> {
    return this.http.get<Star>(API_URL + '/get-star-by-user?idProduct=' + `${idProduct}&idUser=${idUser}`)
  }
}
