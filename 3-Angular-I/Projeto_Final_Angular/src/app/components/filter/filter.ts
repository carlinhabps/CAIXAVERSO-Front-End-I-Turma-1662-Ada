import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TIPO } from '../../app';
import { TypeCategoryGroup } from '../../service/category.service';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

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
  @Output() registerClicked = new EventEmitter<void>();

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

  tipoReceita = TIPO.RECEITA;
  tipoDespesa = TIPO.DESPESA;

  private _categoryControl = new FormControl('');
  get categoryControl() {
    return this._categoryControl;
  }
  set categoryControl(value) {
    this._categoryControl = value;
  }

  onRegisterClick() {
    return this.registerClicked.emit();
  }
}
