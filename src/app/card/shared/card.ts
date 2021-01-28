export interface Card {
  id: number;
  creditCardNumber: string;
  cardHolder: string;
  expirationDate: Date;
  securityCode?: string;
  amount: number;
}
