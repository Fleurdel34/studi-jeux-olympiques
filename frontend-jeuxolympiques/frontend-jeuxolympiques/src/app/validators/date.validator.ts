import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

/**
 * Check if control value is inferior to date in parameter
 * @export
 */
export function minDateValidator(minDate: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const date = new Date(control.value);

    if (minDate.getTime() < date.getTime()) {
      return null;
    } else {
      return { 'min': { value: control.value, expected: minDate } };
    }
  };
}
