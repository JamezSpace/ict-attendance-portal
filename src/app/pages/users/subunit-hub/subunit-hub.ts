import { Component, effect, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialog } from '../../../components/dialogs/new-user-dialog/new-user-dialog';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
    selector: 'app-subunit-hub',
    imports: [MatTabsModule],
    templateUrl: './subunit-hub.html',
    styleUrl: './subunit-hub.css'
})
export class SubunitHub implements OnInit {
    private dashboardService = inject(DashboardService);
    readonly dialog = inject(MatDialog);
    readonly authService = inject(AuthService);
    members = this.dashboardService.subunit_members;
    teams = this.dashboardService.subunit_teams;
    user_profile = AuthService.userLoggedIn;

    async ngOnInit(): Promise<void> {
        
        await this.authService.loadUserFromToken()

        effect(() => {
            // only run when userLoaded is true
            if (AuthService.userLoaded()) {
                const user = this.user_profile();
                if (user && user.subunitId) {
                    this.dashboardService.loadProfileData(user.subunitId);
                } else {
                    console.warn('User or subunitId missing');
                }
            }
        });
    }

    addNewUser() {
        const dialogRef = this.dialog.open(NewUserDialog, {
            data: { openedBy: 'subunitLeader' }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The new user dialog was closed');
        });

    }
}
