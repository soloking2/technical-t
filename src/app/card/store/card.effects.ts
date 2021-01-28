import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import * as fromActions from './card.actions';
import {ofType} from '@ngrx/effects';
import { mergeMap, map, catchError, tap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CardService } from '../shared/card.service';
import { Card } from '../shared/card';



@Injectable()
export class CardEffects {
  loadCardEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadCards),
      mergeMap(() => this.cardService.getCards().pipe(
        map((cards: Card[]) => fromActions.loadCardsSuccess({payload: cards})),
        catchError(error => of(fromActions.loadCardsFailure(error)))
      ))
    )
  );
  addCardEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addCard),
      mergeMap((action) => this.cardService.addCard(action.payload).pipe(
        map((card: Card) =>
          fromActions.addCardSuccess({payload: card})
      ),
      catchError(error => of(fromActions.addCardFailure(error)))
      )),
      tap(() => (
        setTimeout(() => this.router.navigate(['/card']), 3000)
        ))
      )
  );





  constructor(private actions$: Actions,
              private cardService: CardService,
              private router: Router) {}

}
