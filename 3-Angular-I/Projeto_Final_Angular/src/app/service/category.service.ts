import { Injectable } from '@angular/core';
import { TypeCategoryGroup } from '../models/category.types';
import { CATEGORIES } from '../../assets/mocks/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _STORAGE_KEY = 'categories';

  // ! ==================== BASE ====================
  private _loadCategories(): TypeCategoryGroup[] {
    const data = localStorage.getItem(this._STORAGE_KEY);

    if (!data) {
      this._saveCategories(CATEGORIES);
      return CATEGORIES;
    }

    try {
      return JSON.parse(data) as TypeCategoryGroup[];
    } catch {
      this._saveCategories(CATEGORIES);
      return CATEGORIES;
    }
  }

  private _saveCategories(categories: TypeCategoryGroup[]): void {
    localStorage.setItem(this._STORAGE_KEY, JSON.stringify(categories));
  }

  private _findCategoryById(id: string) {
    const allCategories = this._loadCategories();

    for (const group of allCategories) {
      const category = group.categories.find((c) => c.id === id);

      if (category) {
        return {
          allCategories,
          group,
          category,
        };

        //  {
        //   allCategories: [...],
        //   group: { type: "Despesas", categories: [...] },
        //   category: { id: "1c", name: "Moradia" }
        //  }
      }
    }
    return null;
  }

  // ! ==================== CREAT ====================
  creatCategory(id: string, name: string, type: string) {
    const allCategories = this._loadCategories();

    let group = allCategories.find((g) => g.type === type);

    if (!group) {
      group = {
        type,
        categories: [],
      };
      allCategories.push(group);
    }

    const nameCategoryExists = group.categories.some(
      (c) => c.name.toLowerCase() === name.toLowerCase(),
    );

    if (nameCategoryExists) return { error: 'Categoria duplicada para o tipo: ' + type };

    group.categories.push({ id, name });

    this._saveCategories(allCategories);
    return { success: true };
  }

  // ! ==================== READ ====================
  readAllCategories(): TypeCategoryGroup[] {
    return this._loadCategories();
  }

  readCategoriesByType(type: string) {
    const allCategories = this._loadCategories();
    return allCategories.find((g) => g.type === type);
  }

  readCategoriesById(id: string): { error: string } | { type: string; name: string; id: string } {
    const result = this._findCategoryById(id);

    if (!result) return { error: 'Categoria não localizada.' };

    const typeGroup = result.group.type;
    const nameCategory = result.category.name;

    return {
      type: typeGroup,
      name: nameCategory,
      id,
    };
  }

  // ! ==================== UPDATE ====================
  updateCategory(id: string, newName: string) {
    const result = this._findCategoryById(id);

    if (!result) return { error: 'Categoria não localizada.' };

    const allCategories = result.allCategories;
    result.category.name = newName;

    this._saveCategories(allCategories);
    return { success: true };
  }

  // ! ==================== DELETE ====================
  deleteCategory(id: string) {
    const result = this._findCategoryById(id);

    if (!result) return { error: 'Categoria não localizada.' };

    const allCategories = result.allCategories;
    const group = result.group;

    group.categories = group.categories.filter((c) => c.id !== id);

    this._saveCategories(allCategories);
    return { success: true };
  }
}
