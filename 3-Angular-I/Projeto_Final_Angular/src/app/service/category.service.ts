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
  // private _url = 'assets/mocks/categories.json';
    private _url = 'https://crudcrud.com/api/1432da1dbf5d4080a9f790a1d1858646';


  constructor(private _http: HttpClient) {}

  // ! --------------- CREAT ---------------

  creatCategory(id: string, name: string, type: string): Observable<TypeCategoryGroup> {
    const newCategory: TypeCategory = {
      id,
      name,
    };
    return this._http.post<TypeCategoryGroup>(`${this._url}/${type}`, newCategory);
  }

  // ! --------------- READ ---------------

  readCategory(): Observable<TypeCategoryGroup[]> {
    return this._http.get<TypeCategoryGroup[]>(this._url);
  }

  readIdTypeCategory(type: number, id: string): Observable<TypeCategoryGroup> {
    return this._http.get<TypeCategoryGroup>(`${this._url}/${type}/${id}`);
  }

  findCategoryById(id: string, categories: TypeCategoryGroup[]) {
    for (const group of categories) {
      const found = group.categories.find((category) => category.id === id);

      if (found) {
        return {
          ...found,
          type: group.type,
        };
      }
    }
    return null;
  }

  // ! --------------- UPDATE ---------------

  updateCategory(type: number, id: string, name: TypeCategoryGroup): Observable<TypeCategoryGroup> {
    return this._http.put<TypeCategoryGroup>(`${this._url}/${type}/${id}`, name);
  }

  // ! --------------- DELETE ---------------

  deleteCategory(type: number, id: string): Observable<TypeCategoryGroup> {
    return this._http.delete<TypeCategoryGroup>(`${this._url}/${type}/${id}`);
  }
}
