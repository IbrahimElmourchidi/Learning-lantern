import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateName(
  control: AbstractControl
): ValidationErrors | null {
  if (
    !control.value.match(
      /^((?![0-9!\"#$%&'()*+,-./\\:;<=>?@[\]^_`{|}~]).){2,30}$/g
    )
  ) {
    return { invalidName: true };
  }
  return null;
}
