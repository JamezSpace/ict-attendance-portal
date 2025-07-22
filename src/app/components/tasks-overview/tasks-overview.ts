import { Component, computed, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard-service';

@Component({
  selector: 'app-tasks-overview',
  imports: [],
  templateUrl: './tasks-overview.html',
  styleUrl: './tasks-overview.css'
})
export class TasksOverview implements OnInit {
    private dashboardService = inject(DashboardService);
    tasks = this.dashboardService.tasks
    total_tasks = computed(() => {
        return this.tasks().length
    })
    completed_tasks = computed(() => {
        return this.tasks().filter(task => task.status === 'completed').length
    })
    unfulfilled_tasks = computed(() => {
        return this.tasks().filter(task => task.status !== 'completed').length
    })

    async ngOnInit () {
        await this.dashboardService.getTasks()
    }
}
