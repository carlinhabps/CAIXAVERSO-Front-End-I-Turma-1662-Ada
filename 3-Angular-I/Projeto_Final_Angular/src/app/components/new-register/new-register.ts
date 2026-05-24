import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TIPO } from '../../app';
import { TypeCategoryGroup } from '../../service/category.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-new-register',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-register.html',
  styleUrl: './new-register.css',
})
export class NewRegister {
  // ! ========== DEFAULT ========== TIPO TRANSAÇÃO ==========
  tipoReceita = TIPO.RECEITA;
  tipoDespesa = TIPO.DESPESA;

  // ! ========== LINK COM APP ========== FECHAR O COMPONENTE NEW-REGISTER ==========
  @Output() closeRegister = new EventEmitter();
  value: any;

  offNewRegisterClick() {
    return this.closeRegister.emit();
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

  // ! ========== CRIAR FORMULÁRIO COM LISTA DE CATEGORIAS ==========

  categoryControl = new FormControl('');
  descriptionCategoryControl = new FormControl('');
  valueCategoryControl = new FormControl('');

  // ! ========== EM CONSTRUÇÃO ==========
}
