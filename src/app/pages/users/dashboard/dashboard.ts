import { Component, inject, OnInit, signal } from '@angular/core';
import { NavBar } from "../../../components/nav-bar/nav-bar";
import { RouterModule } from '@angular/router';
import { UserProfile } from '../../../interfaces/profile.interface';
import { AuthService } from '../../../services/auth/auth-service';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';

@Component({
    selector: 'app-dashboard',
    imports: [NavBar, RouterModule],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
    public static userLoggedIn = signal<UserProfile | null>(null)
    private authService = inject(AuthService);
    private dashboardService = inject(DashboardService);

    async ngOnInit(): Promise<void> {
        await this.authService.loadUserFromToken();
        const user = AuthService.userLoggedIn();
        if (user) Dashboard.userLoggedIn.set(user);

        const subunitId = user?.subunitId
        if (subunitId) {
            await this.dashboardService.getSubunitDetails(subunitId)

            // loaded complete profile notif
            this.dashboardService.complete_profile_loaded.set(!this.dashboardService.complete_profile_loaded())
        }
    }
}
