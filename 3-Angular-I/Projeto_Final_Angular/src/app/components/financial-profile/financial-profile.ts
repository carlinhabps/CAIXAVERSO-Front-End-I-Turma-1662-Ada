import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-financial-profile',
  imports: [CommonModule],
  templateUrl: './financial-profile.html',
  styleUrl: './financial-profile.css',
})
export class FinancialProfile {
  // ! ========== PERFIL ==========
  selectedProfile = 'Moderado';

  get profile() {
    return [
      {
        range: 30,
        name: 'Conservador',
      },
      {
        range: 55,
        name: 'Moderado',
      },
      {
        range: 80,
        name: 'Arrojado',
      },
    ];
  }

  get selectedProfileData() {
    return this.profile.find((item) => item.name === this.selectedProfile);
  }

  selectProfile(profileName: string) {
    this.selectedProfile = profileName;
  }

  get message() {
    return [
      {
        id: 'success',
        message: `PARABÉNS!! ✨🎉 Baseado-se nos valores recebidos dentro do período selecionado, você já bateu a meta do valor a ser investido para o período, totalizando R$ XXX investidos.`,
      },
      {
        id: 'atention',
        message: `Baseado-se nos valores recebidos dentro do período selecionado, ainda é necessário realizar o investimento de R$ XXX, totalizando R$ XXX previsto para o período.`,
      },
      {
        id: 'danger',
        message: `ATENÇÃO!! ⚠️ Você já excedeu em R$ XXX a meta de valores pré-estabelecidos para esse mês.`,
      },
    ];
  }
}
