import * as fromCard from './card.actions';

describe('loadCards', () => {
  it('should return an action', () => {
    expect(fromCard.loadCards().type).toBe('[Card] Load Cards');
  });
});