import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse, RegisterRequest, User } from '../../models/auth.model';
import { AUTH_TOKEN, USER_INFO } from '../../models/constants';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _commonPath: string = 'auth/local';
  private _token = '';

  public token$!: Observable<string>;
  public userInfo$!: Observable<User>;

  private token$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private userInfo$$ = new BehaviorSubject<User>({} as User);

  get token() {
    return this._token;
  }

  constructor(private baseApiService: BaseApiService, private router: Router) {
    this.token$ = this.token$$.asObservable();
    this.userInfo$ = this.userInfo$$.asObservable();
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.baseApiService.save<AuthResponse>(`${this._commonPath}/register`, data).pipe(
      tap(res => this.doAuthOperations(res))
    );
  }

  login(data: AuthRequest): Observable<AuthResponse> {
    return this.baseApiService.save<AuthResponse>(this._commonPath, data).pipe(
      tap(res => this.doAuthOperations(res))
    );
  }

  logout(): void {
    this._token = '';
    localStorage.clear();
    this.navigateToHome();
  }

  private doAuthOperations(data: AuthResponse): void {
    this._token = data.jwt;

    localStorage.setItem(AUTH_TOKEN, data.jwt);
    localStorage.setItem(USER_INFO, JSON.stringify(data.user));

    this.token$$.next(data.jwt);
    this.userInfo$$.next(data.user);

    if (location.href.includes('/auth')) {
      this.navigateToHome();
    }
  }

  isAuthenticated(): boolean {
    return this._token.length > 0 ? true : false;
  }

  canLoadAuthInfoFromLocalStorage() {
    let authData!: AuthResponse;
    const jwt = localStorage.getItem(AUTH_TOKEN);
    const userInfo = localStorage.getItem(USER_INFO);

    if (jwt && userInfo) {
      authData = { jwt, user: JSON.parse(userInfo) };

      this.doAuthOperations(authData);
    }
  }

  private navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
