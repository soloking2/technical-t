import { AbstractControl } from "@angular/forms";

export class CustomValidator {
  static validateDate(c: AbstractControl): {[key: string]: boolean} | null {
    let date = c.value;
    let currentDate = new Date();

    let expirateDate = new Date(date);

    if(currentDate.toDateString() == expirateDate.toDateString()) {
      return {'match': true}
    }

    return null;

  };

  static validateNumber(control: AbstractControl): {[key: string]: boolean} | null {
    const amount = control.value;

    if(isNaN(amount) || amount < 1) {
      return {'checked': true};
    }
    return null;
  }
}
