import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CreateCardComponent } from './create-card/create-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCardState from './store';
import { CardEffects } from './store/card.effects';


@NgModule({
  declarations: [CreateCardComponent],
  imports: [
    CommonModule,
    CardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature(fromCardState.cardStateFeatureKey, fromCardState.reducers, { metaReducers: fromCardState.metaReducers }),
    EffectsModule.forFeature([CardEffects]),
  ]
})
export class CardModule { }
