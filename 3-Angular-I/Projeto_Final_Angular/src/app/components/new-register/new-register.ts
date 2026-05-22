import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TIPO } from '../../app';

@Component({
  selector: 'app-new-register',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './new-register.html',
  styleUrl: './new-register.css',
})
export class NewRegister {
  // ! ========== DEFAULT ========== TIPO TRANSAÇÃO ==========
  tipoReceita = TIPO.RECEITA;
  tipoDespesa = TIPO.DESPESA;

  // ! ========== LINK COM APP ========== FECHAR O COMPONENTE NEW-REGISTER ==========
  @Output() closeRegister = new EventEmitter();
  value: any;

  offRegisterClick() {
    return this.closeRegister.emit();
  }

  // ! ========== EM CONSTRUÇÃO ==========
}
