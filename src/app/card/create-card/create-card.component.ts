import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from '../shared/card';
import { CardService } from '../shared/card.service';
import { CustomValidator } from '../shared/custom-validator';
import { CardState } from '../store';
import * as fromAction from '../store/card.actions';


@Component({
  selector: 'tt-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {
  errorMessage$: Observable<any>;
  cardPaymentForm: FormGroup;
  validationMessages = {
    creditCardNumber: {
      required: 'The credit card number is required'
    },
    cardHolder: {
      required: 'Card Holder Name is required'
    },
    expirationDate: {
      required: 'Expiration Date is required',
      match: 'The date must be higher than today'
    },
    securityCode: {
      maxLength: 'Security code should be more than 3 characters'
    },
    amount: {
      required: 'Amount is required',
      checked: 'Amount should be greated than 0'
    }
  };

  formErrors = {
    creditCardNumber: '',
    cardHolder: '',
    expirationDate: '',
    securityCode: '',
    amount: ''
  };
  constructor(private fb: FormBuilder,
    private store: Store<CardState>,
    private cardService: CardService,
    private router: Router) { }

  ngOnInit(): void {
    this.cardPaymentForm = this.fb.group({
      creditCardNumber: ['', Validators.required],
      cardHolder: ['', Validators.required],
      expirationDate: ['', Validators.required],
      securityCode: ['', Validators.minLength(3)],
      amount: ['', [Validators.required, CustomValidator.validateNumber]]
    })
  }

  setMessage(group: FormGroup = this.cardPaymentForm): void {
    Object.keys(group.controls).forEach((key: any) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
          const message = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += message[errorKey] + ' ';
            }
          }
        }
      if (abstractControl instanceof FormGroup) {
        this.setMessage(abstractControl);
      }

    });
  }


  submit() {

    if (!this.cardPaymentForm.value) { return; }
      this.store.dispatch(fromAction.addCardSuccess({card: this.cardPaymentForm.value}))


  }

}
