import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from '../compartilhados/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase

  public progresso: number = 0

  public tentativas: number = 3

  @Output() public encerrarJogo = new EventEmitter()

  constructor() {

    this.rodadaFrase = this.frases[this.rodada]
    this.atualizaRodada()
  }
  
  ngOnInit() {
  }

  ngOnDestroy() {

  }

  atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  verificarResposta(): void {

    if (this.rodadaFrase.frasePtBr == this.resposta) {

      this.rodada++

      this.progresso = this.progresso + (100 / this.frases.length)

      if (this.rodada === 4) {
       this.encerrarJogo.emit('vitoria')
      }

      this.atualizaRodada
    }
    else {
      this.tentativas--

      if (this.tentativas === -1) {
        this.encerrarJogo.emit('derrota')
      }
    }
  }

  atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''
  }
}
