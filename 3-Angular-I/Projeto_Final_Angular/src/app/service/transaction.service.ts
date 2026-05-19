import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Transaction {
  id: string;
  description: string;
  type: number;
  category: string;
  date: Date;
  value: number;
}

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private url = 'assets/mocks/transactions.json';

  constructor(private http: HttpClient) {}

  // ! --------------- CREAT ---------------

  creatTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.url, transaction);
  }

  // ! --------------- READ ---------------

  readTransaction(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url);
  }

  readIdTransaction(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.url}/${id}`);
  }

  // ! --------------- UPDATE ---------------

  updateTransaction(id: string, transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.url}/${id}`, transaction);
  }

  // ! --------------- DELETE ---------------

  deleteTransaction(id: string): Observable<Transaction> {
    return this.http.delete<Transaction>(`${this.url}/${id}`);
  }
  // deleteTransaction(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.url}/${id}`);
  // }

  // postTransaction(): Observable<any[]> {
  // localStorage.setItem('tabela', JSON.stringify(this.listaResumos));
  // }
}
