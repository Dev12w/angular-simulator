import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule, TablePageEvent } from 'primeng/table';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Skeleton } from 'primeng/skeleton';
import { ContextMenu } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { switchMap, tap } from 'rxjs';
import { PostService } from '../../services/post.service';
import { IPost } from '../../interfaces/IPost';
import { PostUpdateBody } from '../../interfaces/IPostRequestBody';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';

@Component({
  selector: 'app-post-list-page',
  imports: [TableModule, Tag, Button, Skeleton, ContextMenu, FormsModule],
  templateUrl: './post-list-page.component.html',
  styleUrl: './post-list-page.component.scss',
  providers: [DialogService]
})
export class PostListPageComponent implements OnInit {

  private postService: PostService = inject(PostService);
  private router: Router = inject(Router);
  private dialogService: DialogService = inject(DialogService);

  totalCount: number = 0;
  offset: number = 0;
  limit: number = 10;
  isLoading: boolean = true;
  posts: IPost[] = Array.from({ length: this.limit }).map(() => ({} as IPost));
  selectedPost: IPost | null = null;
  editPostDialogRef: DynamicDialogRef | null = null;

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
    this.postService.posts$.pipe(
      tap((posts: IPost[]) => this.posts = posts)
    ).subscribe();
    this.postService.totalCount$.pipe(
      tap((total: number) => this.totalCount = total)
    ).subscribe();
    this.postService.loading$.pipe(
      tap((isLoading: boolean) => this.isLoading = isLoading)
    ).subscribe();

    this.postService.loadPosts();
  }

  refreshData(): void {
    this.postService.refresh();
  }

  pageChange(event: TablePageEvent): void {
    this.postService.loadPosts(event.rows, event.first);
  }

  toPostDetailPage(post: IPost): void {
    this.router.navigateByUrl(`/posts/${ post.id }`);
  }

  createPost(): void {
    this.router.navigateByUrl('/posts/create');
  }

  editPost(post: IPost): void {
    this.editPostDialogRef = this.dialogService.open(
      PostEditDialogComponent,
      {
        header: 'Редактирование поста',
        width: '50vw',
        modal: true,
        dismissableMask: true,
        closable: true,
        inputValues: {
          post
        }
      }
    );

    this.editPostDialogRef?.onClose?.pipe(
      switchMap((body: PostUpdateBody) =>
        this.postService.updatePost(post.id, body)
      )
    ).subscribe();
  }

  deletePost(post: IPost): void {
    this.postService.deletePost(post).subscribe();
  }

}
