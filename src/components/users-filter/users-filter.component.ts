import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  @Input() debounceMs: number = 300;
  @Output() filter: EventEmitter<string> = new EventEmitter<string>();

  filterText: FormControl<string | null> = new FormControl<string>('');
  private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.filterText.valueChanges.pipe(
      debounceTime(this.debounceMs),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe((value: string | null) => {
      this.filter.emit(value ?? '');
    })
  }

}
