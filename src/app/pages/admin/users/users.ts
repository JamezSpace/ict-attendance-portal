import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DashboardService } from '../../../services/admin/dashboard-service';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialog } from '../../../components/dialogs/new-user-dialog/new-user-dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-users',
    imports: [MatInputModule, MatFormFieldModule, MatIconModule, MatPaginatorModule],
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

    pagination = this.adminDashboardService.pagination;
    async fetchUsers(page: number = 1, limit: number = 10): Promise<void> {
        try {
            await this.adminDashboardService.getUsers(page, limit);
        } catch (error) {
            console.error('Failed to fetch users in component:', error);
        }
    }

    onPageChange(event: PageEvent) {
        const page = event.pageIndex + 1;
        const limit = event.pageSize;
        this.fetchUsers(page, limit);
    }
}
