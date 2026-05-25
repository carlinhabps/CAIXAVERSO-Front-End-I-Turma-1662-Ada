export interface TypeCategory {
  id: string;
  name: string;
}

export interface TypeCategoryGroup {
  type: string;
  categories: TypeCategory[];
}
