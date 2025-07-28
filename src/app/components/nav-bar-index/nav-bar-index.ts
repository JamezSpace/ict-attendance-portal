import { ViewportScroller } from '@angular/common';
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
    private scroller = inject(ViewportScroller)

    toggleNavBarVisibility() {
        this.side_nav.nativeElement.classList.toggle('-top-11/12')
        this.side_nav.nativeElement.classList.toggle('custom-box-shadow')
    }

    navigateToSection(id: string) {
        this.scrollToTarget(id)

        this.toggleNavBarVisibility()
    }

    navigateToAuthPage() {
        this.router.navigate(['/auth'])
    }

    scrollToTarget(element_id: string) {
        this.scroller.scrollToAnchor(element_id, {behavior: 'smooth'});
    }
}
