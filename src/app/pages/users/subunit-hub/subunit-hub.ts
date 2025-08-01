import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialog } from '../../../components/dialogs/new-user-dialog/new-user-dialog';

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

  async ngOnInit(): Promise<void> {
    await this.dashboardService.getSubunitMembers();
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
