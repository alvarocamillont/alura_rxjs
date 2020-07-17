import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Acao, AcoesAPI, Acoes } from './modelo/acoes';
import { map, tap, pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(private httpClient: HttpClient) {}

  getAcoes(valor?: string): Observable<Acoes> {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.httpClient
      .get<AcoesAPI>('http://localhost:3000/acoes', { params })
      .pipe(
        tap((valor) => console.log(valor)),
        pluck('payload'),
        map((acoes) =>
          acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoB, acaoA))
        )
      );
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao): number {
    if (acaoA.codigo < acaoB.codigo) {
      return 1;
    }
    if (acaoA.codigo > acaoB.codigo) {
      return -1;
    }
    return 0;
  }
}
