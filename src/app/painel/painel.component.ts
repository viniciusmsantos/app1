import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases.mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

    public frases: Array<Frase> = FRASES
    public instrucao: string = 'Traduza a frase:'
    public resposta: string = ''
    public rodada: number = 0
    public rodadaFrase: Frase
    public progresso: number = 0
    public tentativas: number = 3
    @Output() public encerrarJogo: EventEmitter<string> =  new EventEmitter

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit() {
  }

  ngOnDestroy(){

  }

  public atualizaResposta(resposta: Event): void{
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void {

    if(this.rodadaFrase.frasePtBr == this.resposta){
        //trocar frase da rodada
        this.rodada++
        //atauliza progresso
        this.progresso = this.progresso + (100 / this.frases.length)
        //Vitoria
        if(this.rodada === this.frases.length){
          this.encerrarJogo.emit('vitoria')
        }
        //atualiza frase
        this.atualizaRodada();
    } else {
      this.tentativas--
      //derrota
      if(this.tentativas == -1){
      this.encerrarJogo.emit('derrota')
      }
    }
  }
  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
     //limpa frase
     this.resposta = ''
  }
}
