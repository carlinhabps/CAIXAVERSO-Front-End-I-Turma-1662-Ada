import { Component } from '@angular/core';

@Component({
  selector: 'app-summary-cards',
  imports: [],
  templateUrl: './summary-cards.html',
  styleUrl: './summary-cards.css',
})
export class SummaryCards {
  income = 150000.5;
  expenses = 569.35;
  balance = this.income - this.expenses;

  summaryCards = [
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
