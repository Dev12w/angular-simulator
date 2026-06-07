import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPostListResponse } from '../interfaces/IPostListResponse';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private http:HttpClient = inject(HttpClient);

  getList(limit: number = 10, offset: number = 0): Observable<IPostListResponse> {
    const postsUrl = `https://dummyjson.com/posts?limit=${ limit }&skip=${ offset }`;
    return this.http.get<IPostListResponse>(postsUrl);
  }

}
