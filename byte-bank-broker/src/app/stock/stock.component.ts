import { Component } from '@angular/core';
import { Observable, of, merge, iif } from 'rxjs';
import { Stocks, Stock } from './model/stock';
import { StockService } from './stock.service';
import { FormControl } from '@angular/forms';
import {
  filter,
  distinctUntilChanged,
  debounceTime,
  switchMap,
  mergeMap,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent {
  stockInput = new FormControl();
  allstocks$ = this.stockService.getStocks();
  filterByInput$ = this.stockInput.valueChanges.pipe(
    filter((query) => query.length > 2),
    distinctUntilChanged(),
    debounceTime(333),
    switchMap((query) => this.stockService.getStocks(query))
  );
  stocks$ = merge(of(''), this.stockInput.valueChanges).pipe(
    tap((value) => console.log(value)),
    mergeMap((inputValue) =>
      iif(() => inputValue.length, this.filterByInput$, this.allstocks$)
    )
  );

  constructor(private stockService: StockService) {}

  select(stock: Stock) {
    console.log(stock);
  }
}
