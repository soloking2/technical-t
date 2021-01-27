import { createAction, props } from '@ngrx/store';
import { Card } from '../shared/card';

export const loadCards = createAction(
  '[Home Component] Load Cards'
);

export const loadCardsSuccess = createAction(
  '[Card] Load Cards Success',
  props<{ cards: Card[] }>()
);

export const loadCardsFailure = createAction(
  '[Card] Load Cards Failure',
  props<{ error: any }>()
);
export const addCard = createAction(
  '[Card] Add Card',
  props<{ card: Card }>()
);

export const addCardSuccess = createAction(
  '[Card] Load Cards Failure',
  props<{ card: Card }>()
);
export const addCardFailure = createAction(
  '[Card] Load Cards Failure',
  props<{ error: any }>()
);
