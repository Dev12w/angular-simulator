import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPostListResponse } from '../interfaces/IPostListResponse';
import { IPost } from '../interfaces/IPost';
import { PostCreateRequest, PostUpdateRequest } from '../interfaces/IPostRequestBody';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private http: HttpClient = inject(HttpClient);

  private readonly API_URL: string = 'https://dummyjson.com/posts';

  getList(limit: number = 10, offset: number = 0): Observable<IPostListResponse> {
    const url: string = `${ this.API_URL }?limit=${ limit }&skip=${ offset }`;
    return this.http.get<IPostListResponse>(url);
  }

  getPost(id: number): Observable<IPost> {
    const url: string = `${ this.API_URL }/${ id }`;
    return this.http.get<IPost>(url);
  }

  createPost(body: PostCreateRequest): Observable<IPost> {
    const url: string = `${ this.API_URL }/add`;
    return this.http.post<IPost>(url, body);
  }

  updatePost(id: number, body: PostUpdateRequest): Observable<IPost> {
    const url: string = `${ this.API_URL }/${ id }`;
    return this.http.patch<IPost>(url, body);
  }

  deletePost(id: number): Observable<IPost> {
    const url: string = `${ this.API_URL }/${ id }`;
    return this.http.delete<IPost>(url);
  }

}
