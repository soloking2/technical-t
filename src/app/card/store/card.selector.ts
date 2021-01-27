import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CardState, cardStateFeatureKey } from ".";


export const productFeatureState = createFeatureSelector<CardState>(cardStateFeatureKey);


export const getAllCards = createSelector(
  productFeatureState,
  (state: CardState) => state.cards
);
