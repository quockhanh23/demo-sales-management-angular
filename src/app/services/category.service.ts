import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_URL = environment.apiUrlHttps + "/api/categories"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getAllCategory(): Observable<any> {
    return this.http.get<any>(API_URL + '/getAllCategory')
  }
}
