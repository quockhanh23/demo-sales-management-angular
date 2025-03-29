import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {UserDTO} from "../models/user-dto";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrlHttps + "/api/users"

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

  resetPassword(user: UserDTO): Observable<UserDTO> {
    return this.http.post<User>(API_URL + '/reset-password', user)
  }

  findByUsername(username: any): Observable<User> {
    return this.http.get<User>(API_URL + '/findByUserName?username=' + `${username}`)
  }

  getInformation(idUser: any): Observable<User> {
    return this.http.get<User>(API_URL + '/getInformation?idUser=' + `${idUser}`)
  }
}
