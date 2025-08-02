import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialog } from '../../../components/dialogs/new-user-dialog/new-user-dialog';
import { Dashboard } from '../dashboard/dashboard';

@Component({
    selector: 'app-subunit-hub',
    imports: [MatTabsModule],
    templateUrl: './subunit-hub.html',
    styleUrl: './subunit-hub.css'
})
export class SubunitHub {
    private dashboardService = inject(DashboardService);
    readonly dialog = inject(MatDialog);
    members = this.dashboardService.subunit_members;
    teams = this.dashboardService.subunit_teams;
    user_profile = Dashboard.userLoggedIn;

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
