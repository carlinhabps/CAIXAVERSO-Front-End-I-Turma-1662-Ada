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
  }

  // ! ========== EM CONSTRUÇÃO ==========

  selectedIncomes = false;
  incomeFilter() {
    this.selectedIncomes = !this.selectedIncomes;
  }

  selectedExpenses = false;
  expensesFilter() {
    this.selectedExpenses = !this.selectedExpenses;
  }

  cleanFilteredContent() {
    console.log('Limpar Filtros');
  }
}
