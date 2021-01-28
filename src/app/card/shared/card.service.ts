import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  url = 'http://localhost:3000/cards/';

  constructor(private http: HttpClient) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.url);
  }

  addCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.url, card);
  }
}
