import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content',
  imports: [CommonModule],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content {
  @Input() transactionList: any[] = [];
}
