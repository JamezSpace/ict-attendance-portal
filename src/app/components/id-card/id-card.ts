import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard-service';
// import * as html2pdf from 'html2pdf.js';
import html2pdf from "html2pdf.js";

@Component({
  selector: 'app-id-card',
  imports: [],
  templateUrl: './id-card.html',
  styleUrl: './id-card.css'
})
export class IdCard {
  private dashboardService = inject(DashboardService);
  @ViewChild('frontPage', { static: false }) printCard!: ElementRef;


  get genderInitial() {
    if (this.dashboardService.profile_data() && this.dashboardService.profile_data()?.gender === 'male') return 'm'
    else if (this.dashboardService.profile_data() && this.dashboardService.profile_data()?.gender === 'female') return 'f'
    else return '--'
  }

  user_profile = this.dashboardService.profile_data()

  exportAsPDF() {
    const element = this.printCard.nativeElement;
    const opt = {
      margin: 0,
      filename: `${this.user_profile?.name}-id-card.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 6 },
      jsPDF: {
        unit: 'in',
        format: [4.25, 6.75], 
        orientation: 'portrait'
      }
    };

    html2pdf().from(element).set(opt).save();
  }
}
