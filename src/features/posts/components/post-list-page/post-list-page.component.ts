import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-post-list-page',
  imports: [
    TableModule
  ],
  templateUrl: './post-list-page.component.html',
  styleUrl: './post-list-page.component.scss',
})
export class PostListPageComponent {
  products = [
    {
      code: '1233',
      name: '3333',
      category: 'yyyyy',
      quantity: '666666'
    }
  ]
}
