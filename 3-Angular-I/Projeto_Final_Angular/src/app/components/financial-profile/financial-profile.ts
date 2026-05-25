import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TIPO } from '../../app';

@Component({
  selector: 'app-financial-profile',
  imports: [CommonModule],
  templateUrl: './financial-profile.html',
  styleUrl: './financial-profile.css',
})
export class FinancialProfile {
  // ! ========== DEFAULT ========== TIPO TRANSAÇÃO ==========
  tipoReceita = TIPO.RECEITA;
  tipoDespesa = TIPO.DESPESA;

  // ! ========== PERFIL ==========

  get profile() {
    return [
      {
        range: 0.3,
        name: 'Conservador',
      },
      {
        range: 0.5,
        name: 'Moderado',
      },
      {
        range: 0.8,
        name: 'Arrojado',
      },
    ];
  }
}
