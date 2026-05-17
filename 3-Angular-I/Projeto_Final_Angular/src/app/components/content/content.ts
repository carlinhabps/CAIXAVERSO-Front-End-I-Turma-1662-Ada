import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TransactionService } from '../../service/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  imports: [CommonModule],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content implements OnInit {
  transactionList: any[] = [];

  constructor(
    private transactionService: TransactionService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactionList = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar transações:', err);
      },
    });
  }
}
