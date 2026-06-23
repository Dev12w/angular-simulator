import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PostApiService } from './post-api.service';
import { MessageService } from '../../../app/services/message.service';
import { IPostListResponse } from '../interfaces/IPostListResponse';
import { IPaginationParams } from '../interfaces/IPaginationParams';
import { IPost } from '../interfaces/IPost';
import { PostUpdateRequest } from '../interfaces/IPostRequestBody';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postApiService: PostApiService = inject(PostApiService);
  private messageService: MessageService = inject(MessageService);

  private dataLoaderSubject: BehaviorSubject<IPaginationParams> = new BehaviorSubject<IPaginationParams>({ limit: 10, offset: 0 });
  private totalCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  totalCount$: Observable<number> = this.totalCountSubject.asObservable();

  dataLoader$: Observable<IPostListResponse> = this.dataLoaderSubject.pipe(
    switchMap((value: IPaginationParams) =>
      this.postApiService.getList(value.limit, value.offset).pipe(
        tap((response: IPostListResponse) => this.totalCountSubject.next(response.total)),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError(error.message);
          return EMPTY;
        }),
      )
    ),
  );

  loadPosts(limit: number, offset: number): void {
    this.dataLoaderSubject.next({
      offset: offset,
      limit: limit
    });
  }

  updatePost(id: number, data: PostUpdateRequest) {
    return this.postApiService.updatePost(id, data);
  }

  deletePost(selectedPost: IPost): Observable<IPost> {
    return this.postApiService.deletePost(selectedPost.id).pipe(
      tap((post: IPost) => this.messageService.showSuccess(`Пост с id ${ post.id } удален`)),
      catchError((error: HttpErrorResponse) => {
          this.messageService.showError(`Ошибка при удаления поста ${ selectedPost.id }: ${ error.message }`);
          return EMPTY;
        }
      )
    );
  }

}
