import { AfterViewInit, Component, inject, signal, ViewChild } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialog } from '../../../components/dialogs/new-user-dialog/new-user-dialog';
import { Dashboard } from '../dashboard/dashboard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
    selector: 'app-subunit-hub',
    imports: [MatTabsModule, MatProgressSpinnerModule, MatPaginatorModule],
    templateUrl: './subunit-hub.html',
    styleUrl: './subunit-hub.css'
})
export class SubunitHub implements AfterViewInit {
    private dashboardService = inject(DashboardService);
    readonly dialog = inject(MatDialog);
    members = this.dashboardService.subunit_members;
    teams = this.dashboardService.subunit_teams;
    user_profile = Dashboard.userLoggedIn;
    loading = signal(false)

    // Pagination signals
    pagination = signal({
        total: 0,
        page: 0,
        limit: 10
    });

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    async loadPage(pageIndex: number, pageSize: number) {
        this.loading.set(true);
        const subunitId = this.user_profile()?.subunitId;
        if (!subunitId) return;

        const page = pageIndex + 1; // Backend expects 1-based index
        const result = await this.dashboardService.getSubunitMembers(subunitId, page, pageSize);
        if (result?.success) {
            this.pagination.set({
                total: result.pagination.total,
                page: result.pagination.page - 1, // Adjust to 0-based
                limit: result.pagination.limit
            });
        }
        this.loading.set(false);
    }

    onPageChange(event: any) {
        this.loadPage(event.pageIndex, event.pageSize);
    }

    async ngAfterViewInit(): Promise<void> {
        await this.loadPage(0, this.pagination().limit);
    }


    // async ngAfterViewInit(): Promise<void> {
    //     this.loading.set(!this.loading())
    //     const subunitId = this.user_profile()?.subunitId;

    //     if (subunitId)
    //         await this.dashboardService.getSubunitMembers(subunitId);
    //     this.loading.set(!this.loading())
    // }


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
