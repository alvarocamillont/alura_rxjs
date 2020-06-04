import { Component, OnInit } from '@angular/core';
import { PoPageDynamicTableActions } from '@po-ui/ng-templates';
import { PoBreadcrumb } from '@po-ui/ng-components';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent {
  public readonly serviceApi = 'http://localhost:3000/portfolios';

  public readonly actions: PoPageDynamicTableActions = {
    new: '/portfolio/new',
    detail: '/portfolio/detail/:id',
    remove: true,
  };

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: 'Portfolio' }],
  };

  public readonly fields: Array<any> = [
    { property: 'portfolio_id', key: true },
    {
      property: 'portfolio_description',
      label: 'Descrição',
      filter: true,
      gridColumns: 6,
    },
  ];
}
