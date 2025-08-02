import { Component, inject, OnInit, signal } from '@angular/core';
import { Attendance } from '../../../interfaces/attendance.interface';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';

@Component({
  selector: 'app-attendance-history',
  imports: [],
  templateUrl: './attendance-history.html',
  styleUrl: './attendance-history.css'
})
export class AttendanceHistory implements OnInit {
  private dashboardService = inject(DashboardService);
  statuses = ['late', 'on time', 'absent']

  attendances = this.dashboardService.attendances

  async ngOnInit() {
    await this.dashboardService.getAttendance();
  }

  duration(timeIn: any, timeOut: any): string {
    const diffMs = new Date(timeOut).getTime() - new Date(timeIn).getTime();

    if (isNaN(diffMs) || diffMs < 0) {
      return "Invalid or negative time range";
    }

    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days > 0 ? days + "d " : ""}${hours}h ${minutes}m ${seconds}s`;
  }
  
}
