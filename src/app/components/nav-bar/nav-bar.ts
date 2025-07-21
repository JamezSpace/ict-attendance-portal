import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [ RouterModule ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {
  private router = inject(Router)
  @ViewChild('expandedNavBar') side_nav !: ElementRef<HTMLDivElement>;

  toggleNavBarVisibility() {
    this.side_nav.nativeElement.classList.toggle('opened');
  }

  logout() {
    // call service mothod to logout
    

    // close nav bar afterwards
    this.toggleNavBarVisibility()
  }

  get isHomeRoute(): boolean {
    return this.router.url === '/' || this.router.url === '/auth';
  }
}
