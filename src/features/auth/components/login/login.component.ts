import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { catchError, EMPTY, finalize, Observable, tap } from 'rxjs';
import { IAuthUser } from '../../interface/IAuthUser';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validate } from '@angular/forms/signals';
import { MessageService } from '../../../../app/services/message.service';
import { IAuthResponse } from '../../interface/IAuthResponse';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private authService: AuthService = inject(AuthService);
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private router: Router = inject(Router);
  private messageService: MessageService = inject(MessageService);

  isLoading: boolean = false;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.getRawValue();
    this.isLoading = true;

    this.authService.login(username, password)
      .pipe(
        tap(() => {
          this.messageService.showSuccess('Регистрация прошла успешно');
          this.router.navigate(['/']);
        }),
        catchError(() => {
          this.messageService.showError('Неверный логин или пароль');
          return EMPTY;
        }),
        finalize(() => this.isLoading = false)
      ).subscribe();
  }
}
