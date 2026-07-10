import { ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { PostApiService } from '../services/post-api.service';
import { catchError, EMPTY, tap } from 'rxjs';
import { MessageService } from '../../../app/services/message.service';

export const postResolver = (route: ActivatedRouteSnapshot) => {
  const postApiService: PostApiService = inject(PostApiService);
  const messageService: MessageService = inject(MessageService);

  const postId: string = route.paramMap.get('id')!;

  return postApiService.getPost(Number(postId)).pipe(
    catchError(() => {
      tap(() => messageService.showError('Ошибка запоса поста'));
      return EMPTY;
    }),
  );
};
