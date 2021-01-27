import { AbstractControl } from "@angular/forms";

export class CustomValidator {
  static validateDate(c: AbstractControl): {[key: string]: boolean} | null {
    let currentDate = new Date();
    currentDate.setHours(0,0,0,0);

    let expirateDate = new Date(c.value);
    expirateDate.setHours(0,0,0,0);

    if(currentDate < expirateDate) {
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
