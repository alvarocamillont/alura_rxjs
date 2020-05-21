import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { Stock } from '../model/stock';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StockCardComponent implements OnInit {
  @Input() stock: Stock;
  @Output() selectAction: EventEmitter<Stock> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  selectStock(): void {
    this.selectAction.emit(this.stock);
  }
}
