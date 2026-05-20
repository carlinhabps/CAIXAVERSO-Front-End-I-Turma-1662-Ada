import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TypeTransaction {
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
  private _url = 'assets/mocks/transactions.json';

  constructor(private _http: HttpClient) {}

  // ! --------------- CREAT ---------------

  creatTransaction(transaction: TypeTransaction): Observable<TypeTransaction> {
    return this._http.post<TypeTransaction>(this._url, transaction);
  }

  // ! --------------- READ ---------------

  readTransaction(): Observable<TypeTransaction[]> {
    return this._http.get<TypeTransaction[]>(this._url);
  }

  readIdTransaction(id: string): Observable<TypeTransaction> {
    return this._http.get<TypeTransaction>(`${this._url}/${id}`);
  }

  // ! --------------- UPDATE ---------------

  updateTransaction(id: string, transaction: TypeTransaction): Observable<TypeTransaction> {
    return this._http.put<TypeTransaction>(`${this._url}/${id}`, transaction);
  }

  // ! --------------- DELETE ---------------

  deleteTransaction(id: string): Observable<TypeTransaction> {
    return this._http.delete<TypeTransaction>(`${this._url}/${id}`);
  }
}
