import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../../services/users/dashboard/dashboard-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { dayOfConvention } from '../../../utils/date.util';

@Component({
  selector: 'app-attendance-history',
  imports: [MatProgressSpinnerModule],
  templateUrl: './attendance-history.html',
  styleUrl: './attendance-history.css'
})
export class AttendanceHistory implements OnInit {
  private dashboardService = inject(DashboardService);
  statuses = ['late', 'on time', 'absent']

  attendances = this.dashboardService.attendance_history
  roomspaces= this.dashboardService.attendance_roomspaces
  clocked_in_today = signal(false);

  async ngOnInit() {
    // toggle loading 
    this.loading.set(!this.loading())

    // check if user clocked in
    if (localStorage.getItem('clocked_in') === 'true') this.clocked_in_today.set(true)
    else if (localStorage.getItem('clocked_in') === 'false') this.clocked_in_today.set(false)

    await this.dashboardService.getAttendanceHistory();
    await this.dashboardService.getAttendanceRooms()

    this.loading.set(!this.loading())
  }

  day_of_convention = dayOfConvention()
  getCurrentLocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
      }

      navigator.geolocation.getCurrentPosition(
        position => resolve(position.coords),
        error => reject(error),
        { enableHighAccuracy: true }
      );
    });
  }

  getDistanceFromLatLonInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Radius of the Earth in meters
    const toRad = (deg: number) => deg * (Math.PI / 180);

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // in meters
  }

  async toggleClockState() {
    try {
      const coords = await this.getCurrentLocation();
      const distance = this.getDistanceFromLatLonInMeters(
        coords.latitude,
        coords.longitude,
        this.validRoomLat,
        this.validRoomLong
      );

      if (distance > this.maxDistanceMeters) {
        alert(`You are not within the allowed location. Move closer to the attendance area.`);
        return;
      }

      if (!this.clocked_in_today()) {
        localStorage.setItem('clocked_in', 'true');
        await this.dashboardService.clockIn(this.day_of_convention);
      } else {
        this.dashboardService.clockOut(this.day_of_convention);
        localStorage.removeItem('clocked_in');
      }

    } catch (error) {
      alert("Failed to get location. Please enable GPS or grant permission.");
      console.error(error);
    }
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

  loading = signal(false);
}
