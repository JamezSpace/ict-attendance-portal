import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/admin/dashboard-service';

@Component({
  selector: 'app-subunits',
  imports: [],
  templateUrl: './subunit.html',
  styleUrl: './subunit.css'
})
export class Subunits implements OnInit {
    private adminDashboardService = inject(DashboardService);
    subunits = this.adminDashboardService.subunits
    // subunits = [
    //     {
    //         team_lead: 'james',
    //         name: 'technical'
    //     }
    // ]

    async ngOnInit() {
        if(this.adminDashboardService.subunits().length === 0) await this.adminDashboardService.getSubunits()
    }
}
