import { Component, OnInit } from '@angular/core';
import { Observable, of, merge } from 'rxjs';
import { Stocks, Stock } from './model/stock';
import { StockService } from './stock.service';
import { FormControl } from '@angular/forms';
import { filter, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent {
  stockInput = new FormControl();
  stocks$: Observable<Stocks> = merge(
    of([]),
    this.stockInput.valueChanges
  ).pipe(
    filter((query) => query.length > 3),
    distinctUntilChanged(),
    debounceTime(333),
    switchMap((query) => this.stockService.getStocks(query))
  );

  constructor(private stockService: StockService) {}


  select(stock: Stock) {
    console.log(stock);
  }
}
