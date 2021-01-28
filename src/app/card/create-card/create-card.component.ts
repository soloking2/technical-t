import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from '../shared/card';
import { CardService } from '../shared/card.service';
import { CustomValidator } from '../shared/custom-validator';
import { CardState, getAddedStatus, getCards, getErrors } from '../store';
import * as fromAction from '../store/card.actions';


@Component({
  selector: 'tt-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {
  card$: Observable<Card[]>;
  card;
  successMessage$: Observable<any>;
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
      minlength: 'Security code should be more than 3 characters'
    },
    amount: {
      required: 'Amount is required!',
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
    this.errorMessage$ = this.store.pipe(select(getErrors));
    this.successMessage$ = this.store.pipe(
      select(getAddedStatus));

    this.card$ = this.store.pipe(select(getCards));
    this.card$.subscribe((card) => {
      this.card = card.length;
    })
    this.cardPaymentForm = this.fb.group({
      creditCardNumber: ['', Validators.required],
      cardHolder: ['', Validators.required],
      expirationDate: ['', [Validators.required, CustomValidator.validateDate]],
      securityCode: ['', [Validators.minLength(3)]],
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
              this.formErrors[key] += message[errorKey] + ' \n ';
            }
          }
        }
      if (abstractControl instanceof FormGroup) {
        this.setMessage(abstractControl);
      }

    });
  }


  submit() {
    const card: Card = {
      id: this.card + 1,
      creditCardNumber: this.cardPaymentForm.value.creditCardNumber,
      cardHolder: this.cardPaymentForm.value.cardHolder,
      expirationDate: this.cardPaymentForm.value.expirationDate,
      securityCode: this.cardPaymentForm.value.securityCode,
      amount: this.cardPaymentForm.value.amount
    }
    if (!this.cardPaymentForm.value) { return; }
      this.store.dispatch(fromAction.addCard({payload: card}))


  }

}
