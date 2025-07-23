import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard-service';
import { UserProfile } from '../../interfaces/profile.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  private dashboardService = inject(DashboardService);
  private router = inject(Router)
  user_profile = signal<UserProfile | null>({
    _id: 'a',
    email: 'sam@abc',
    gender: 'female',
    name: 'sarah',
    province: 'lp109',
    region: 'rg37',
    role: 'executive',
    subunit: 'technical'
  });

  async ngOnInit(): Promise<void> {
    await this.dashboardService.getProfileData();
  }

  editMode = signal(false);
  toggleEditMode() {
    this.editMode.set(!this.editMode())
  }

  generateId() {
    this.router.navigate(['/dashboard/id'])
  }
}
