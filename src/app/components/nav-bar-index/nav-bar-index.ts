import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar-index',
  imports: [],
  templateUrl: './nav-bar-index.html',
  styleUrl: './nav-bar-index.css'
})
export class NavBarIndex {
    @ViewChild('expandedNavBar') side_nav !: ElementRef<HTMLDivElement>;
    private router = inject(Router)
    
    toggleNavBarVisibility() {
        this.side_nav.nativeElement.classList.toggle('opened')
    }

    navigateToAuthPage() {
        this.router.navigate(['/auth'])
    }
}
