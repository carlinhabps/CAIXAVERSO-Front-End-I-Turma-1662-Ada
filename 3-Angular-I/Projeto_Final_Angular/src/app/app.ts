import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SummaryCards } from './components/summary-cards/summary-cards';
import { Filter } from './components/filter/filter';
import { NewRegister } from './components/new-register/new-register';
import { Content } from './components/content/content';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, SummaryCards, Filter, NewRegister, Content],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  ngOnInit(): void {
    console.log('Content importado?', Content);

    const theme = localStorage.getItem('tema');
    if (theme === 'dark') {
      document.body.classList.add('dark');
    }
  }

  // ! --------------- TEMA DA TELA ---------------

  buttonTheme = 'assets/icons/day-and-night-1.png';

  toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('tema', isDark ? 'dark' : 'light');
    this.buttonTheme = isDark
      ? 'assets/icons/day-and-night-2.png'
      : 'assets/icons/day-and-night-1.png';
  }

  // ! --------------- PERFIL DE CONSULTA ---------------

  // userProfile = [
  //   {
  //     id: uuidv4(),
  //     name: this.personName,
  //   },
  // ];

  personName = 'Carla Beatriz';
}
