import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Stocks, Stock, StockAPI } from './model/stock';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private readonly stockUrl = `${environment.api}/stock`;
  constructor(private httpClient: HttpClient) {}

  getStocks(value?: string): Observable<Stocks> {
    const params = value ? new HttpParams().append('value', value) : undefined;
    return this.httpClient
      .get<StockAPI>(this.stockUrl, { params })
      .pipe(
        map((res) => res.payload),
        map((stocks) =>
          stocks.sort((stockA, stockB) => this.sortByCode(stockB, stockA))
        )
      );
  }

  getStock(id: string): Observable<Stock> {
    return this.httpClient.get<Stock>(`${this.stockUrl}/${id}`);
  }

  private sortByCode(stockA: Stock, stockB: Stock): number {
    if (stockA.code < stockB.code) {
      return -1;
    }
    if (stockA.code > stockB.code) {
      return 1;
    }
    return 0;
  }
}
