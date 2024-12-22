import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDTO} from "../models/user-dto";

const API_URL = 'http://localhost:8080/api/admin'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getAllUser(idAdmin: any): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(API_URL + '/get-all-user?idAdmin=' + `${idAdmin}`)
  }
}
