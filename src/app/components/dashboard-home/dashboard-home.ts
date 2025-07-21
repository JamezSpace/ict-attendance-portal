import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard/dashboard-service';

@Component({
  selector: 'app-dashboard-home',
  imports: [],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css'
})
export class DashboardHome {
  private router = inject(Router);
  private dashboardService = inject(DashboardService)

  username = signal('sarah');
  previous_attendances = this.dashboardService.attendances()

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

  currentTime: WritableSignal<string>;

  private intervalId: any;

  constructor() {
    this.currentTime = signal(new Date().toLocaleTimeString());

    this.intervalId = setInterval(() => {
      this.currentTime.set(new Date().toLocaleTimeString());
    }, 1000);

    this.dashboardService.getAttendance()

  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // cleanup to avoid memory leak
  }

  signedIn = signal(true);
  signInStatusText = computed(() => {
    return this.signedIn() ? 'You signed in today at 8:12AM' : "You haven't signed in yet"
  })
  signInActionText = computed(() => {
    return this.signedIn() ? 'sign out' : 'sign in'
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
}
