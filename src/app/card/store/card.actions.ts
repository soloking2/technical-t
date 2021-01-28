import { createAction, props } from '@ngrx/store';
import { Card } from '../shared/card';

export const loadCards = createAction(
  '[Card List Component] Load Cards'
);

export const loadCardsSuccess = createAction(
  '[Card Effect] Load Cards Success',
  props<{ payload: Card[] }>()
);

export const loadCardsFailure = createAction(
  '[Card Effect] Load Cards Failure',
  props<{ error: any }>()
);
export const addCard = createAction(
  '[Card Create Component] Initialize Card',
  props<{payload: Card}>()
);

export const addCardSuccess = createAction(
  '[Add Card Effect] Add Card Success',
  props<{ payload: Card }>()
);

export const addCardFailure = createAction(
  '[Add Card Effect] Load Cards Failure',
  props<{ error: any }>()
);
