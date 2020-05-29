import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { MessagesModule } from '../messages/messages.module';
import { NoDataModule } from '../no-data/no-data.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PoModule,
    MessagesModule,
    NoDataModule,
    ReactiveFormsModule,
  ],
  exports: [PoModule, MessagesModule, NoDataModule, ReactiveFormsModule],
})
export class SharedModule {}
