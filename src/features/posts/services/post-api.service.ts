import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPostListResponse } from '../interfaces/IPostListResponse';
import { IPost } from '../interfaces/IPost';
import { PostCreateBody, PostUpdateBody } from '../interfaces/IPostRequestBody';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private http: HttpClient = inject(HttpClient);

  getList(limit: number = 10, offset: number = 0): Observable<IPostListResponse> {
    const url = `https://dummyjson.com/posts?limit=${ limit }&skip=${ offset }`;
    return this.http.get<IPostListResponse>(url);
  }

  getPost(id: number): Observable<IPost> {
    const url = `https://dummyjson.com/posts/${ id }`;
    return this.http.get<IPost>(url);
  }

  createPost(body: PostCreateBody): Observable<IPost> {
    const url = 'https://dummyjson.com/posts/add';
    return this.http.post<IPost>(url, body);
  }

  updatePost(id: number, body: PostUpdateBody) {
    const url = `https://dummyjson.com/posts/${ id }`;
    return this.http.patch<IPost>(url, body);
  }

  deletePost(id: number): Observable<IPost> {
    const url = `https://dummyjson.com/posts/${ id }`;
    return this.http.delete<IPost>(url);
  }

}
