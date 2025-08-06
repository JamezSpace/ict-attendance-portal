import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService as UserDashboardService} from '../../../services/users/dashboard/dashboard-service';
import { DashboardService as AdminDashboardService} from '../../../services/admin/dashboard-service';
import { IdCardDialog } from '../../../components/dialogs/id-card-dialog/id-card-dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UpdateProfileDialog } from '../../../components/dialogs/update-profile-dialog/update-profile-dialog';
import { Router } from '@angular/router';
import { UserProfile } from '../../../interfaces/profile.interface';

@Component({
    selector: 'app-profile',
    imports: [FormsModule, MatProgressSpinnerModule],
    templateUrl: './profile.html',
    styleUrl: './profile.css'
})
export class Profile implements OnInit {
    private userDashboardService = inject(UserDashboardService);
    private adminDashboardService = inject(AdminDashboardService);
    readonly dialog = inject(MatDialog);
    private router = inject(Router);
    user_profile = signal<UserProfile | null>(null);
    user_profile_with_subunit = signal<UserProfile | null>(null);

    ngOnInit(): void {
        const url = this.router.url;

        // Example: Toggle user_profile based on previousUrl
        if (url && url.includes('/admin')) {
            this.user_profile = this.adminDashboardService.profile_data;
        } else {
            this.user_profile = this.userDashboardService.profile_data;
            this.user_profile_with_subunit = this.userDashboardService.profile_data_with_subunit;
        }
    }

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
            data: this.user_profile_with_subunit(),
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

    async changeProfilePic() {
        if (!this.selectedFile) return;

        this.loading.set(!this.loading())
        const formData = new FormData();
        formData.append('avatar', this.selectedFile); // 'avatar' should match the backend field

        await this.userDashboardService.updateProfile(formData)
        this.loading.set(!this.loading())
    }
}
