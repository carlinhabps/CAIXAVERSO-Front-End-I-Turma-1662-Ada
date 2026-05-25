import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TIPO } from '../../app';
import { TypeCategoryGroup } from '../../models/category.types';
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

  // ! ========== LINK COM APP COMPONENT ==========
  @Output() newRegisterClicked = new EventEmitter<void>();
  @Output() newCategoryClicked = new EventEmitter<void>();

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

  // ! ========== CONSTRUCTOR, NG ON INIT e ON CHANGES ==========
  constructor(private _filterService: FilterService) {}

  ngOnInit() {
    this.cleanFilteredContent();
  }

  // ! ========== FORMULÁRIOS E CONSTANTES ==========
  dateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  categoryControl = new FormControl('');

  // ! ========== ABRIR COMPONENTS - NEW REGISTER E NEW CATEGORY ==========
  onNewRegisterClick() {
    return this.newRegisterClicked.emit();
  }

  onNewCategoryClick() {
    return this.newCategoryClicked.emit();
  }

  // ! ========== APLICAR FILTROS ==========

  applyFilteredContent() {
    const filtros = {
      startDate: this.dateRange.value.start,
      endDate: this.dateRange.value.end,
      category: this.categoryControl.value,
      incomes: this.selectedIncomes,
      expenses: this.selectedExpenses,
    };
    this._filterService.updateFilter(filtros);
  }

  // ! ========== SELEÇÃO DO FILTRO C ou D, RECEITAS ou DESPESAS ==========

  selectedIncomes = false;
  selectedExpenses = false;

  typeFilter(value: number) {
    const incomesCategoriesList = this.categoriesList.filter((cat) => cat.type === 'Receitas');

    const expensesCategoriesList = this.categoriesList.filter((cat) => cat.type === 'Despesas');

    if (value === this.tipoReceita && !this.selectedIncomes) {
      this.selectedExpenses = this.selectedIncomes;
      this.selectedIncomes = !this.selectedIncomes;

      this.categoriesNameList = incomesCategoriesList;
      this.applyFilteredContent();

      return;
    }

    if (value === this.tipoDespesa && !this.selectedExpenses) {
      this.selectedIncomes = this.selectedExpenses;
      this.selectedExpenses = !this.selectedExpenses;

      this.categoriesNameList = expensesCategoriesList;
      this.applyFilteredContent();

      return;
    }

    if (value === this.tipoReceita && this.selectedIncomes) {
      this.selectedIncomes = !this.selectedIncomes;

      this.categoriesNameList = this.categoriesList;
      this.applyFilteredContent();

      return;
    }

    if (value === this.tipoDespesa && this.selectedExpenses) {
      this.selectedExpenses = !this.selectedExpenses;

      this.categoriesNameList = this.categoriesList;
      this.applyFilteredContent();

      return;
    }
  }

  // ! ========== LIMPAR FILTROS ==========

  cleanFilteredContent() {
    this.selectedIncomes = false;
    this.selectedExpenses = false;
    this.categoryControl.reset();
    this.dateRange.reset();

    this.categoriesNameList = this.categoriesList;

    this.applyFilteredContent();
  }
}
