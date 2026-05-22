import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { TIPO } from '../../app';
import { TypeTransaction } from '../../service/transaction.service';

@Component({
  selector: 'app-content',
  imports: [CommonModule],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content {
  // ! ========== DEFAULT ========== TIPO TRANSAÇÃO e BIBLIOTECA DATA ==========
  tipoReceita = TIPO.RECEITA;
  tipoDespesa = TIPO.DESPESA;

  moment = moment;

  // ! ========== LINK COM APP ========== LISTA DE TRANSAÇÕES ==========

  @Input() transactionsList: TypeTransaction[] = [];

  // ! ========== EM CONSTRUÇÃO ==========
}
