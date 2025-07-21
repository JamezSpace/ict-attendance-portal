import { Injectable, signal } from '@angular/core';
import { Environment } from '../../environments/environment';
import { Attendance } from '../../interfaces/attendance.interface';
import { Guests } from '../../interfaces/visitors.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor() { }

  accessToken = localStorage.getItem('access_token')
  attendances = signal<Attendance[]>([])
  guests = signal<Guests[]>([])

  async getAttendance() {
    try {
      const response = await fetch(`${Environment.backend_url}/attendance`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })

      const result = await response.json();

      if (result.status === 'success') {
        this.attendances.set(result.data);
      } else {
        console.error('Failed to fetch attendances:', result.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  }

  async getGuests() {
    try {
      const response = await fetch(`${Environment.backend_url}/guests`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      })

      const result = await response.json();

      if (result.status === 'success') {
        this.guests.set(result.data);
      } else {
        console.error('Failed to fetch guest:', result.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  }
}
