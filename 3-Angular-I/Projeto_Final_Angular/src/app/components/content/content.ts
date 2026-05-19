import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { TIPO } from '../../app';

@Component({
  selector: 'app-content',
  imports: [CommonModule],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content {
  @Input() transactionList: any[] = [];

  moment = moment;

  tipoReceita = TIPO.RECEITA;
  tipoDespesa = TIPO.DESPESA;
}
