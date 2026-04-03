import { Component, inject } from '@angular/core';
import { UserService } from '../../app/services/user.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IUser } from '../../app/interfaces/IUser';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;

  constructor() {

    this.userService.loadUsers();

  }
}