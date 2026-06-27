import { Injectable, inject } from '@angular/core';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { PostApiService } from './post-api.service';
import { IPostListResponse } from '../interfaces/IPostListResponse';
import { IPost } from '../interfaces/IPost';
import { IPostUpdateRequest } from '../interfaces/IPostRequestBody';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postApiService: PostApiService = inject(PostApiService);

  postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  totalCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  posts$: Observable<IPost[]> = this.postsSubject.asObservable();
  totalCount$: Observable<number> = this.totalCountSubject.asObservable();

  getPosts(limit: number, offset: number): Observable<IPostListResponse> {
    return this.postApiService.getList(limit, offset).pipe(
      tap((response: IPostListResponse) => {
        this.postsSubject.next(response.posts);
        this.totalCountSubject.next(response.total);
      }),
    );
  }

  updatePost(id: number, data: IPostUpdateRequest): Observable<IPost> {
    return this.postApiService.updatePost(id, data).pipe(
      tap((updatePost: IPost) => {
        const posts: IPost[] = this.postsSubject.value.map((post: IPost) => post.id === updatePost.id ? updatePost : post);
        this.postsSubject.next(posts);
      })
    );
  };

  deletePost(selectedPost: IPost): Observable<IPost> {
    return this.postApiService.deletePost(selectedPost.id).pipe(
      tap((post: IPost) => {
        const posts: IPost[] = this.postsSubject.value.filter((currentPost: IPost) => currentPost.id !== post.id);
        this.postsSubject.next(posts);
        this.totalCountSubject.next(this.totalCountSubject.value - 1);
      })
    );
  };

}
