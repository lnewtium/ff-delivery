export const getUsd = (price: number) => {
  return "$" + Math.floor(price / 100) + "." + price % 100;
}