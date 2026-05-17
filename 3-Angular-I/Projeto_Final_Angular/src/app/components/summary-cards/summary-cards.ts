import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary-cards',
  imports: [CommonModule],
  templateUrl: './summary-cards.html',
  styleUrl: './summary-cards.css',
})
export class SummaryCards {
  @Input() income = 0;
  @Input() expenses = 0;

  get balance() {
    return this.income - this.expenses;
  }

  get summaryCards() {
    return [
      {
        id: 1,
        type: 'Receitas',
        value: this.income,
      },
      {
        id: 2,
        type: 'Despesas',
        value: this.expenses,
      },
      {
        id: 0,
        type: 'Saldo',
        value: this.balance,
      },
    ];
  }
}
