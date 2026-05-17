import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-content',
  imports: [],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content {
  transactionList = [
    {
      id: uuidv4(),
      description: 'descrição',
      type: 1,
      category: 'categoria',
      date: new Date(),
      value: 156.5,
    },
    {
      id: uuidv4(),
      description: 'descrição',
      type: 1,
      category: 'categoria',
      date: new Date(),
      value: 156.5,
    },
    {
      id: uuidv4(),
      description: 'descrição',
      type: 1,
      category: 'categoria',
      date: new Date(),
      value: 156.5,
    },
    {
      id: uuidv4(),
      description: 'descrição',
      type: 1,
      category: 'categoria',
      date: new Date(),
      value: 156.5,
    },
  ];
}
