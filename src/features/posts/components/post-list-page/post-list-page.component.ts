import { Component, inject } from '@angular/core';
import { TableModule, TablePageEvent } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { IPost } from '../../interfaces/IPost';
import { catchError, EMPTY, finalize, map, Observable, switchMap, tap } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';
import { ContextMenu } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { IPostUpdateRequest } from '../../interfaces/IPostRequestBody';
import { PostService } from '../../services/post.service';
import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../../../app/services/message.service';

@Component({
  selector: 'app-post-list-page',
  imports: [TableModule, Tag, Button, Skeleton, ContextMenu, FormsModule, AsyncPipe],
  templateUrl: './post-list-page.component.html',
  styleUrl: './post-list-page.component.scss',
  providers: [DialogService]
})
export class PostListPageComponent {

  router: Router = inject(Router);
  dialogService: DialogService = inject(DialogService);
  postService: PostService = inject(PostService);
  messageService: MessageService = inject(MessageService);

  offset: number = 0;
  limit: number = 10;
  isLoading: boolean = true;
  editPostDialogRef: DynamicDialogRef | null = null;
  selectedPost: IPost | null = null;
  totalCount$: Observable<number> = this.postService.totalCount$;
  posts$: Observable<IPost[]> = this.postService.posts$;

  contextMenuItems: MenuItem[] = [
    {
      label: 'Просмотр',
      icon: 'pi pi-fw pi-search',
      command: () => this.toPostDetailPage(this.selectedPost!)
    },
    {
      label: 'Редактировать',
      icon: 'pi pi-fw pi-pencil',
      command: () => this.editPost(this.selectedPost!)
    },
    {
      label: 'Удалить',
      icon: 'pi pi-fw pi-times',
      command: () => this.deletePost(this.selectedPost!)
    }
  ];

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(this.limit, this.offset).pipe(
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError(error.message);
        return EMPTY;
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  pageChange(event: TablePageEvent): void {
    this.limit = event.rows;
    this.offset = event.first;
    this.isLoading = true;
    this.postService.getPosts(this.limit, this.offset).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  toPostDetailPage(selectedPost: IPost): void {
    this.router.navigateByUrl(`/posts/${ selectedPost.id }`);
  }

  editPost(selectedPost: IPost): void {
    this.editPostDialogRef = this.dialogService.open(PostEditDialogComponent, {
      header: 'Редактирование поста',
      width: '50vw',
      modal: true,
      dismissableMask: true,
      closable: true,
      inputValues: {
        post: selectedPost,
      },
    });

    this.editPostDialogRef?.onClose?.pipe(
      switchMap((data: IPostUpdateRequest) => this.postService.updatePost(selectedPost.id, data)),
      tap(() => this.messageService.showSuccess('Пост изменен')),
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError(`Ошибка изменения поста: ${ error.message }`);
        return EMPTY;
      })
    ).subscribe();
  }

  createPost(): void {
    this.router.navigateByUrl(`/posts/create`);
    this.isLoading = true;
  }

  deletePost(selectedPost: IPost): void {
    this.isLoading = true;
    this.postService.deletePost(selectedPost).pipe(
      tap((post: IPost) => this.messageService.showSuccess(`Пост с id ${ post.id } удален`)),
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError(`Ошибка при удаления поста ${ selectedPost.id }: ${ error.message }`);
        return EMPTY;
      }),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

}
