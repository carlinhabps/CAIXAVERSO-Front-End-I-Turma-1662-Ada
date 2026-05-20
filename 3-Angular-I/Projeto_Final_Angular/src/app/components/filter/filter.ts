import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TIPO } from '../../app';
import { TransactionService } from '../../service/transaction.service';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-filter',
  imports: [CommonModule],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  constructor(
    private _categoryService: CategoryService,
    private _transactionService: TransactionService,
  ) {}

  tipoReceita = TIPO.RECEITA;
  tipoDespesa = TIPO.DESPESA;

  // categoryFilterList = [...this._];
}
