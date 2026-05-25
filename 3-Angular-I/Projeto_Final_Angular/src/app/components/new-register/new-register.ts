import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TIPO } from '../../app';
import { TypeCategoryGroup } from '../../models/category.types';
import { TypeTransaction } from '../../models/transaction.types';

@Component({
  selector: 'app-new-register',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-register.html',
  styleUrl: './new-register.css',
})
export class NewRegister implements OnChanges, OnInit {
  // ! ========== DEFAULT ========== TIPO TRANSAÇÃO ==========
  tipoReceita = TIPO.RECEITA;
  tipoDespesa = TIPO.DESPESA;

  // ! ========== LINK COM APP COMPONENT ==========
  @Output() closeRegister = new EventEmitter<void>();
  @Output() saveTransaction = new EventEmitter<{
    mode: 'create' | 'update';
    transaction: TypeTransaction;
  }>();

  @Input() categoriesList: TypeCategoryGroup[] = [];
  @Input() transactionToEdit: TypeTransaction | null = null;
  @Input() currentTransactions: TypeTransaction[] = [];

  // ! ========== CONSTRUCTOR, NG ON INIT e ON CHANGES ==========
  ngOnInit(): void {
    this.categoryControl.valueChanges.subscribe(() => {
      this._syncTypeFromCategory();
    });
  }

  ngOnChanges(): void {
    this._populateForm();
  }

  // ! ========== FORMULÁRIOS E CONSTANTES ==========
  categoryControl = new FormControl<string>('');
  descriptionControl = new FormControl<string>('');
  dateControl = new FormControl<Date | null>(new Date());

  selectedType: number | null = null;
  valueText = 'R$ 0,00';
  rawValue = '0';
  maxDate = new Date();

  // ! ========== SALVAR TRANSAÇÕES - NOVA OU ALTERAÇÕES ==========
  onSave() {
    const description = this.descriptionControl.value?.trim();
    const category = this.categoryControl.value;
    const type = this.selectedType;
    const date = this.dateControl.value;
    const value = this._parseCurrency(this.valueText);

    if (!category) {
      alert(`Campo CATEGORIA pendente.`);
    }

    if (!description) {
      alert(`Campo DESCRIÇÃO pendente de preenchimento.`);
    }

    if (!date) {
      alert(`Campo DATA pendente de preenchimento.`);
    }

    if (value <= 0) {
      alert(`Campo VALOR pendente de preenchimento.`);
    }

    if (!category || !description || type === null || !date || value <= 0) {
      return;
    }

    const transaction: TypeTransaction = {
      id: this.transactionToEdit?.id ?? '',
      description,
      type,
      category,
      date: this._formatDateForSave(date),
      value,
    };

    if (this._negativeBalance(transaction)) {
      alert('Saldo insuficiente para realizar a operação.');
      return;
    }

    this.saveTransaction.emit({
      mode: this.transactionToEdit ? 'update' : 'create',
      transaction,
    });
    this.closeRegister.emit();
  }

  private _negativeBalance(transaction: TypeTransaction): boolean {
    const balance = this.currentTransactions
      .filter((item) => item.id !== this.transactionToEdit?.id)
      .reduce((acc, item) => {
        const value = Number(item.value);

        return acc + (item.type === this.tipoReceita ? value : -value);
      }, 0);

    const nextValue = Number(transaction.value);

    return balance + (transaction.type === this.tipoReceita ? nextValue : -nextValue) < 0;
  }

  // ! ========== PREENCHER CAMPOS DO NEW-REGISTER ==========
  private _populateForm() {
    this._syncTypeFromCategory();

    if (this.transactionToEdit) {
      this.categoryControl.setValue(this.transactionToEdit.category, { emitEvent: false });

      this.selectedType = this.transactionToEdit.type;

      this.descriptionControl.setValue(this.transactionToEdit.description, { emitEvent: false });

      this.rawValue = String(this.transactionToEdit.value ?? 0);
      this.valueText = this._formatCurrencyInput(this.rawValue);

      this.dateControl.setValue(
        typeof this.transactionToEdit.date === 'string'
          ? new Date(this.transactionToEdit.date)
          : new Date(this.transactionToEdit.date),
        { emitEvent: false },
      );

      return;
    }

    this.categoryControl.reset('', { emitEvent: false });
    this.selectedType = null;
    this.descriptionControl.reset('', { emitEvent: false });
    this.rawValue = '0';
    this.valueText = 'R$ 0,00';
    this.dateControl.setValue(new Date(), { emitEvent: false });
  }

  onValueInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '');

    this.rawValue = digits || '0';
    this.valueText = this.rawValue;
    input.value = this.rawValue;
  }

  onValueBlur() {
    const numericValue = Number(this.rawValue || 0);
    this.valueText = this._formatCurrencyInput(numericValue);
  }

  // ! ========== PADRONIZAÇÃO ==========
  private _syncTypeFromCategory() {
    const category = this.categoryControl.value;

    if (!category) {
      this.selectedType = null;
      return;
    }

    const group = this.categoriesList.find((c) =>
      c.categories.some((categoryName) => categoryName.name === category),
    );

    this.selectedType =
      group?.type === 'Receitas'
        ? this.tipoReceita
        : group?.type === 'Despesas'
          ? this.tipoDespesa
          : null;
  }

  private _formatCurrencyInput(value: string | number): string {
    if (value === null || value === undefined || value === '') {
      return 'R$ 0,00';
    }

    const numericValue = typeof value === 'number' ? value : this._extractNumberFromInput(value);

    if (!Number.isFinite(numericValue)) {
      return 'R$ 0,00';
    }

    return numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  private _parseCurrency(value: string): number {
    const numericValue = this._extractNumberFromInput(value);

    return Number.isFinite(numericValue) ? numericValue : 0;
  }

  private _extractNumberFromInput(value: string): number {
    const trimmed = value.trim();

    if (!trimmed) {
      return 0;
    }

    if (trimmed.includes(',') || trimmed.includes('.')) {
      const normalized = trimmed
        .replace(/\./g, '')
        .replace(',', '.')
        .replace(/[^\d.-]/g, '');

      const parsedValue = Number(normalized);
      return Number.isFinite(parsedValue) ? parsedValue : 0;
    }

    const digits = trimmed.replace(/\D/g, '');

    return Number(digits || 0);
  }

  private _formatDateForSave(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // ! ========== FECHAR COMPONENT ==========
  offNewRegisterClick() {
    this.closeRegister.emit();
  }
}
