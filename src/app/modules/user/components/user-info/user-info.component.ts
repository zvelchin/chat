import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../auth/models/login.model';
import { getCurrentUser } from '../../../auth/store/auth.selectors';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatButton],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    username: new FormControl({ value: null, disabled: true }),
    password: new FormControl({ value: null, disabled: true }),
  });

  constructor(
    private store: Store<{ auth: AuthState }>,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.store
      .select(getCurrentUser)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (val) => {
          this.formGroup.get('username')?.setValue(val?.username);
        },
      });
  }
}
