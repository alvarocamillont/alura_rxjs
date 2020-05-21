import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthorizationModule } from '../authorization/authorization.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthorizationModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [
    HttpClientModule,
    AuthorizationModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
})
export class CoreModule {}
