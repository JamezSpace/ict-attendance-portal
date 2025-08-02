import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';
import { UserProfile } from '../../../interfaces/profile.interface';
import { IdCardDialog } from '../../../components/dialogs/id-card-dialog/id-card-dialog';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth/auth-service';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-profile',
    imports: [FormsModule, MatProgressSpinnerModule],
    templateUrl: './profile.html',
    styleUrl: './profile.css'
})
export class Profile implements OnInit {
    private dashboardService = inject(DashboardService);
    readonly dialog = inject(MatDialog);
    user_profile = AuthService.userLoggedIn

    ngOnInit(): void {
        effect(() => {
            // only run when userLoaded is true
            if (AuthService.userLoaded()) {
                const user = this.user_profile();
                if (user && user.subunitId) {
                    console.log(user);
                    
                    this.dashboardService.getProfileData(user.subunitId);
                } else {
                    console.warn('User or subunitId missing');
                }
            }
        });
    }

    editMode = signal(false);
    toggleEditMode() {
        this.editMode.set(!this.editMode())
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

    province = ''
    region = ''
    firstName = this.user_profile()?.firstName
    lastName = this.user_profile()?.lastName
    async editUserData() {
        this.loading.set(true);
        await this.dashboardService.editUser({
            province: this.province,
            region: this.region,
            firstName: this.firstName,
            lastName: this.lastName
        });

        this.loading.set(false);
        this.toggleEditMode();
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
