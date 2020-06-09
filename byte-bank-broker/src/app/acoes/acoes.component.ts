import { Component } from '@angular/core';
import { of, merge, iif } from 'rxjs';
import { Acao } from './model/acoes';
import { AcoesService } from './acoes.service';
import { FormControl } from '@angular/forms';
import {
  filter,
  distinctUntilChanged,
  debounceTime,
  switchMap,
  mergeMap,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes();
  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    filter((valor) => valor.length > 2),
    distinctUntilChanged(),
    debounceTime(333),
    switchMap((valor) => this.acoesService.getAcoes(valor))
  );
  acoes$ = merge(of(''), this.acoesInput.valueChanges).pipe(
    tap((valor) => console.log(valor)),
    mergeMap((valorInput) =>
      iif(() => valorInput.length, this.filtroPeloInput$, this.todasAcoes$)
    )
  );

  constructor(private acoesService: AcoesService) {}

}
