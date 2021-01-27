export interface Card {
  cardId: number;
  creditCardNumber: string;
  cardHolder: string;
  expirationDate: Date;
  securityCode?: string;
  amount: number;
}
