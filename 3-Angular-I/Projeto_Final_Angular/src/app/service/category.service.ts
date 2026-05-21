import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface TypeCategory {
  id: string;
  name: string;
}

export interface TypeCategoryGroup {
  type: string;
  categories: TypeCategory[];
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _url = 'assets/mocks/categories.json';

  constructor(private _http: HttpClient) {}

  // ! --------------- CREAT ---------------

  creatCategory(category: TypeCategoryGroup): Observable<TypeCategoryGroup> {
    return this._http.post<TypeCategoryGroup>(this._url, category);
  }

  // ! --------------- READ ---------------

  readCategory(): Observable<TypeCategoryGroup[]> {
    return this._http.get<TypeCategoryGroup[]>(this._url);
  }

  readIdCategory(type: number, id: string): Observable<TypeCategoryGroup> {
    return this._http.get<TypeCategoryGroup>(`${this._url}/${type}/${id}`);
  }

  // ! --------------- UPDATE ---------------

  updateCategory(
    type: number,
    id: string,
    category: TypeCategoryGroup,
  ): Observable<TypeCategoryGroup> {
    return this._http.put<TypeCategoryGroup>(`${this._url}/${type}/${id}`, category);
  }

  // ! --------------- DELETE ---------------

  deleteCategory(type: number, id: string): Observable<TypeCategoryGroup> {
    return this._http.delete<TypeCategoryGroup>(`${this._url}/${type}/${id}`);
  }
}
