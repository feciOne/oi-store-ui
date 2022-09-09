import { Component } from '@angular/core';
import { AuthenticationService } from './modules/core/services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OI Store';

  constructor(private readonly authenticationService: AuthenticationService) {
    this.authenticationService.canLoadAuthInfoFromLocalStorage();
  }
}
