import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';



@Injectable()
export class CardEffects {
   loadProductEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadProduct),
      mergeMap(action => this.productService.getProduct(action.id).pipe(
        map(product => fromActions.loadProductSuccess({selectedProduct: product})),
        catchError(error => of(fromActions.loadProductFailure(error)))
      ))
    )
  );



  constructor(private actions$: Actions) {}

}
