import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AcoesService } from './acoes.service';
import { Acoes } from './modelo/acoes';
import { Subscription, merge } from 'rxjs';
import {
  tap,
  switchMap,
  filter,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

const ESPERA_DIGITACAO = 300;

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();

  todasAcoes$ = this.acoesService
    .getAcoes()
    .pipe(tap(() => console.log('Fluxo inicial')));

  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),
    tap(console.log),
    filter((valor) => valor.length >= 3 || !valor.length),
    tap(console.log),
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado)),
    tap(console.log)
  );

  acoes$ = merge(this.todasAcoes$, this.filtroPeloInput$);

  constructor(private acoesService: AcoesService) {}
}
