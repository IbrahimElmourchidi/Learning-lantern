import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const matchPassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('userPassword');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value)
    confirmPassword?.setErrors({ notMatch: true });
  return null;
};
