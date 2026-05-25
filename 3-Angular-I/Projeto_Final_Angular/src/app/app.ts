import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SummaryCards } from './components/summary-cards/summary-cards';
import { Filter } from './components/filter/filter';
import { NewRegister } from './components/new-register/new-register';
import { Content } from './components/content/content';
import { RouterOutlet } from '@angular/router';
import { TransactionService } from './service/transaction.service';
import { CategoryService } from './service/category.service';
import { TypeTransaction } from './models/transaction.types';
import { TypeCategoryGroup } from './models/category.types';
import { NewCategory } from './components/new-category/new-category';

export enum TIPO {
  SALDO = 0,
  RECEITA = 1,
  DESPESA = 2,
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, SummaryCards, Filter, NewRegister, Content, NewCategory],
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

  // ! ========== PERFIL DE CONSULTA e TEMA DA TELA ==========
  personName = 'Carla Beatriz';

  buttonTheme = 'assets/icons/day-and-night-1.png';

  toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('tema', isDark ? 'dark' : 'light');
    this.buttonTheme = isDark
      ? 'assets/icons/day-and-night-2.png'
      : 'assets/icons/day-and-night-1.png';
  }

  // ! ========== SALDOS ==========
  incomeTotal = 0;
  expensesTotal = 0;

  // ! ========== CATEGORIAS ==========
  categoryListApi: TypeCategoryGroup[] = [];

  loadCategories() {
    this.categoryListApi = this._categoryService.readAllCategories();
    this._cdr.detectChanges();
  }

  // ! ========== TRANSAÇÕES ==========
  transactionListApi: TypeTransaction[] = [];
  transactionToEdit: TypeTransaction | null = null;

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
      error: (err: unknown) => {
        console.error('Erro ao carregar a lista de transações:', err);
      },
    });
  }

  onEditTransaction(transaction: TypeTransaction) {
    this.transactionToEdit = transaction;
    this.showNewRegister = true;
  }

  onDeleteTransaction(id: string) {
    this._transactionService.deleteTransaction(id).subscribe({
      next: () => this.loadTransactions(),
      error: (err: unknown) => {
        console.error('Erro ao excluir transação:', err);
      },
    });
  }

  onTransactionSubmit(submit: { mode: 'create' | 'update'; transaction: TypeTransaction }) {
    const request =
      submit.mode === 'create'
        ? this._transactionService.creatTransaction(submit.transaction)
        : this._transactionService.updateTransaction(submit.transaction.id, submit.transaction);

    request.subscribe({
      next: () => {
        this.showNewRegister = false;
        this.transactionToEdit = null;
        this.loadTransactions();
      },
      error: (err: unknown) => {
        console.error('Erro ao salvar transação:', err);
      },
    });
  }

  // ! ========== ABRIR FECHAR NEW-CATEGORY NEW-REGISTER ==========
  showNewCategory = false;

  onNewCategoryClick() {
    this.showNewCategory = true;
  }

  offNewCategoryClick() {
    this.showNewCategory = false;
  }

  onCategoryChanged() {
    this.loadCategories();
  }

  showNewRegister = false;

  onNewRegisterClick() {
    this.transactionToEdit = null;
    this.showNewRegister = true;
  }

  offNewRegisterClick() {
    this.showNewRegister = false;
    this.transactionToEdit = null;
  }
}
