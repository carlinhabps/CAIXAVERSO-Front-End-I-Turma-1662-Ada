import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TIPO } from '../../app';
import { TypeCategoryGroup } from '../../service/category.service';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FilterService } from '../../service/filter.service';

@Component({
  selector: 'app-filter',
  imports: [
    CommonModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  // ! ========== DEFAULT ========== TIPO TRANSAÇÃO ==========
  tipoReceita = TIPO.RECEITA;
  tipoDespesa = TIPO.DESPESA;

  // ! ========== LINK COM APP ========== ATIVAR O COMPONENTE NEW-REGISTER ==========
  @Output() registerClicked = new EventEmitter<void>();

  onRegisterClick() {
    return this.registerClicked.emit();
  }

  // ! ========== LINK COM APP ========== RECEBER A LISTA DE CATEGORIAS ==========
  @Input()
  set categoriesList(value: TypeCategoryGroup[]) {
    this._categoriesList = value;
    this.categoriesNameList = [...value];
  }
  get categoriesList(): TypeCategoryGroup[] {
    return this._categoriesList;
  }
  private _categoriesList: TypeCategoryGroup[] = [];
  categoriesNameList: TypeCategoryGroup[] = [];

  // ! ==========  CONSTRUCTOR ==========

  constructor(private _filterService: FilterService) {}

  // ! ========== CRIAR CALENDÁRIO ==========

  dateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  // ! ========== CRIAR LISTA DE CATEGORIAS ==========

  categoryControl = new FormControl('');

  // ! ========== APLICAR FILTROS ==========

  applyFilteredContent() {
    const filtros = {
      startDate: this.dateRange.value.start,
      endDate: this.dateRange.value.end,
      category: this.categoryControl.value,
      incomes: this.selectedIncomes,
      expenses: this.selectedExpenses,
    };
    console.log(filtros);
    this._filterService.updateFilter(filtros);
  }

  // ! ========== SELEÇÃO DO FILTRO C e/ou D, RECEITAS e/ou DESPESAS ==========

  selectedIncomes = false;
  selectedExpenses = false;

  typeFilter(value: number) {
    const incomesCategoriesList = this.categoriesList.filter((cat) => cat.type === 'Receitas');

    const expensesCategoriesList = this.categoriesList.filter((cat) => cat.type === 'Despesas');

    if (value === this.tipoReceita && !this.selectedIncomes) {
      this.selectedExpenses = this.selectedIncomes;
      this.selectedIncomes = !this.selectedIncomes;

      this.categoriesNameList = incomesCategoriesList;

      return;
    }

    if (value === this.tipoDespesa && !this.selectedExpenses) {
      this.selectedIncomes = this.selectedExpenses;
      this.selectedExpenses = !this.selectedExpenses;

      this.categoriesNameList = expensesCategoriesList;

      return;
    }

    if (value === this.tipoReceita && this.selectedIncomes) {
      this.selectedIncomes = !this.selectedIncomes;

      this.categoriesNameList = this.categoriesList;

      return;
    }

    if (value === this.tipoDespesa && this.selectedExpenses) {
      this.selectedExpenses = !this.selectedExpenses;

      this.categoriesNameList = this.categoriesList;

      return;
    }
  }

  // ! ========== LIMPAR FILTROS ==========

  cleanFilteredContent() {
    this.dateRange.reset();
    this.categoryControl.reset();
    this.selectedIncomes = false;
    this.selectedExpenses = false;
  }
}
