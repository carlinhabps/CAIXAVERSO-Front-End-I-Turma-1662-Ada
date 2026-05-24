import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TIPO } from '../../app';
import { CategoryService, TypeCategoryGroup } from '../../service/category.service';
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

  // ! ========== LINK COM APP ========== FECHAR O COMPONENTE NEW-REGISTER ==========
  @Output() closeCategory = new EventEmitter();
  @Output() categoryCreated = new EventEmitter<void>();

  offNewCategoryClick() {
    this.closeCategory.emit();
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

  // ! ========== CRIAR FORMULÁRIO COM LISTA DE CATEGORIAS e LISTA DE TIPO ==========
  categoryControl = new FormControl('');
  typeCategoryControl = new FormControl<number | null>(null);
  nameCategoryControl = new FormControl('');

  // ! ========== EM CONSTRUÇÃO ==========
  actionSelected: '' | 'creat' | 'update' | 'delete' = '';

  actions = [
    { name: 'Criar', value: 'creat' },
    { name: 'Editar', value: 'update' },
    { name: 'Deletar', value: 'delete' },
  ];

  creatNewCategory() {
    const id = uuidv4();
    const name = this.nameCategoryControl.value;
    const typeNumber = this.typeCategoryControl.value;

    if (!name || !typeNumber) {
      console.log('Preencha nome e tipo');
      return;
    }

    const typeName = typeNumber === this.tipoReceita ? 'Receitas' : 'Despesas';

    const result = this._categoryService.creatCategory(id, name, typeName);

    if ('error' in result) {
      console.error(result.error);
      return;
    }

    this.categoryCreated.emit();
    console.log('Categoria CRIADA');
  }

  updateCategory(id: string, newName: string) {
    this._categoryService.updateCategory(id, newName);
    console.log('Categoria ATUALIZADA');
  }

  deleteCategory(id: string) {
    this._categoryService.deleteCategory(id);
    console.log('Categoria DELETADA');
  }

  categoryAction(actionSelected: '' | 'creat' | 'update' | 'delete') {
    this.actionSelected = actionSelected;
    this.save();
  }

  save() {
    const id = this.categoryControl.value;
    const name = this.nameCategoryControl.value;
    const type = this.typeCategoryControl.value;

    if (this.actionSelected === 'creat') {
      if (!name || !type) return console.log('Preencha nome e tipo');
      this.creatNewCategory();
      return;
    }

    if (!id) return console.log('Selecione uma categoria');

    if (this.actionSelected === 'update') {
      if (!name) return console.log('Nome obrigatório');
      this.updateCategory(id, name);
    }

    if (this.actionSelected === 'delete') {
      this.deleteCategory(id);
    }
  }
}
