import { Component, inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { tap } from 'rxjs';
import { IPost } from '../../interfaces/IPost';

@Component({
  selector: 'app-post-details-page',
  imports: [],
  templateUrl: './post-details-page.component.html',
  styleUrl: './post-details-page.component.scss',
})
export class PostDetailsPageComponent {

  private route: ActivatedRoute = inject(ActivatedRoute);

  post!: IPost;

  constructor() {
    this.route.data.pipe(
      tap((data: Data) => this.post = data['post'] as IPost),
    ).subscribe();
  }

}
