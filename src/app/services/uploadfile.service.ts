import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FileDetails} from "../models/file-details";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrlHttps + "/api/uploads"

@Injectable({
  providedIn: 'root'
})
export class UploadfileService {

  constructor(private http: HttpClient) {
  }

  upload(file: File): Observable<FileDetails> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<FileDetails>(`${API_URL}/uploadInProject`, formData);
  }
}
