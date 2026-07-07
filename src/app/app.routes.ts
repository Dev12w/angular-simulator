import { Routes } from '@angular/router';
import { postResolver } from '../features/posts/resolvers/post.resolver';
import { authGuard } from '../features/auth/guard/auth.guard';
import { adminGuard } from '../features/auth/guard/admin.guard';

export const routes: Routes = [

  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../components/home-page/home-page.component')
        .then((m) => m.HomePageComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../features/auth/components/login/login.component')
        .then((m) => m.LoginComponent),
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../components/users-page/users-page.component')
        .then((m) => m.UsersPageComponent),
  },
  {
    path: 'posts',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../features/posts/components/post-list-page/post-list-page.component')
        .then((m) => m.PostListPageComponent),
  },
  {
    path: 'posts/create',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('../features/posts/components/post-create-page/post-create-page.component')
        .then((m) => m.PostCreatePageComponent),
  },
  {
    path: 'posts/:id',
    canActivate: [authGuard],
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
