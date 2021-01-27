import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  url = 'http://localhost:3000/cards';

  constructor(private http: HttpClient) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.url)
    .pipe(
      tap(cards => console.log(cards)),
      catchError(this.handleError))
  }

  addCard(card: Card): Observable<Card> {
    return this.http.post<Card>('http://localhost:3000/cards/', card, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errMsg: string;
    if (errorResponse.error instanceof ErrorEvent) {
      errMsg = `${errorResponse.error}`;
      console.error('Error from client side', errMsg);
    } else {
      errMsg = `${errorResponse.error}`;
      console.error('Error from server side', errMsg);
    }
    return throwError(errMsg);

  }
}
