import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../core/services/auth/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = new FormGroup({
    identifier: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  private readonly destroy$$ = new Subject<void>();

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authenticationService.login(this.loginForm.getRawValue()).pipe(
      takeUntil(this.destroy$$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
