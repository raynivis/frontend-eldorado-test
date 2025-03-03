import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly router = inject(Router);

  home(){
    this.router.navigate(['']);
  }

}
