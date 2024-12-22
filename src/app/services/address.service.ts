import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Address} from "../models/address";

const API_URL = 'http://localhost:8080/api/address'

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) {}

  getAllAddressByUser(idUser: any): Observable<Address[]> {
    return this.http.get<Address[]>(API_URL + '/get-all-address-by-user?idUser=' + `${idUser}`)
  }

  createAddress(idUser: any, address: Address): Observable<Address> {
    return this.http.post<Address>(API_URL + `/create-address?idUser=${idUser}`, address)
  }
}
