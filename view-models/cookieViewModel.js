export const formatCookieForView = (cookie) => {
  return {
    id: cookie._id,
    name: cookie.name,
    slug: cookie.slug,
    price: formatPrice(cookie.priceInCents),
    isInStock: cookie.isInStock,
    ingredients: cookie.ingredients || []
  };
};

export const formatPrice = (priceInCents) => {
  return `$${(priceInCents / 100).toFixed(2)}`;
}; 