import { Component, inject, OnInit, signal } from '@angular/core';
import { Attendance } from '../../../interfaces/attendance.interface';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';

@Component({
  selector: 'app-attendance-history',
  imports: [],
  templateUrl: './attendance-history.html',
  styleUrl: './attendance-history.css'
})
export class AttendanceHistory implements OnInit{
  private dashboardService = inject(DashboardService);
  statuses = ['late', 'on time', 'absent']

  attendances = this.dashboardService.attendances

  async ngOnInit () {
    await this.dashboardService.getAttendance();
  }
}
