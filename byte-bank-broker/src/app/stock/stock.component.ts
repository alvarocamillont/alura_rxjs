import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Stocks, Stock } from './model/stock';
import { StockService } from './stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  stocks$: Observable<Stocks>;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.stocks$ = this.stockService.getStocks();
  }

  select(stock: Stock) {
    console.log(stock);
  }
}
