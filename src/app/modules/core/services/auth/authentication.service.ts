import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse, RegisterRequest } from '../../models/auth.model';
import { AUTH_TOKEN, USER_INFO } from '../../models/constants';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _commonPath: string = 'auth/local';

  constructor(private baseApiService: BaseApiService) { }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.baseApiService.save<AuthResponse>(`${this._commonPath}/register`, data).pipe(
      tap(this.doAuthOperations)
    );
  }

  login(data: AuthRequest): Observable<AuthResponse> {
    return this.baseApiService.save<AuthResponse>(this._commonPath, data).pipe(
      tap(res => this.doAuthOperations(res))
    );
  }

  logout(): void {
    localStorage.clear();
  }

  private doAuthOperations(data: AuthResponse): void {
    localStorage.setItem(AUTH_TOKEN, data.jwt);
    localStorage.setItem(USER_INFO, JSON.stringify(data.user));
  }
}
