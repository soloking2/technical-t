import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Card } from '../shared/card';
import { loadCardsFailure, loadCardsSuccess } from './card.actions';

export const cardStateFeatureKey = 'cardState';

export interface CardState {
  cards: Card[],
  error: any

}

export const initialState: CardState = {
  cards: [],
  error: ''
}

export const reducers = createReducer(
  initialState,
  on(loadCardsSuccess, (state, action) => {
    return {
      ...state,
      cards: action.cards
    }
  }),
  on(loadCardsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  })
)

export const metaReducers: MetaReducer<CardState>[] = !environment.production ? [] : [];
