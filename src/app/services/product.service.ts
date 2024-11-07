import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductDTO} from "../models/product-dto";
import {Product} from "../models/product";

const API_URL = 'http://localhost:8080/api/products'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAllProduct(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(API_URL)
  }

  detailProduct(idProduct: any): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(API_URL + '/detailProduct?idProduct=' + `${idProduct}`)
  }

  createProduct(product: Product, idUser: any): Observable<Product> {
    return this.http.post<Product>(API_URL + '/create-product?idUser=' + `${idUser}`, product)
  }

  updateProduct(product: Product, idProduct: any, idUser: any, status: any): Observable<Product> {
    return this.http.put<Product>(API_URL +
      `/update-product?idProduct=${idProduct}&idUser=${idUser}&status=${status}`, product)
  }
}
