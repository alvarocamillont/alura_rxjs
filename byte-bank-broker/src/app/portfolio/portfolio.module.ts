import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PortfolioListComponent } from './portfolio-list/portfolio-list.component';

@NgModule({
  declarations: [PortfolioListComponent],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    SharedModule,
    PoTemplatesModule,
  ],
})
export class PortfolioModule {}
