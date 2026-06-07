import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { PostApiService } from '../../services/post-api.service';
import { IPostListResponse } from '../../interfaces/IPostListResponse'
import { IPost } from '../../interfaces/IPost'
import { tap } from 'rxjs';

@Component({
  selector: 'app-post-list-page',
  imports: [TableModule, Tag, Button],
  templateUrl: './post-list-page.component.html',
  styleUrl: './post-list-page.component.scss',
})
export class PostListPageComponent {

  postApiService: PostApiService = inject(PostApiService);

  posts: IPost[] = [];
  totalCount: number = 0;

  constructor() {
    this.postApiService.getList()
      .pipe(
        tap((res: IPostListResponse) => {
          this.posts = res.posts;
          this.totalCount = res.total;
        })
      ).subscribe();
  }
}
