import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationGuard } from './authorization.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInteceptor } from './authorization.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    AuthorizationService,
    AuthorizationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInteceptor,
      multi: true,
    },
  ],
})
export class AuthorizationModule {}
