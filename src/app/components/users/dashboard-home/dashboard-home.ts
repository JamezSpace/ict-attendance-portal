import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';
import { TasksOverview } from "../tasks-overview/tasks-overview";
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileDialog } from '../../dialogs/update-profile-dialog/update-profile-dialog';
import { Dashboard } from '../../../pages/users/dashboard/dashboard';

@Component({
    selector: 'app-dashboard-home',
    imports: [TasksOverview],
    templateUrl: './dashboard-home.html',
    styleUrl: './dashboard-home.css'
})
export class DashboardHome implements OnInit {
    private dashboardService = inject(DashboardService)
    readonly dialog = inject(MatDialog);
    private router = inject(Router);

    userData = Dashboard.userLoggedIn;
    previous_attendances = this.dashboardService.attendance_history()
    user_profile = this.dashboardService.profile_data

    async ngOnInit(): Promise<void> {
        this.dashboardService.getAttendanceHistory()    
    }

    get currentDate() {
        return new Date().toLocaleDateString('en-NG', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    referenceDate = "2025-08-03";

    get dayOfConvention(): number {
        const today = new Date();
        const inputDate = new Date(this.referenceDate);

        // Normalize both dates to midnight (ignore time part)
        today.setHours(0, 0, 0, 0);
        inputDate.setHours(0, 0, 0, 0);

        const diffInMs = inputDate.getTime() - today.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        return diffInDays + 1;
    }



    //   currentTime: WritableSignal<string>;

    //   private intervalId: any;

    //   constructor() {
    //     this.currentTime = signal(new Date().toLocaleTimeString());

    //     this.intervalId = setInterval(() => {
    //       this.currentTime.set(new Date().toLocaleTimeString());
    //     }, 1000);

    //     this.dashboardService.getAttendanceHistory()

    //   }

    //   ngOnDestroy(): void {
    //     clearInterval(this.intervalId); // cleanup to avoid memory leak
    //   }

    signedIn = signal(true);
    signInStatusText = computed(() => {
        return this.signedIn() ? 'You clocked in today at 8:12AM' : "You haven't clocked in yet"
    })
    signInActionText = computed(() => {
        return this.signedIn() ? 'clock out' : 'clock in'
    })
    // officeTiming = {
    //   start_time: new Date().toLocaleTimeString('en-NG', {
    //     hour: 'numeric',
    //     minute: '2-digit',
    //     hour12: true
    //   }),
    //   end_time: new Date().toLocaleTimeString('en-NG', {
    //     hour: 'numeric',
    //     minute: '2-digit',
    //     hour12: true
    //   })
    // }

    navigateToAttendance() {
        this.router.navigate(['dashboard/attendance']);
    }

    openUpdateProfileData() {
        const dialogRef = this.dialog.open(UpdateProfileDialog, {
            data: {
                firstName: this.userData()?.firstName,
                lastName: this.userData()?.lastName,
                gender: this.userData()?.gender
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The update dialog dialog was closed');
        });
    }
}
