import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Card } from '../card/shared/card';
import { CardState } from '../card/store';



@Component({
  selector: 'tt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cards$: Observable<Card[]>;
  cards;

  constructor(private store: Store<CardState>) { }

  ngOnInit(): void {
    // this.store.dispatch(fromActions.loadCards());
    // this.loadCards();

  }


  // loadCards() {
  //   this.cards$ = this.store.pipe(select(getCards))
  // }

}
