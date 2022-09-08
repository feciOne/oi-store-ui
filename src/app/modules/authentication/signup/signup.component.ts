import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from '../../core/models/auth.model';
import { AuthenticationService } from '../../core/services/auth/authentication.service';
import { matchFieldsValidator } from '../../core/validators/match-fields.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;

  get username() {
    return this.registerForm.get('username');
  }
  get usernameError() {
    return this.registerForm.get('username');
  }

  constructor(private authenticationService: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setForm();
  }

  onSubmit(): void {
    /* this.registerForm.get('password')?.updateValueAndValidity();
    this.registerForm.get('confirmPassword')?.updateValueAndValidity(); */

    if (!this.registerForm.valid) return;

    console.log(this.registerForm.getRawValue());
    const data = this.registerForm.getRawValue() as RegisterRequest;

    this.authenticationService.register({ username: data.username, email: data.email, password: data.password }).subscribe();
  }

  private setForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, ]] // matchFieldsValidator('password')
    }, {
      validator: matchFieldsValidator('password', 'confirmPassword')
    });
  }

  /* private checkValidity(field: string): boolean {
    const formCtrl = this.registerForm.get(field);

    return formCtrl?.touched && formCtrl.
  } */
}
