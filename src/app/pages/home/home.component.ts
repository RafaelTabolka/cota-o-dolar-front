import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICotacaoResponse } from 'src/app/interface/ICotacaoResponse';

import { CotacaoDolarService } from 'src/app/service/cotacao-dolar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cotacaoAtual = 0;
  cotacaoPorPeriodoLista: ICotacaoResponse[] = [];
  dataAtualInput: string = '';
  dataInicialInput: string = '';
  mostraErro: boolean = false;
  escondeSpinnerPesquisa: boolean = true;
  escondeSpinnerCotaco: boolean = true;

  constructor(
    private cotacaoDolarService: CotacaoDolarService,
    private dateFormat: DatePipe
  ) { }

  ngOnInit() {
    this.escondeSpinnerCotaco = false;
    this.cotacaoDolarService.getCotacaoAtual().subscribe(cotacao => {
      this.cotacaoAtual = cotacao;
      this.escondeSpinnerCotaco = !this.escondeSpinnerCotaco;
    })

    const dataAtual = new Date()
    // Formato no qual o campo input aceita
    this.dataAtualInput = this.dateFormat.transform(dataAtual, 'yyyy-MM-dd') || ''
    dataAtual.setDate(1)
    this.dataInicialInput = this.dateFormat.transform(dataAtual, 'yyyy-MM-dd') || ''
  }

  public getCotacaoPorPeriodo(dataInicialString: string, dataFinalString: string) {
    const dataInicial = this.dateFormat.transform(dataInicialString, "MM-dd-yyyy") || '';
    const dataFinal = this.dateFormat.transform(dataFinalString, "MM-dd-yyyy") || '';

    if (this.verificaData(dataInicialString, dataInicial, dataFinalString, dataFinal)) {
      this.cotacaoDolarService.getCotacaoPorPeriodoFront(dataInicial, dataFinal).subscribe(cotacoes => {
        this.cotacaoPorPeriodoLista = cotacoes;
        this.escondeSpinnerPesquisa = true;
        this.mostraErro = false;
      })
    }
  }

  public getCotacaoMenorAtual(dataInicialString: string, dataFinalString: string) {
    const dataInicial = this.dateFormat.transform(dataInicialString, 'MM-dd-yyyy') || '';
    const dataFinal = this.dateFormat.transform(dataFinalString, 'MM-dd-yyyy') || '';

    if (this.verificaData(dataInicialString, dataInicial, dataFinalString, dataFinal)) {
      this.cotacaoDolarService.getCotacaoMenorAtual(dataInicial, dataFinal).subscribe((cotacaoMenorAtual) => {
        this.cotacaoPorPeriodoLista = cotacaoMenorAtual;
        this.escondeSpinnerPesquisa = true;
        this.mostraErro = false;
      })
    }
  }

  private verificaData(dataInicialString: string, dataInicial: string, dataFinalString: string, dataFinal: string): boolean {
    const dataAtualDate = new Date();
    const dataAtual = this.dateFormat.transform(dataAtualDate, "MM-dd-yyyy") || '';
    dataInicial = this.dateFormat.transform(dataInicialString, 'MM-dd-yyyy') || '';
    dataFinal = this.dateFormat.transform(dataFinalString, 'MM-dd-yyyy') || '';

    if (dataInicial && dataFinal &&
      dataInicial < dataFinal &&
      dataInicial <= dataAtual &&
      dataFinal <= dataAtual) {
      this.escondeSpinnerPesquisa = false;
      this.mostraErro = false;
      return true;

    } else {
      this.mostraErro = true;
      return false
    }
  }
}
