export interface Stock {
  id: number;
  code: string;
  description: string;
  price: number;
}

export interface Stocks extends Array<Stock> {}

export interface StockAPI {
  payload: Stocks;
}
