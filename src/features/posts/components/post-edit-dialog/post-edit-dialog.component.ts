import { Component, inject, Input } from '@angular/core';
import { IPost } from '../../interfaces/IPost';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostUpdateBody } from '../../interfaces/IPostRequestBody';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent {

  dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  config: DynamicDialogConfig = inject(DynamicDialogConfig);

  post: IPost = this.config.data;

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    tags: new FormArray([]),
    views: new FormControl(0, [Validators.required]),
  });

  ngOnInit(): void {
    this.form.get('title')?.setValue(this.post.title);
    this.form.get('views')?.setValue(this.post.views);
    this.post.tags.forEach((tag: string) => this.tags.push(new FormControl(tag)));
  }

  get tags(): FormArray<FormControl<string | null>> {
    return this.form.get('tags') as FormArray<FormControl<string | null>>;
  }

  addTagControl(): void {
    this.tags.push(new FormControl());
  }

  removeTagControl(index: number): void {
    this.tags.removeAt(index);
  }

  handleSubmit(): void {
    const data: PostUpdateBody = this.form.getRawValue();
    this.dialogRef.close(data);
  }
}
