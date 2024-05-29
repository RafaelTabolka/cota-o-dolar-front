import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ICotacaoResponse } from '../interface/ICotacaoResponse';

@Injectable({
  providedIn: 'root'
})
export class CotacaoDolarService {
  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getCotacaoAtual(): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/moeda/atual`);
  }

  public getCotacaoPorPeriodoFront(
    dataInicial: string,
    dataFinal: string
  ): Observable<ICotacaoResponse[]> {
    return this.http.get<ICotacaoResponse[]>(`${this.apiServerUrl}/moeda/${dataInicial}&${dataFinal}`);
  }

  public getCotacaoMenorAtual(dataInicial: string, dataFinal: string): Observable<ICotacaoResponse[]> {
    return this.http.get<ICotacaoResponse[]>(`${this.apiServerUrl}/moeda/menorAtual/${dataInicial}&${dataFinal}`)
  }

}
