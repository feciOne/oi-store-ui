import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchFieldsValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      console.log('match field validator');

      if (matchingControl.errors && !matchingControl.errors['matchFields']) {
          return;
      }

      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ matchFields: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}

/* export function matchFieldsValidator(field: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.get(field)?.value;
    const rePassword= control.value;

    return password !== rePassword ? { matchFields: true } : null;
  };
} */
