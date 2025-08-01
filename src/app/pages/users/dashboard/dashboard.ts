import { Component, computed, OnInit, Signal, signal, WritableSignal } from '@angular/core';
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
    public userLoggedIn = signal<UserProfile | null>(null)

    async ngOnInit(): Promise<void> {
        const user = AuthService.userLoggedIn();
        if (user) {
            this.userLoggedIn.set(user);
        }
    }
}
