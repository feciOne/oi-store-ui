import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _commonPath: string = 'auth/local/';

  constructor(private baseApiService: BaseApiService) { }

  register() {}

  login() {
    
  }
}
