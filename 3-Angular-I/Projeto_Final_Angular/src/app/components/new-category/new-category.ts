import { Component, EventEmitter, Input, model, Output } from '@angular/core';
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
  value: any;

  offNewCategoryClick() {
    return this.closeCategory.emit();
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
        this.creatNewCategory();
        return;
      }

      const selectedCategory = this._categoryService.findCategoryById(
        value,
        this.categoriesNameList,
      );
      if (selectedCategory) {
        const typeValue =
          selectedCategory.type === 'Receitas' ? this.tipoReceita : this.tipoDespesa;
        this.typeCategoryControl.setValue(typeValue);
        this.nameCategoryControl.setValue(selectedCategory.name);
      }
    });
  }

  // ! ========== CRIAR FORMULÁRIO COM LISTA DE CATEGORIAS e LISTA DE TIPO ==========

  categoryControl = new FormControl('');
  typeCategoryControl = new FormControl<number | null>(null);
  nameCategoryControl = new FormControl('');

  // ! ========== EM CONSTRUÇÃO ==========

  actionSelected: 'creat' | 'update' | 'delete' | '' = '';

  actions = [
    { name: 'Criar', value: 'creat', action: () => this.creatNewCategory() },
    { name: 'Editar', value: 'update', action: () => this.updateCategory() },
    { name: 'Deletar', value: 'delete', action: () => this.deleteCategory() },
  ];

  creatNewCategory() {
    this.typeCategoryControl.reset();
    this.nameCategoryControl.reset();

    const id = uuidv4();
    const name = this.nameCategoryControl.value;
    const typeNumber = this.typeCategoryControl.value;

    if (!name) return;

    let typeName: string = '';

    if (typeNumber === this.tipoReceita) {
      typeName = 'Receitas';
    }

    if (typeNumber === this.tipoDespesa) {
      typeName = 'Despesas';
    }

    this._categoryService.creatCategory(id, name, typeName);

    console.log('categoria criada');
  }

  updateCategory() {
    console.log('teste updateCategory');
  }

  deleteCategory() {
    console.log('teste deleteCategory');
  }

  categoryAction(actionSelected: string) {
    const action = this.actions.find((a) => a.value === actionSelected);

    if (action) action.action();
  }
}
