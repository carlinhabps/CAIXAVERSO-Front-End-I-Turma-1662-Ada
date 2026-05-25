import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TIPO } from '../../app';
import { TypeTransaction } from '../../models/transaction.types';
import { FilterService } from '../../service/filter.service';

@Component({
  selector: 'app-financial-profile',
  imports: [CommonModule],
  templateUrl: './financial-profile.html',
  styleUrl: './financial-profile.css',
})
export class FinancialProfile implements OnInit {
  // ! ========== DEFAULT ========== TIPO TRANSAÇÃO ==========
  tipoReceita = TIPO.RECEITA;
  tipoDespesa = TIPO.DESPESA;

  // ! ========== LINK COM APP COMPONENT ==========
  @Input()
  set transactionsList(value: TypeTransaction[]) {
    this._transactionsList = value ?? [];
    this._updateFinancialAnalysis();
  }
  get transactionsList(): TypeTransaction[] {
    return this._transactionsList;
  }
  private _transactionsList: TypeTransaction[] = [];

  // ! ========== CONSTRUCTOR, NG ON INIT e ON CHANGES ==========
  constructor(
    private _filterService: FilterService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this._filterService.filters$.subscribe((filters) => {
      this._currentFilters = filters ?? {};
      this._updateFinancialAnalysis();
    });
  }

  // ! ========== FORMULÁRIOS E CONSTANTES ==========
  private _currentFilters: any = null;

  incomeAmount = 0;
  expenseAmount = 0;
  targetAmount = 0;
  remainingAmount = 0;
  overAmount = 0;

  messageId: 'success' | 'atention' | 'danger' = 'atention';
  messageHtml = '';

  // ! ========== PERFIL ==========
  selectedProfile = 'Moderado';

  get profile() {
    return [
      {
        range: 30,
        name: 'Conservador',
      },
      {
        range: 55,
        name: 'Moderado',
      },
      {
        range: 80,
        name: 'Arrojado',
      },
    ];
  }

  get selectedProfileData() {
    return this.profile.find((item) => item.name === this.selectedProfile);
  }

  selectProfile(profileName: string) {
    this.selectedProfile = profileName;
    this._updateFinancialAnalysis();
  }

  // ! ========== ATUALIZAÇÃO DAS REGRAS ==========
  private _updateFinancialAnalysis() {
    const filteredTransactions = this._applyFilters(this.transactionsList, this._currentFilters);

    this.incomeAmount = filteredTransactions
      .filter((t) => t.type === this.tipoReceita)
      .reduce((acc, t) => acc + Number(t.value ?? 0), 0);

    this.expenseAmount = filteredTransactions
      .filter((t) => t.type === this.tipoDespesa)
      .reduce((acc, t) => acc + Number(t.value ?? 0), 0);

    const profile = this.selectedProfileData;
    this.targetAmount = profile ? this.incomeAmount * (profile.range / 100) : 0;

    if (this.expenseAmount > this.targetAmount) {
      this.messageId = 'danger';
      this.overAmount = this.expenseAmount - this.targetAmount;
      this.remainingAmount = 0;
      this.messageHtml = `ATENÇÃO!! ⚠️ Você já excedeu em <span class="messageValue">${this._formatCurrency(this.overAmount)}</span> a meta de gastos estabelecida para esse mês. O valor previsto era de <span class="messageValue">${this._formatCurrency(this.targetAmount)}</span>.`;
      return;
    }

    if (this.expenseAmount === this.targetAmount) {
      this.messageId = 'success';
      this.overAmount = 0;
      this.remainingAmount = 0;
      this.messageHtml = `PARABÉNS!! ✨🎉 Baseando-se nos valores recebidos dentro do período selecionado, você já bateu a meta de gasto para o período, totalizando <span class="messageValue">${this._formatCurrency(this.expenseAmount)}</span> gastos.`;
      return;
    }

    this.messageId = 'atention';
    this.overAmount = 0;
    this.remainingAmount = this.targetAmount - this.expenseAmount;
    this.messageHtml = `Baseando-se nos valores recebidos dentro do período selecionado, ainda é possível utilizar <span class="messageValue">${this._formatCurrency(this.remainingAmount)}</span>, totalizando <span class="messageValue">${this._formatCurrency(this.targetAmount)}</span> previsto para o período.`;
  }

  // ! ========== APLICANDO OS FILTROS ==========
  private _applyFilters(transactions: TypeTransaction[], filtros: any) {
    const filter = filtros ?? {};

    return transactions.filter((t) => {
      if (filter.incomes && t.type !== this.tipoReceita) return false;
      if (filter.expenses && t.type !== this.tipoDespesa) return false;
      if (filter.category && t.category !== filter.category) return false;
      if (filter.startDate && new Date(t.date) < filter.startDate) return false;
      if (filter.endDate && new Date(t.date) > filter.endDate) return false;

      return true;
    });
    this._cdr.detectChanges();
  }

  // ! ========== PADRONIZAÇÃO ==========
  private _formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
