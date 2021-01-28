var faker = require("faker");

var database = { cards: [] };

for (var i = 1; i <= 10; i++) {
  database.cards.push({
    id: i,
    creditCardNumber: faker.finance.creditCardNumber(),
    cardHolder: faker.name.firstName(),
    expirationDate: faker.date.future(),
    securityCode: faker.finance.creditCardCVV(),
    amount: faker.finance.amount()
  });
}

console.log(JSON.stringify(database));
