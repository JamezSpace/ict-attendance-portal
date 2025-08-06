import { Component, ElementRef, inject, Input, signal, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth/auth-service';
import { Dashboard } from '../../pages/users/dashboard/dashboard';

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
    userLoggedIn = Dashboard.userLoggedIn;
    @ViewChild('expandedNavBar') side_nav !: ElementRef<HTMLDivElement>;

    @Input('dashboard')
    dashboard: string = 'user';

    get nav_menus(): NavMenu[] {
        let user_navs = [
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
                {
                    route: '/dashboard/me',
                    name: 'my profile'
                },
                {
                    route: '/dashboard/subunit',
                    name: 'subunit hub'
                }
            ]
        if (this.dashboard === 'user') {
            if(this.userLoggedIn()?.isSubunitLeader) return user_navs
            else {
                user_navs.pop()
                return user_navs
            }
        } else 
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
                    route: '/admin/subunits',
                    name: 'subunits'
                },
                {
                    route: '/admin/tasks',
                    name: 'tasks'
                },
                {
                    route: '/admin/attendance',
                    name: 'attendance'
                }, 
                {
                    route: '/admin/me',
                    name: 'profile'
                }
            ]
    }


    logout() {
        this.authService.logout()
        if(this.dashboard === 'user') this.router.navigate(['/auth'])
        else this.router.navigate(['/admin-auth'])
    }

    toggleProfileView() {
        this.router.navigate(['/dashboard/me'])
    }

    toggleAdminProfileView() {
        this.router.navigate(['/admin/me'])
    }

    toggleNavBarVisibility() {
        this.side_nav.nativeElement.classList.toggle('opened')
    }

    get isHomeRoute(): boolean {
        return this.router.url === '/' || this.router.url === '/auth' || this.router.url === '/admin-auth';
    }
}
