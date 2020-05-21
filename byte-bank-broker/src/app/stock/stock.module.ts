import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { SharedModule } from '../shared/shared.module';
import { StockCardComponent } from './stock-card/stock-card.component';


@NgModule({
  declarations: [StockComponent, StockCardComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule
  ]
})
export class StockModule { }
