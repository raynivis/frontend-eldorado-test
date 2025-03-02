import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent , RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eldorado-gerenciador';
  isAuthenticated = false; 

  onLoginSuccess() {
    this.isAuthenticated = true; 
  }

  logout() {
    this.isAuthenticated = false; 
  }
}
