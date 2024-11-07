import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";

const API_URL = 'http://localhost:8080/api/users'

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

  findByUsername(username: any): Observable<User> {
    return this.http.get<User>(API_URL + '/findByUserName?username=' + `${username}`)
  }
}
