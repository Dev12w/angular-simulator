import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, finalize, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PostApiService } from './post-api.service';
import { MessageService } from '../../../app/services/message.service';
import { IPost } from '../interfaces/IPost';
import { IPostListResponse } from '../interfaces/IPostListResponse';
import { IPaginationParams } from '../interfaces/IPaginationParams';
import { PostUpdateBody } from '../interfaces/IPostRequestBody';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postApiService: PostApiService = inject(PostApiService);
  private messageService: MessageService = inject(MessageService);

  private dataLoaderSubject: BehaviorSubject<IPaginationParams> = new BehaviorSubject<IPaginationParams>({ limit: 10, offset: 0 });

  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  private totalCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  posts$: Observable<IPost[]> = this.postsSubject.asObservable();
  totalCount$: Observable<number> = this.totalCountSubject.asObservable();
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  offset: number = 0;
  limit: number = 10;

  constructor() {
    this.initLoader();
  }

  initLoader(): void {
    this.dataLoaderSubject.pipe(
      tap(() => this.loadingSubject.next(true)),
      switchMap((params: IPaginationParams) =>
        this.postApiService.getList(params.limit, params.offset).pipe(
          catchError((error: HttpErrorResponse) => {
            this.messageService.showError(error.message);
            this.loadingSubject.next(false);
            return EMPTY;
          })
        )
      ),
      tap((response: IPostListResponse) => {
        this.postsSubject.next(response.posts);
        this.totalCountSubject.next(response.total);

        this.offset = response.skip;
        this.loadingSubject.next(false);
      })
    ).subscribe();
  }

  loadPosts(limit: number = this.limit, offset: number = this.offset): void {
    this.limit = limit;
    this.offset = offset;

    this.dataLoaderSubject.next({ limit, offset });
  }

  refresh(): void {
    this.loadPosts(this.limit, this.offset);
  }

  updatePost(postId: number, data: PostUpdateBody): Observable<IPost> {
    return this.postApiService.updatePost(postId, data).pipe(
      tap((updatedPost: IPost) => {
        const updatedPosts: IPost[] = this.postsSubject.value.map((post: IPost) =>
          post.id === updatedPost.id ? updatedPost : post
        );

        this.postsSubject.next(updatedPosts);
      })
    );
  }

  deletePost(post: IPost): Observable<IPost> {
    this.loadingSubject.next(true);

    return this.postApiService.deletePost(post.id).pipe(
      tap((deletedPost: IPost) => {
        this.postsSubject.next(
          this.postsSubject.value.filter((post: IPost) => post.id !== deletedPost.id)
        );

        this.totalCountSubject.next(
          this.totalCountSubject.value - 1
        );

        this.messageService.showSuccess(
          `Пост с id ${ deletedPost.id } удален`
        );
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError(
          `Ошибка при удалении поста ${ post.id }: ${ error.message }`
        );
        return EMPTY;
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }
}
