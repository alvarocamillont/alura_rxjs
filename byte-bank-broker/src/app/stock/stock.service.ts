import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Stocks, Stock } from './model/stock';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private readonly stockUrl = `${environment.api}/stock`;
  constructor(private httpClient: HttpClient) {}

  getStocks(value?: string): Observable<Stocks> {
    const params = value ? new HttpParams().append('value', value) : undefined;
    return this.httpClient.get<Stocks>(this.stockUrl, { params });
  }

  getStock(id: string): Observable<Stock> {
    return this.httpClient.get<Stock>(`${this.stockUrl}/${id}`);
  }
}
