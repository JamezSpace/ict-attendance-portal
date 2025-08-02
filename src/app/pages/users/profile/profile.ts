import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';
import { UserProfile } from '../../../interfaces/profile.interface';
import { IdCardDialog } from '../../../components/dialogs/id-card-dialog/id-card-dialog';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth/auth-service';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Dashboard } from '../dashboard/dashboard';
import { UpdateProfileDialog } from '../../../components/dialogs/update-profile-dialog/update-profile-dialog';

@Component({
    selector: 'app-profile',
    imports: [FormsModule, MatProgressSpinnerModule],
    templateUrl: './profile.html',
    styleUrl: './profile.css'
})
export class Profile implements OnInit {
    private dashboardService = inject(DashboardService);
    readonly dialog = inject(MatDialog);
    user_profile = this.dashboardService.profile_data

    async ngOnInit(): Promise<void> {
        if (this.dashboardService.complete_profile_loaded()) return

        const subunitId = this.user_profile()?.subunitId
        if (subunitId) {
            await this.dashboardService.getProfileData(subunitId)

            // loaded complete profile notif
            this.dashboardService.complete_profile_loaded.set(!this.dashboardService.complete_profile_loaded())
        }
    }

    openUpdateUserDialog() {
        const dialogRef = this.dialog.open(UpdateProfileDialog, {
            data: {
                firstName: this.user_profile()?.firstName,
                lastName: this.user_profile()?.lastName
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
