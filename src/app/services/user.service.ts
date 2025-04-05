import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrlHttp + "/api/users"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  login(user: { password: any; username: any }): Observable<User> {
    return this.http.post<User>(API_URL + '/login', user)
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/register', user)
  }

  resetPassword(user: any): Observable<any> {
    return this.http.put<any>(API_URL + '/reset-password', user)
  }

  changePassword(user: any, idUser: any): Observable<any> {
    return this.http.put<any>(API_URL + `/change-password?idUser=${idUser}`, user)
  }

  findByUsername(username: any): Observable<User> {
    return this.http.get<User>(API_URL + '/findByUserName?username=' + `${username}`)
  }

  getInformation(idUser: any): Observable<User> {
    return this.http.get<User>(API_URL + '/getInformation?idUser=' + `${idUser}`)
  }
}
