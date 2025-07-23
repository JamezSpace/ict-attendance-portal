import { Component, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard-service';

@Component({
  selector: 'app-id-card',
  imports: [],
  templateUrl: './id-card.html',
  styleUrl: './id-card.css'
})
export class IdCard {
    private dashboardService = inject(DashboardService);

    get genderInitial() {
        if(this.dashboardService.profile_data() && this.dashboardService.profile_data()?.gender === 'male') return 'm'
        else if(this.dashboardService.profile_data() && this.dashboardService.profile_data()?.gender === 'female') return 'f'
        else return 'a'
    }
}
