import {
  Component,
  inject,
  signal,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthService } from '../../core/auth.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'qb-login-page',
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormField, FormRoot, MatFormField, MatInput, MatLabel, MatButton],
})
export class LoginPage {
  private readonly auth = inject(AuthService);

  protected readonly form = form(
    signal({
      username: '',
      password: '',
    }),
    {
      submission: {
        action: async () => {
          this.auth.login(this.form().value());
        },
      },
    },
  );
}
