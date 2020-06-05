interface PortFolio {
  portfolio_id: string;
  portfolio_description: string;
  user_id: number;
  items: Array<PortFolioItem>;
}

interface PortFolioItem {
  item_quantity: number;
  item_price: number;
  stock_id: number;
}
