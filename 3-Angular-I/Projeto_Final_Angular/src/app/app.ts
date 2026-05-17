import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SummaryCards } from './components/summary-cards/summary-cards';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, SummaryCards],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  ngOnInit(): void {
    const theme = localStorage.getItem('tema');
    if (theme === 'dark') {
      document.body.classList.add('dark');
    }
    // localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
    //! usar quando for criar os perfis
  }

  buttonTheme = 'icons/day-and-night-1.png';

  toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('tema', isDark ? 'dark' : 'light');
    this.buttonTheme = isDark ? 'icons/day-and-night-2.png' : 'icons/day-and-night-1.png';
  }

  // userProfile = [
  //   {
  //     id: uuidv4(),
  //     name: this.personName,
  //   },
  // ];

  personName = 'Carla Beatriz';
}
