import {
  Action,
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
import * as fromActions from './card.actions';

export const cardStateFeatureKey = 'cardState';

export interface CardState {
  cards: Card[];
  error: any;
  wasAdded: boolean;

}

export const initialState: CardState = {
  cards: undefined,
  error: undefined,
  wasAdded: false

}

const cardReducer = createReducer(
  initialState,
  on(fromActions.loadCardsSuccess, (state, action) => {
    return {
      cards: [...action.payload]
    }
  }),
  on(fromActions.loadCardsFailure, (state, action) => {
    return {
      cards: state.cards,
      error: action.error,
      wasAdded: false
    }
  }),
  on(fromActions.addCardSuccess, (state, action) => {
    return {
      ...state,
      wasAdded: true,
      cards: [...state.cards, action.payload]
    }
  }),
  on(fromActions.addCardFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    }
  })

)

export function reducers(state: CardState, action: Action) {
  return cardReducer(state, action);
}


export const selectCardState = createFeatureSelector<CardState>(cardStateFeatureKey);

export const getCards = createSelector(
  selectCardState,
  (state: CardState) => state.cards
);

export const getErrors = createSelector(
  selectCardState,
  (state: CardState) => state.error
)

export const getAddedStatus = createSelector(
  selectCardState,
  (state: CardState) => state.wasAdded
)


export const metaReducers: MetaReducer<CardState>[] = !environment.production ? [] : [];
