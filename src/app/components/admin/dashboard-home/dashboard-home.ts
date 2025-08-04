import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/admin/dashboard-service';

@Component({
  selector: 'app-dashboard-home',
  imports: [],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css'
})
export class DashboardHome implements OnInit {
  private adminDashboardService = inject(DashboardService);
  users = this.adminDashboardService.users;
  subunits = this.adminDashboardService.subunits;
  attendances = this.adminDashboardService.attendances;

  async ngOnInit(): Promise<void> {
    if (this.adminDashboardService.users().length === 0) await this.adminDashboardService.getUsers()
    if (this.adminDashboardService.attendances().length === 0) await this.adminDashboardService.getAttendanceHistories()
    if (this.adminDashboardService.rooms().length === 0) await this.adminDashboardService.getRooms()
  }

  get getClockInStats(): { early: number; late: number } {
    let early = 0;
    let late = 0;

    const data = this.attendances()
    for (const entry of data) {
      if (!entry.clockInTime) continue;

      const date = new Date(entry.clockInTime);

      // Adjust to Nigerian time (UTC+1). If your server already stores in local time, remove this line.
      // date.setHours(date.getHours() + 1);

      const hours = date.getHours();
      const minutes = date.getMinutes();

      if (hours < 8 || (hours === 8 && minutes < 30)) {
        early++;
      } else {
        late++;
      }
    }

    return { early, late };
  }
}
