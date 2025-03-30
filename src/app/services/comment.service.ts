import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../models/comment";
import {CommentDTO} from "../models/comment-dto";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrlHttps + "/api/comments"

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getAllCommentByProduct(idProduct: any): Observable<Comment[]> {
    return this.http.get<Comment[]>(API_URL + '/get-comment-by-product?idProduct=' + `${idProduct}`)
  }

  createComment(commentDTO: CommentDTO): Observable<CommentDTO> {
    return this.http.post<CommentDTO>(API_URL + '/create', commentDTO)
  }

  deleteComment(idComment: any): Observable<any> {
    return this.http.delete<any>(API_URL + '/delete?idComment=' + `${idComment}`)
  }
}
