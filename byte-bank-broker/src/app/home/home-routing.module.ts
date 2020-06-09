import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'acoes',
        loadChildren: () =>
          import('../acoes/acoes.module').then((m) => m.AcoesModule),
      },
      {
        path: 'portfolio',
        loadChildren: () =>
          import('../portfolio/portfolio.module').then(
            (m) => m.PortfolioModule
          ),
      },
      {
        path: '',
        redirectTo: 'acoes',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'acoes',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
