import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  public login(credentials: { username: string; password: string }): void {
    const url = '/api/v2/auth/login';
    const body = new FormData();
    body.append('username', credentials.username);
    body.append('password', credentials.password);

    this.http.post(url, body).subscribe();
  }

  public isAuthenticated(): Observable<boolean> {
    return this.http
      .get('/api/v2/app/version', {
        withCredentials: true,
        responseType: 'text',
      })
      .pipe(
        map(() => true),
        catchError((error) => {
          if (
            error instanceof HttpErrorResponse &&
            (error.status === HttpStatusCode.Unauthorized ||
              error.status === HttpStatusCode.Forbidden)
          ) {
            return [false];
          }

          throw error;
        }),
      );
  }
}

export function protectedRouteGuard(): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    return auth.isAuthenticated().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) return true;

        return router.createUrlTree(['/login']);
      }),
    );
  };
}
