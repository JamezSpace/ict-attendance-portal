import { Component, ElementRef, inject, Input, signal, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth/auth-service';

interface NavMenu {
    route: string;
    name: string;
}

@Component({
    selector: 'app-nav-bar',
    imports: [RouterModule, MatMenuModule],
    templateUrl: './nav-bar.html',
    styleUrl: './nav-bar.css'
})
export class NavBar {
    private router = inject(Router)
    private authService = inject(AuthService)
    @ViewChild('expandedNavBar') side_nav !: ElementRef<HTMLDivElement>;

    //   nav_menus = [
    //     {
    //       route: '/dashboard',
    //       name: 'overview'
    //     },
    //     {
    //       route: '/dashboard/attendance',
    //       name: 'attendance'
    //     },
    //     {
    //       route: '/dashboard/visitors',
    //       name: 'my visitors'
    //     },
    //     {
    //       route: '/dashboard/me',
    //       name: 'my profile'
    //     }
    //   ]

    @Input('dashboard')
    dashboard: string = 'user';

    get nav_menus(): NavMenu[] {
        if (this.dashboard === 'user')
            return [
                {
                    route: '/dashboard',
                    name: 'overview'
                },
                {
                    route: '/dashboard/attendance',
                    name: 'attendance'
                },
                {
                    route: '/dashboard/visitors',
                    name: 'my visitors'
                },
                // {
                //     route: '/dashboard/me',
                //     name: 'my profile'
                // }
                {
                    route: '/dashboard/subunit',
                    name: 'subunit hub'
                }
            ]
        else 
            return [
                {
                    route: '/admin',
                    name: 'Overview'
                },
                {
                    route: '/admin/users',
                    name: 'users'
                },
                {
                    route: '/admin/visitors',
                    name: 'guests'
                },
                {
                    route: '/admin/teams',
                    name: 'teams'
                },
                {
                    route: '/admin/tasks',
                    name: 'tasks'
                },
                {
                    route: '/admin/attendance',
                    name: 'attendance'
                }
            ]
    }


    logout() {
        this.authService.logout()
        this.router.navigate(['/auth'])
    }

    toggleProfileView() {
        this.router.navigate(['/dashboard/me'])
    }

    toggleNavBarVisibility() {
        this.side_nav.nativeElement.classList.toggle('opened')
    }

    get isHomeRoute(): boolean {
        return this.router.url === '/' || this.router.url === '/auth' || this.router.url === '/admin-auth';
    }
}
