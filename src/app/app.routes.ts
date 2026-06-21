import { Routes } from '@angular/router';

import { postResolver } from '../features/posts/resolvers/post.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../components/home-page/home-page.component')
        .then((m) => m.HomePageComponent),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('../components/users-page/users-page.component')
        .then((m) => m.UsersPageComponent),
  },

  {
    path: 'posts',
    loadComponent: () =>
      import('../features/posts/components/post-list-page/post-list-page.component')
        .then((m) => m.PostListPageComponent),
  },

  {
    path: 'posts/create',
    loadComponent: () =>
      import('../features/posts/components/post-create-page/post-create-page.component')
        .then((m) => m.PostCreatePageComponent),
  },

  {
    path: 'posts/:id',
    loadComponent: () =>
      import('../features/posts/components/post-details-page/post-details-page.component')
        .then((m) => m.PostDetailsPageComponent),
    resolve: {
      post: postResolver,
    }
  },

  {
    path: '**',
    loadComponent: () =>
      import('../components/not-found-page/not-found-page.component')
        .then((m) => m.NotFoundPageComponent),
  },

];
