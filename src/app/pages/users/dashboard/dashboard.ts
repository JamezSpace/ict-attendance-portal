import { Component, inject, OnInit, signal } from '@angular/core';
import { NavBar } from "../../../components/nav-bar/nav-bar";
import { RouterModule } from '@angular/router';
import { UserProfile } from '../../../interfaces/profile.interface';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
    selector: 'app-dashboard',
    imports: [NavBar, RouterModule],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
    public static userLoggedIn = signal<UserProfile | null>(null)
    readonly authService = inject(AuthService);

    async ngOnInit(): Promise<void> {
        await this.authService.loadUserFromToken(); 
        const user = AuthService.userLoggedIn();
        if (user) Dashboard.userLoggedIn.set(user);
    }
}
