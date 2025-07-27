import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { NavBar } from "../../../components/nav-bar/nav-bar";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NavBar, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  
}
