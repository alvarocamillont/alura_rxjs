import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Acoes, Acao, AcoesAPI } from './model/acoes';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  private readonly urlAcoes = `${environment.api}/acoes`;
  constructor(private httpClient: HttpClient) {}

  getAcoes(valor?: string): Observable<Acoes> {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.httpClient
      .get<AcoesAPI>(this.urlAcoes, { params })
      .pipe(
        map((res) => res.payload),
        map((acoes) =>
          acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoB, acaoA))
        )
      );
  }

  getAcao(id: string): Observable<Acao> {
    return this.httpClient.get<Acao>(`${this.urlAcoes}/${id}`);
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao): number {
    if (acaoA.codigo < acaoB.codigo) {
      return -1;
    }
    if (acaoA.codigo > acaoB.codigo) {
      return 1;
    }
    return 0;
  }
}
