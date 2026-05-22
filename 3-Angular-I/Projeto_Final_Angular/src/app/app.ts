import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SummaryCards } from './components/summary-cards/summary-cards';
import { Filter } from './components/filter/filter';
import { NewRegister } from './components/new-register/new-register';
import { Content } from './components/content/content';
import { RouterOutlet } from '@angular/router';
import { TransactionService, TypeTransaction } from './service/transaction.service';
import { CategoryService, TypeCategoryGroup } from './service/category.service';

export enum TIPO {
  SALDO = 0,
  RECEITA = 1,
  DESPESA = 2,
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, SummaryCards, Filter, NewRegister, Content],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  // ! ========== CARREGAMENTO DA PÁGINA E CONSTRUCTOR ==========

  ngOnInit(): void {
    this.loadTransactions();
    this.loadCategories();

    const theme = localStorage.getItem('tema');
    if (theme === 'dark') {
      document.body.classList.add('dark');
      this.buttonTheme = 'assets/icons/day-and-night-2.png';
    }
  }

  constructor(
    private _transactionService: TransactionService,
    private _categoryService: CategoryService,
    private _cdr: ChangeDetectorRef,
  ) {}

  // ! ========== TRANSAÇÕES ==========

  transactionListApi: TypeTransaction[] = [];
  incomeTotal = 0;
  expensesTotal = 0;

  loadTransactions() {
    this._transactionService.readTransaction().subscribe({
      next: (data: TypeTransaction[]) => {
        this.transactionListApi = data;

        this.incomeTotal = data
          .filter((t) => t.type === TIPO.RECEITA)
          .reduce((acc, t) => acc + t.value, 0);

        this.expensesTotal = data
          .filter((t) => t.type === TIPO.DESPESA)
          .reduce((acc, t) => acc + t.value, 0);

        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar a lista de transações:', err);
      },
    });
  }

  // ! ========== CATEGORIAS ==========

  categoryListApi: TypeCategoryGroup[] = [];

  loadCategories() {
    this._categoryService.readCategory().subscribe({
      next: (data: TypeCategoryGroup[]) => {
        this.categoryListApi = data;

        this._cdr.detectChanges();
      },

      error: (err) => {
        console.error('Erro ao carregar a lista das categorias:', err);
      },
    });
  }

  // ! ========== TEMA DA TELA ==========

  buttonTheme = 'assets/icons/day-and-night-1.png';

  toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('tema', isDark ? 'dark' : 'light');
    this.buttonTheme = isDark
      ? 'assets/icons/day-and-night-2.png'
      : 'assets/icons/day-and-night-1.png';
  }

  // ! ========== PERFIL DE CONSULTA ==========

  personName = 'Carla Beatriz';

  // ! ========== NOVO REGISTRO ==========

  showNewRegister = false;

  onRegisterClick() {
    this.showNewRegister = true;
  }

  offRegisterClick() {
    this.showNewRegister = false;
  }

  // ! ========== EM CONSTRUÇÃO ==========
}
