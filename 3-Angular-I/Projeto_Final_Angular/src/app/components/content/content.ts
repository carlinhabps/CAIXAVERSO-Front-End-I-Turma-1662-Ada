import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment/min/moment-with-locales';
import { TIPO } from '../../app';
import { TypeTransaction } from '../../service/transaction.service';
import { FilterService } from '../../service/filter.service';

moment.locale('pt-br');

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
  transactionsListFiltered: TypeTransaction[] = [];

  // ! ========== CONSTRUCTOR, NG ON INIT e ON CHANGES ==========

  constructor(private _filterService: FilterService) {}

  ngOnInit() {
    this.transactionsListFiltered = [...this.transactionsList];

    this._filterService.filters$.subscribe((filters) => {
      if (filters) this.applyFilters(filters);
    });
  }

  ngOnChanges() {
    if (this.transactionsList?.length) {
      this.transactionsListFiltered = [...this.transactionsList];
    }
  }

  // ! ========== APLICANDO OS FILTROS ==========

  applyFilters(filtros: any) {
    console.log(filtros);

    const filter: any = filtros;

    // startDate: this.dateRange.value.start,
    // endDate: this.dateRange.value.end,
    // category: this.categoryControl.value,
    // incomes: this.selectedIncomes,
    // expenses: this.selectedExpenses,

    this.transactionsListFiltered = this.transactionsList.filter((t) => {
      // "id": "3",
      // "description": "Supermercado",
      // "type": 2,
      // "category": "1c",
      // "date": "2026-01-15",
      // "value": 420

      if (filter.incomes && t.type !== this.tipoReceita) return false;

      if (filter.expenses && t.type !== this.tipoDespesa) return false;

      if (filter.category !== null && t.category !== filter.category) return false;

      if (filter.startDate !== null && new Date(t.date) < filter.startDate) return false;

      if (filter.endDate !== null && new Date(t.date) > filter.endDate) return false;

      return true;
    });
  }
}
