import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from '../shared/card';
import { CardState, getCards } from '../store';
import { loadCards } from '../store/card.actions';

@Component({
  selector: 'tt-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {

   cards$: Observable<Card[]>;

  constructor(private store: Store<CardState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadCards());
    this.cards$ = this.store.pipe(select(getCards));

  }

  loadCards() {

  }

}
