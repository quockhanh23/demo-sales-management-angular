import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category";

const API_URL = environment.apiUrlHttps + "/api/categories"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getAllCategory(): Observable<any> {
    return this.http.get<any>(API_URL + '/get-all-category')
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(API_URL + '/create-category', category)
  }

  deleteCategory(idCategory: any): Observable<any> {
    return this.http.delete<any>(API_URL + '/delete-category?idCategory=' + `${idCategory}`)
  }
}
