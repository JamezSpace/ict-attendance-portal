import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { DashboardService } from '../../../services/users/dashboard-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Guests, GuestTypes } from '../../../interfaces/visitors.interface';


@Component({
  selector: 'app-visitors',
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './visitors.html',
  styleUrl: './visitors.css'
})
export class Visitors implements OnInit {
  private dashboardService = inject(DashboardService);
  guests = this.dashboardService.guests

  async ngOnInit() {
    if(!this.dashboardService.guests()) this.dashboardService.getGuests()
  }

  guestTypes = [
    {
      value: null,
      viewValue: '- '.repeat(5)
    },
    {
      value: GuestTypes.teenager,
      viewValue: 'Teenager'
    },
    {
      value: GuestTypes.adult,
      viewValue: 'Adult'
    }
  ]

  selectedTeenager = signal(false)
  toggleSelectedValue(event: any) {
    this.selectedTeenager.set(!this.selectedTeenager())
  }
}
