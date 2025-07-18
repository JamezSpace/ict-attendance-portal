import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  imports: [],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css'
})
export class DashboardHome {
  private router = inject(Router);

  username = signal('sarah');

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
  officeTiming = {
    start_time: new Date().toLocaleTimeString('en-NG', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }),
    end_time: new Date().toLocaleTimeString('en-NG', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  navigateToAttendance() {
    this.router.navigate(['dashboard/attendance']);
  }
}
