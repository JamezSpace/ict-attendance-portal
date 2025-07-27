import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/admin/dashboard-service';

@Component({
  selector: 'app-teams',
  imports: [],
  templateUrl: './teams.html',
  styleUrl: './teams.css'
})
export class Teams implements OnInit {
    private adminDashboardService = inject(DashboardService);
    // teams = this.adminDashboardService.teams
    teams = [
        {
            team_lead: 'james',
            name: 'technical'
        }
    ]

    async ngOnInit() {
        if(!this.adminDashboardService.teams()) await this.adminDashboardService.getTeams()
    }
}
