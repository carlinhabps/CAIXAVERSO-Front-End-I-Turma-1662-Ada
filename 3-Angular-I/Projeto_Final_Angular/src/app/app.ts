import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SummaryCards } from './components/summary-cards/summary-cards';
import { Filter } from './components/filter/filter';
import { NewRegister } from './components/new-register/new-register';
import { Content } from './components/content/content';
import { RouterOutlet } from '@angular/router';
import { Transaction, TransactionService } from './service/transaction.service';

export const TIPO = {
  SALDO: 0,
  RECEITA: 1,
  DESPESA: 2,
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, SummaryCards, Filter, NewRegister, Content],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  ngOnInit(): void {
    this.loadTransactions();

    const theme = localStorage.getItem('tema');
    if (theme === 'dark') {
      document.body.classList.add('dark');
      this.buttonTheme = 'assets/icons/day-and-night-2.png';
    }
  }

  constructor(
    private transactionService: TransactionService,
    private cdr: ChangeDetectorRef,
  ) {}

  // ! --------------- CARREGAR DADOS DO BANCO ---------------

  transactionListApi: Transaction[] = [];
  incomeTotal = 0;
  expensesTotal = 0;

  loadTransactions() {
    this.transactionService.readTransaction().subscribe({
      next: (data: Transaction[]) => {
        this.transactionListApi = data;

        this.incomeTotal = data
          .filter((t) => t.type === TIPO.RECEITA)
          .reduce((acc, t) => acc + t.value, 0);

        this.expensesTotal = data
          .filter((t) => t.type === TIPO.DESPESA)
          .reduce((acc, t) => acc + t.value, 0);

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar transações:', err);
      },
    });
  }

  // ! --------------- TEMA DA TELA ---------------

  buttonTheme = 'assets/icons/day-and-night-1.png';

  toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('tema', isDark ? 'dark' : 'light');
    this.buttonTheme = isDark
      ? 'assets/icons/day-and-night-2.png'
      : 'assets/icons/day-and-night-1.png';
  }

  // ! --------------- PERFIL DE CONSULTA ---------------

  personName = 'Carla Beatriz';
}
