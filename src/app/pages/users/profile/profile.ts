import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';
import { IdCardDialog } from '../../../components/dialogs/id-card-dialog/id-card-dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UpdateProfileDialog } from '../../../components/dialogs/update-profile-dialog/update-profile-dialog';

@Component({
    selector: 'app-profile',
    imports: [FormsModule, MatProgressSpinnerModule],
    templateUrl: './profile.html',
    styleUrl: './profile.css'
})
export class Profile {
    private dashboardService = inject(DashboardService);
    readonly dialog = inject(MatDialog);
    user_profile = this.dashboardService.profile_data

    openUpdateUserDialog() {
        const dialogRef = this.dialog.open(UpdateProfileDialog, {
            data: {
                firstName: this.user_profile()?.firstName,
                lastName: this.user_profile()?.lastName,
                gender: this.user_profile()?.gender
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The update dialog dialog was closed');
        });
    }

    generateId() {
        if (!this.user_profile()) return

        const dialogRef = this.dialog.open(IdCardDialog, {
            data: this.user_profile(),
            panelClass: 'dialog-responsive'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The id card dialog was closed');
        });
    }

    loading = signal(false);
    selectedFile: File | null = null;

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.selectedFile = input.files[0];
            this.changeProfilePic(); // optionally call upload immediately
        }
    }

    changeProfilePic() {
        if (!this.selectedFile) return;

        const formData = new FormData();
        formData.append('avatar', this.selectedFile); // 'avatar' should match the backend field

        this.dashboardService.updateProfile(formData)
    }
}
