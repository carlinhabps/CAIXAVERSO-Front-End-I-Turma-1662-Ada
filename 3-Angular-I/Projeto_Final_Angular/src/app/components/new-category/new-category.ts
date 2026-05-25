import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TIPO } from '../../app';
import { TypeCategoryGroup } from '../../models/category.types';
import { CategoryService } from '../../service/category.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-category',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  templateUrl: './new-category.html',
  styleUrl: './new-category.css',
})
export class NewCategory {
  // ! ========== DEFAULT ========== TIPO TRANSAÇÃO ==========
  tipoReceita = TIPO.RECEITA;
  tipoDespesa = TIPO.DESPESA;

  // ! ========== LINK COM APP COMPONENT ==========
  @Output() closeCategory = new EventEmitter<void>();
  @Output() categoryChanged = new EventEmitter<void>();

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
  constructor(private _categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryControl.valueChanges.subscribe((value) => {
      if (!value) return;

      if (value === 'newCategory') {
        this.typeCategoryControl.reset();
        this.nameCategoryControl.reset();
        return;
      }

      const selectedCategory = this._categoryService.readCategoriesById(value);

      if ('error' in selectedCategory) {
        console.error(selectedCategory.error);
        return;
      }

      const typeValue = selectedCategory.type === 'Receitas' ? this.tipoReceita : this.tipoDespesa;

      this.typeCategoryControl.setValue(typeValue);
      this.nameCategoryControl.setValue(selectedCategory.name);
    });
  }

  // ! ========== FORMULÁRIOS E CONSTANTES ==========
  categoryControl = new FormControl('');
  typeCategoryControl = new FormControl<number | null>(null);
  nameCategoryControl = new FormControl('');

  actionSelected: '' | 'creat' | 'update' | 'delete' = '';

  actions = [
    { name: 'Criar', value: 'creat' },
    { name: 'Editar', value: 'update' },
    { name: 'Deletar', value: 'delete' },
  ];

  // ! ========== CRIAR NOVA CATEGORIA ==========
  creatNewCategory() {
    const id = uuidv4();
    const name = this.nameCategoryControl.value;
    const typeNumber = this.typeCategoryControl.value;

    if (!name || !typeNumber) {
      alert('Preencha nome e tipo');
      return;
    }

    const typeName = typeNumber === this.tipoReceita ? 'Receitas' : 'Despesas';

    const result = this._categoryService.creatCategory(id, name, typeName);
    if ('error' in result) {
      console.error(result.error);
      return;
    }

    this.categoryChanged.emit();
    this.offNewCategoryClick();
  }

  // ! ========== EDITAR CATEGORIA ==========
  updateCategory(id: string, newName: string) {
    const result = this._categoryService.updateCategory(id, newName);

    if ('error' in result) {
      console.error(result.error);
      return;
    }

    this.categoryChanged.emit();
    this.offNewCategoryClick();
  }

  // ! ========== DELETAR CATEGORIA ==========
  deleteCategory(id: string) {
    const result = this._categoryService.deleteCategory(id);

    if ('error' in result) {
      console.error(result.error);
      return;
    }

    this.categoryChanged.emit();
    this.offNewCategoryClick();
  }

  // ! ========== IDENTIFICA QUAL AÇÃO DO CRUD CHAMAR ==========
  categoryAction(actionSelected: '' | 'creat' | 'update' | 'delete') {
    this.actionSelected = actionSelected;
    this.save();
  }

  save() {
    const id = this.categoryControl.value;
    const name = this.nameCategoryControl.value;
    const type = this.typeCategoryControl.value;

    const typeName = type === this.tipoReceita ? 'Receitas' : 'Despesas';

    if (this.actionSelected === 'creat') {
      if (!name || !type) return alert('Preenchimento do NOME e TIPO obrigatórios.');

      this.creatNewCategory();
      alert(
        `Categoria ${name?.toUpperCase()}, do tipo ${typeName.toUpperCase()}, criada com sucesso. `,
      );
      return;
    }

    if (!id) return alert('Selecione uma categoria');

    if (this.actionSelected === 'update') {
      if (!name) return alert('Preenchimento do NOME obrigatório');
      this.updateCategory(id, name);
      alert(`Categoria ${name?.toUpperCase()} atualizada com sucesso. `);
    }

    if (this.actionSelected === 'delete') {
      this.deleteCategory(id);
      alert(`Categoria ${name?.toUpperCase()} deletada com sucesso. `);
    }
  }

  // ! ========== FECHAR COMPONENT ==========
  offNewCategoryClick() {
    this.closeCategory.emit();
  }
}
