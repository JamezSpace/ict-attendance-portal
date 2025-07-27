import { Component, inject, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Guests } from '../../../interfaces/visitors.interface';
import { DashboardService } from '../../../services/admin/dashboard-service';

@Component({
  selector: 'app-visitors',
  imports: [MatSelectModule, MatFormFieldModule],
  templateUrl: './visitors.html',
  styleUrl: './visitors.css'
})
export class Visitors implements OnInit{
    selectedDay!: string;
    selectedStatus!: 'opened'|'closed';
    private adminDashboardService = inject(DashboardService);
    guests = this.adminDashboardService.guests;

    async ngOnInit() {
        if(!this.adminDashboardService.guests()) await this.adminDashboardService.getGuests()
    }
}
