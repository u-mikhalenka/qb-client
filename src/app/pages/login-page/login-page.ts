import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { TuiButton, TuiInput, TuiLabel, TuiTextfield } from '@taiga-ui/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'qb-login-page',
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [TuiButton, TuiTextfield, TuiInput, TuiLabel, FormField, FormRoot],
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
