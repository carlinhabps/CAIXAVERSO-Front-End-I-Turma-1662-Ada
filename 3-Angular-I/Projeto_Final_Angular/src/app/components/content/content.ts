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
  @Input() transactionsList: TypeTransaction[] = [];

  moment = moment;

  tipoReceita = TIPO.RECEITA;
  tipoDespesa = TIPO.DESPESA;
}
