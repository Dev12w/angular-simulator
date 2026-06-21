import { Component, inject } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { map, tap } from 'rxjs';
import { IPost } from '../../interfaces/IPost';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-details-page',
  imports: [
    AsyncPipe
  ],
  templateUrl: './post-details-page.component.html',
  styleUrl: './post-details-page.component.scss',
})
export class PostDetailsPageComponent {
  private route = inject(ActivatedRoute);

  post$ = this.route.data.pipe(
    map(data => data['post'] as IPost)
  );
}
