import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TypeCategory {
  id: string;
  type: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _url = 'assets/mocks/categories.json';

  constructor(private _http: HttpClient) {}

  // ! --------------- CREAT ---------------

  creatCategory(category: TypeCategory): Observable<TypeCategory> {
    return this._http.post<TypeCategory>(this._url, category);
  }

  // ! --------------- READ ---------------

  readCategory(): Observable<TypeCategory[]> {
    return this._http.get<TypeCategory[]>(this._url);
  }

  readIdCategory(id: string): Observable<TypeCategory> {
    return this._http.get<TypeCategory>(`${this._url}/${id}`);
  }

  // ! --------------- UPDATE ---------------

  updateCategory(id: string, category: TypeCategory): Observable<TypeCategory> {
    return this._http.put<TypeCategory>(`${this._url}/${id}`, category);
  }

  // ! --------------- DELETE ---------------

  deleteCategory(id: string): Observable<TypeCategory> {
    return this._http.delete<TypeCategory>(`${this._url}/${id}`);
  }
}
