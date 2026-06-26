import { Component, DestroyRef, inject } from '@angular/core';
import { TableModule, TablePageEvent } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { IPostListResponse } from '../../interfaces/IPostListResponse';
import { IPost } from '../../interfaces/IPost';
import { finalize, switchMap, tap } from 'rxjs';
import { Skeleton } from 'primeng/skeleton';
import { ContextMenu } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { PostUpdateRequest } from '../../interfaces/IPostRequestBody';
import { PostService } from '../../services/post.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post-list-page',
  imports: [TableModule, Tag, Button, Skeleton, ContextMenu, FormsModule],
  templateUrl: './post-list-page.component.html',
  styleUrl: './post-list-page.component.scss',
  providers: [DialogService]
})
export class PostListPageComponent {

  router: Router = inject(Router);
  dialogService: DialogService = inject(DialogService);
  postService: PostService = inject(PostService);
  destroyRef: DestroyRef = inject(DestroyRef);

  offset: number = 0;
  limit: number = 10;
  totalCount: number = 0;
  isLoading: boolean = true;
  posts: IPost[] = Array.from({ length: this.limit }).map(() => ({} as IPost));
  editPostDialogRef: DynamicDialogRef | null = null;
  selectedPost: IPost | null = null;

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
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading = true;
    this.postService.getPosts(this.limit, this.offset)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((response: IPostListResponse) => {
            this.posts = response.posts;
            this.totalCount = response.total;
            this.isLoading = false;
          }
        ),
      ).subscribe();
  }

  pageChange(event: TablePageEvent): void {
    this.limit = event.rows;
    this.offset = event.first;
    this.isLoading = true;
    this.loadPosts();
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
      switchMap((data: PostUpdateRequest) => this.postService.updatePost(selectedPost.id, data))
    ).subscribe();
  }

  createPost(): void {
    this.router.navigateByUrl(`/posts/create`);
    this.isLoading = true;
  }

  deletePost(selectedPost: IPost): void {
    this.isLoading = true;
    this.postService.deletePost(selectedPost).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

}
