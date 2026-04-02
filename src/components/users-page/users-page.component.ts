import { Component, inject } from '@angular/core';
import { LoaderService } from '../../app/services/loader.service';
import { UserService } from '../../app/services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  loaderService: LoaderService = inject(LoaderService);
  userService = inject(UserService);
  users$ = this.userService.loadUsers();

}
