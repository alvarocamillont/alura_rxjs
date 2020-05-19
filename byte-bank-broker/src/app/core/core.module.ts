import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthorizationModule } from '../authorization/authorization.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, AuthorizationModule],
  exports: [HttpClientModule, AuthorizationModule],
})
export class CoreModule {}
