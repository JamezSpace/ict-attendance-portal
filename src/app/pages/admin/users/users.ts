import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DashboardService } from '../../../services/admin/dashboard-service';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialog } from '../../../components/dialogs/new-user-dialog/new-user-dialog';

@Component({
    selector: 'app-users',
    imports: [MatInputModule, MatFormFieldModule, MatIconModule],
    templateUrl: './users.html',
    styleUrl: './users.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Users {
    private adminDashboardService = inject(DashboardService);
    users = this.adminDashboardService.users
    readonly dialog = inject(MatDialog);

    openDialog(): void {
        const dialogRef = this.dialog.open(NewUserDialog, {
            data: { openedBy: 'admin' }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The new user dialog was closed');
        });
    }
}
