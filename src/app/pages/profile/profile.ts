import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard-service';
import { UserProfile } from '../../interfaces/profile.interface';
import { IdCardDialog } from '../../components/dialogs/id-card-dialog/id-card-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-profile',
    imports: [],
    templateUrl: './profile.html',
    styleUrl: './profile.css'
})
export class Profile implements OnInit {
    private dashboardService = inject(DashboardService);
    readonly dialog = inject(MatDialog);
    user_profile = signal<UserProfile | null>({
        _id: 'a',
        email: 'sam@abc',
        gender: 'female',
        name: 'sarah',
        province: 'lp109',
        region: 'rg37',
        role: 'executive',
        subunit: 'technical',
        passport_url: 'url'
    });

    async ngOnInit(): Promise<void> {
        await this.dashboardService.getProfileData();
    }

    editMode = signal(false);
    toggleEditMode() {
        this.editMode.set(!this.editMode())
    }

    generateId() {
        if(!this.user_profile()) return 

        const dialogRef = this.dialog.open(IdCardDialog, {
            data: this.user_profile(),
            panelClass: 'dialog-responsive'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The id card dialog was closed');
        });
    }
}
