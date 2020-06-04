import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioComponent } from './portfolio.component';
import { SharedModule } from '../shared/shared.module';
import { PoTemplatesModule } from '@po-ui/ng-templates';

@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    SharedModule,
    PoTemplatesModule,
  ],
})
export class PortfolioModule {}
