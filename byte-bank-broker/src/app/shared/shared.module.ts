import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { MessagesModule } from '../messages/messages.module';
import { NoDataModule } from '../no-data/no-data.module';

@NgModule({
  imports: [CommonModule, PoModule, MessagesModule, NoDataModule],
  exports: [PoModule, MessagesModule, NoDataModule],
})
export class SharedModule {}
