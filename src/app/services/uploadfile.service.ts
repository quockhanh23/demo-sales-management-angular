import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FileDetails} from "../models/file-details";

const API_URL = 'http://localhost:8080/api/uploads'

@Injectable({
  providedIn: 'root'
})
export class UploadfileService {

  constructor(private http: HttpClient) {
  }

  upload(file: File): Observable<FileDetails> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<FileDetails>(`${API_URL}/upload2`, formData);
  }
}
