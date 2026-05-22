import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TIPO } from '../../app';

@Component({
  selector: 'app-summary-cards',
  imports: [CommonModule],
  templateUrl: './summary-cards.html',
  styleUrl: './summary-cards.css',
})
export class SummaryCards {
  // ! ========== DEFAULT ========== TIPO TRANSAÇÃO ==========
  tipoReceita = TIPO.RECEITA;
  tipoDespesa = TIPO.DESPESA;

  // ! ========== LINK COM APP ========== VALORES TOTAIS ==========
  @Input() income = 0;
  @Input() expenses = 0;

  get balance() {
    return this.income - this.expenses;
  }

  get summaryCards() {
    return [
      {
        id: TIPO.RECEITA,
        type: 'Receitas',
        value: this.income,
      },
      {
        id: TIPO.DESPESA,
        type: 'Despesas',
        value: this.expenses,
      },
      {
        id: TIPO.SALDO,
        type: 'Saldo',
        value: this.balance,
      },
    ];
  }
}
