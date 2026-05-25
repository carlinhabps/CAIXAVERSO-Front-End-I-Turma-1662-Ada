import { Injectable } from '@angular/core';
import { TypeTransaction } from '../models/transaction.types';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { TRANSACTIONS } from '../../assets/mocks/transactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private _storageKey = 'transactions';

  // ! ==================== BASE ====================

  private _saveTransactions(transactions: TypeTransaction[]): void {
    localStorage.setItem(this._storageKey, JSON.stringify(transactions));
  }

  private _createSeed(): TypeTransaction[] {
    return TRANSACTIONS.map((transaction) => ({
      ...transaction,
      date: this._defaultDate(transaction.date),
    }));
  }

  private _loadTransactions(): TypeTransaction[] {
    const data = localStorage.getItem(this._storageKey);

    if (!data) {
      const seed = this._createSeed();
      this._saveTransactions(seed);
      return seed;
    }

    try {
      const parsed = JSON.parse(data) as TypeTransaction[];

      return parsed.map((transaction) => ({
        ...transaction,
        date: this._defaultDate(transaction.date),
      }));
    } catch {
      const seed = this._createSeed();
      this._saveTransactions(seed);
      return seed;
    }
  }

  // ! ==================== PADRONIZAÇÃO ====================

  private _defaultDate(value: string | Date): string {
    if (typeof value === 'string') {
      return value;
    }

    return new Date(value).toISOString().slice(0, 10);
  }

  private _defaultTransaction(transaction: TypeTransaction): TypeTransaction {
    return {
      ...transaction,
      id: transaction.id || uuidv4(),
      date: this._defaultDate(transaction.date),
    };
  }

  // ! ==================== CREAT ====================
  creatTransaction(transaction: TypeTransaction): Observable<TypeTransaction[]> {
    const transactions = this._loadTransactions();
    transactions.unshift(this._defaultTransaction(transaction));
    this._saveTransactions(transactions);
    return of(transactions);
  }

  // ! ==================== READ ====================
  readTransaction(): Observable<TypeTransaction[]> {
    return of(this._loadTransactions());
  }

  // ! ==================== UPDATE ====================
  updateTransaction(id: string, transaction: TypeTransaction): Observable<TypeTransaction[]> {
    const transactions = this._loadTransactions();
    const index = transactions.findIndex((item) => item.id === id);

    if (index === -1) {
      return of(transactions);
    }

    transactions[index] = this._defaultTransaction({
      ...transaction,
      id,
    });

    this._saveTransactions(transactions);
    return of(transactions);
  }

  // ! ==================== DELETE ====================
  deleteTransaction(id: string): Observable<TypeTransaction[]> {
    const transactions = this._loadTransactions().filter((item) => item.id !== id);
    this._saveTransactions(transactions);
    return of(transactions);
  }
}
