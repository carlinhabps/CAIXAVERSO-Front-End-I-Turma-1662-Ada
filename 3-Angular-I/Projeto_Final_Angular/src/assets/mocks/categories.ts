import { TypeCategoryGroup } from '../../app/models/category.types';
import { v4 as uuidv4 } from 'uuid';

export const CATEGORIES: TypeCategoryGroup[] = [
  {
    type: 'Receitas',
    categories: [
      {
        id: uuidv4(),
        name: 'Receita Fixa',
      },
      {
        id: uuidv4(),
        name: 'Receita Extra',
      },
    ],
  },
  {
    type: 'Despesas',
    categories: [
      {
        id: uuidv4(),
        name: 'Moradia',
      },
      {
        id: uuidv4(),
        name: 'Alimentação',
      },
      {
        id: uuidv4(),
        name: 'Saúde',
      },
      {
        id: uuidv4(),
        name: 'Lazer',
      },
    ],
  },
];
