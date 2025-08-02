import { Component, effect, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialog } from '../../../components/dialogs/new-user-dialog/new-user-dialog';
import { AuthService } from '../../../services/auth/auth-service';
import { Dashboard } from '../dashboard/dashboard';

@Component({
    selector: 'app-subunit-hub',
    imports: [MatTabsModule],
    templateUrl: './subunit-hub.html',
    styleUrl: './subunit-hub.css'
})
export class SubunitHub implements OnInit {
    private dashboardService = inject(DashboardService);
    readonly dialog = inject(MatDialog);
    members = this.dashboardService.subunit_members;
    teams = this.dashboardService.subunit_teams;
    user_profile = Dashboard.userLoggedIn;

    async ngOnInit(): Promise<void> {
        if(this.dashboardService.complete_profile_loaded()) return
        
        const subunitId = this.user_profile()?.subunitId
        if (subunitId) {
            await this.dashboardService.getProfileData(subunitId)
            
            // loaded complete profile notif
            this.dashboardService.complete_profile_loaded.set(!this.dashboardService.complete_profile_loaded())
        }
    }

    addNewUser() {
        const dialogRef = this.dialog.open(NewUserDialog, {
            data: {
                openedBy: 'subunitLeader',
                subunitId: this.user_profile()?.subunitId
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The new user dialog was closed');
        });

    }
}
