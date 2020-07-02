import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AcoesAPI } from './modelo/acoes';

@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(private httpClient: HttpClient) {}

  getAcoes() {
    return this.httpClient.get<AcoesAPI>('http://localhost:3000/acoes');
  }
}
