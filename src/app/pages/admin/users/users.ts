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
export class Users implements OnInit {
    private adminDashboardService = inject(DashboardService);
    users = this.adminDashboardService.users
    readonly dialog = inject(MatDialog);

    async ngOnInit() {
        if (!this.adminDashboardService.users()) await this.adminDashboardService.getUsers()
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(NewUserDialog, {
            data: { name: this.name(), animal: this.animal() },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result !== undefined) {
                this.animal.set(result);
            }
        });
    }
}
