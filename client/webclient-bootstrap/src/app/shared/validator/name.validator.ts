import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateName(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value as string;
  value.trim();
  if (
    value.match(/[-!$%^&*@#()_+|~=`{}\[\]:";'<>?,.\/]/g) ||
    value.length < 3
  ) {
    return { invalidName: true };
  }

  return null;
}
