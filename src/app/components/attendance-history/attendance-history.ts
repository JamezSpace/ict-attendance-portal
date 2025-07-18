import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-attendance-history',
  imports: [],
  templateUrl: './attendance-history.html',
  styleUrl: './attendance-history.css'
})
export class AttendanceHistory {
  statuses = ['late', 'on time', 'absent']

  attendances = signal([
    {
      _id: 1,
      day: 'monday',
      in: new Date().toLocaleDateString(),
      out: new Date().toLocaleDateString(),
      duration: '3 hours',
      status: 'on time'
    }
  ])
}
