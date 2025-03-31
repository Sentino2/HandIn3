export const readablePrice = (priceInCents) => {
    return '$' + (priceInCents / 100).toFixed(2);
  }
  