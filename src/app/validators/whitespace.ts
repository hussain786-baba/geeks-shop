import { FormControl } from "@angular/forms";
import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { EMAIL_REGEX } from "../components/dialog/signin-signup-dialog/signup/signup.component";


export function noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? {'whitespace': true} : null;
    
}

export const ValidateEmail: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  let regularExp = EMAIL_REGEX;
  let cValue = control.value;
  cValue = (cValue || '').toString().trim();
  if (!cValue)
      return {
          required: true
      };
  return regularExp.test(cValue) ? null : {
    invalidEmail: true 
  };
    

};