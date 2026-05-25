import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TIPO } from '../../app';
import { TypeTransaction } from '../../models/transaction.types';
import { FilterService } from '../../service/filter.service';

@Component({
  selector: 'app-content',
  imports: [CommonModule],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content implements OnInit {
  // ! ========== DEFAULT ========== TIPO TRANSAÇÃO ==========
  tipoReceita = TIPO.RECEITA;
  tipoDespesa = TIPO.DESPESA;

  // ! ========== LINK COM APP COMPONENT ==========
  @Input()
  set transactionsList(value: TypeTransaction[]) {
    this._transactionsList = value ?? [];
    this.applyFilters(this._currentFilters);
  }
  get transactionsList(): TypeTransaction[] {
    return this._transactionsList;
  }

  @Output() editTransaction = new EventEmitter<TypeTransaction>();
  @Output() deleteTransaction = new EventEmitter<string>();

  // ! ========== CONSTRUCTOR, NG ON INIT e ON CHANGES ==========
  constructor(
    private _filterService: FilterService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this._filterService.filters$.subscribe((filters) => {
      this._currentFilters = filters;
      this.applyFilters(filters);
    });
  }

  // ! ========== FORMULÁRIOS E CONSTANTES ==========
  transactionsListFiltered: TypeTransaction[] = [];

  private _transactionsList: TypeTransaction[] = [];
  private _currentFilters: any = null;

  // ! ========== APLICANDO OS FILTROS ==========
  applyFilters(filtros: any) {
    const filter = filtros ?? {};

    this.transactionsListFiltered = this._transactionsList.filter((t) => {
      if (filter.incomes && t.type !== this.tipoReceita) return false;

      if (filter.expenses && t.type !== this.tipoDespesa) return false;

      if (filter.category && t.category !== filter.category) return false;

      if (filter.startDate && new Date(t.date) < filter.startDate) return false;

      if (filter.endDate && new Date(t.date) > filter.endDate) return false;

      return true;
    });

    this._cdr.detectChanges();
  }

  // ! ========== AÇÕES DA TABELA ==========
  onEdit(transaction: TypeTransaction) {
    this.editTransaction.emit(transaction);
  }

  onDelete(id: string) {
    this.deleteTransaction.emit(id);
  }

  // ! ========== PADRONIZAÇÃO ==========
  formatDate(date: string | Date) {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
