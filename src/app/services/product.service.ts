import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductDTO} from "../models/product-dto";
import {Product} from "../models/product";
import {PageImpl} from "../models/page-impl";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrlHttp + "/api/products"

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAllProduct(productName: string, stock: string, page: number, size: number): Observable<PageImpl> {
    return this.http.get<PageImpl>(API_URL +
      `/getAllProduct?productName=${productName}&stock=${stock}&page=${page}&size=${size}`);
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
