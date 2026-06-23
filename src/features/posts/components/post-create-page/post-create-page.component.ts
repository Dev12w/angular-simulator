import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostApiService } from '../../services/post-api.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../../app/services/message.service';
import { PostCreateRequest } from '../../interfaces/IPostRequestBody';
import { catchError, EMPTY, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-create-page',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './post-create-page.component.html',
  styleUrl: './post-create-page.component.scss',
})
export class PostCreatePageComponent {

  private postApiService: PostApiService = inject(PostApiService);
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    tags: new FormArray([]),
    views: new FormControl(0, [Validators.required]),
    userId: new FormControl(0, [Validators.required]),
    reactions: new FormGroup({
      likes: new FormControl(0, [Validators.required]),
      dislikes: new FormControl(0, [Validators.required]),
    }),
  });

  get tags(): FormArray<FormControl<string>> {
    return this.form.get('tags') as FormArray<FormControl<string>>;
  }

  addTagControl(): void {
    this.tags.push(new FormControl());
  }

  removeTagControl(index: number): void {
    this.tags.removeAt(index);
  }

  handleSubmit(): void {
    if (this.form.invalid) {
      this.messageService.showError('Заполните все поля');
      return;
    }

    const body: PostCreateRequest = this.form.getRawValue();

    this.postApiService.createPost(body).pipe(
      tap(() => {
        this.messageService.showSuccess('Пост успешно создан');
        this.router.navigateByUrl('/posts');
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError(`Ошибка создания поста ${ error.message }`);
        return EMPTY;
      })
    ).subscribe();
  }

}
