import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { MessagesModule } from '../messages/messages.module';

@NgModule({
  imports: [CommonModule, PoModule, MessagesModule],
  exports: [PoModule, MessagesModule],
})
export class SharedModule {}
