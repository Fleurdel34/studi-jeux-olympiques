import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";
import {formatDate} from "@angular/common";


/**
 * Check if control value is superior to date today
 * @export
 */

export function minDateValidator(): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {

    let date = Date.now()
    let formater = formatDate(date, "MM-yyyy", "fr")

    if (ctrl.value > formater ) {
      return null;
    } else {
      return {
        minDateValidator: ctrl.value
      };
    }
  };
}
