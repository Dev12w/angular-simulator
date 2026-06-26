import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, catchError, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PostApiService } from './post-api.service';
import { MessageService } from '../../../app/services/message.service';
import { IPostListResponse } from '../interfaces/IPostListResponse';
import { IPost } from '../interfaces/IPost';
import { PostUpdateRequest } from '../interfaces/IPostRequestBody';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postApiService: PostApiService = inject(PostApiService);
  private messageService: MessageService = inject(MessageService);

  getPosts(limit: number, offset: number): Observable<IPostListResponse> {
    return this.postApiService.getList(limit, offset).pipe(
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError(error.message);
        return EMPTY;
      })
    );
  }

  updatePost(id: number, data: PostUpdateRequest): Observable<IPost> {
    return this.postApiService.updatePost(id, data).pipe(
      tap(() => this.messageService.showSuccess('Пост изменен'))
    );
  };

  deletePost(selectedPost: IPost): Observable<IPost> {
    return this.postApiService.deletePost(selectedPost.id).pipe(
      tap((post: IPost) => this.messageService.showSuccess(`Пост с id ${ post.id } удален`)),
      catchError((error: HttpErrorResponse) => {
          this.messageService.showError(`Ошибка при удаления поста ${ selectedPost.id }: ${ error.message }`);
          return EMPTY;
        }
      )
    );
  };

}
