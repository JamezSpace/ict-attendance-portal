import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/admin/dashboard-service';

@Component({
  selector: 'app-subunits',
  imports: [],
  templateUrl: './subunit.html',
  styleUrl: './subunit.css'
})
export class Subunits {
    private adminDashboardService = inject(DashboardService);
    subunits = this.adminDashboardService.subunits
}
