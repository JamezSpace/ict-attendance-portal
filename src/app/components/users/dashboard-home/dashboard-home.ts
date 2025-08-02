import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';
import { TasksOverview } from "../tasks-overview/tasks-overview";
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileDialog } from '../../dialogs/update-profile-dialog/update-profile-dialog';
import { AuthService } from '../../../services/auth/auth-service';

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

  user = this.dashboardService.profile_data;
  userData = AuthService.userLoggedIn;
  previous_attendances = this.dashboardService.attendances()

  async ngOnInit(): Promise<void> {    
    if (this.dashboardService.complete_profile_loaded()) return

    const subunitId = this.user_profile()?.subunitId
    if (subunitId) {
      await this.dashboardService.getProfileData(subunitId)

      // loaded complete profile notif
      this.dashboardService.complete_profile_loaded.set(!this.dashboardService.complete_profile_loaded())
    }
  }

  get todayDay() {
    return this.previous_attendances[this.previous_attendances.length - 1].day + 1
  }

  get currentDate() {
    return new Date().toLocaleDateString('en-NG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  //   currentTime: WritableSignal<string>;

  //   private intervalId: any;

  //   constructor() {
  //     this.currentTime = signal(new Date().toLocaleTimeString());

  //     this.intervalId = setInterval(() => {
  //       this.currentTime.set(new Date().toLocaleTimeString());
  //     }, 1000);

  //     this.dashboardService.getAttendance()

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

  user_profile = this.dashboardService.profile_data
  openUpdateProfileData() {
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
}
