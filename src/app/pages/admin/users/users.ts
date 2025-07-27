import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DashboardService } from '../../../services/admin/dashboard-service';

@Component({
    selector: 'app-users',
    imports: [MatInputModule, MatFormFieldModule, MatIconModule],
    templateUrl: './users.html',
    styleUrl: './users.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Users implements OnInit {
    private adminDashboardService = inject(DashboardService);
    users = this.adminDashboardService.users

    async ngOnInit() {
        if(!this.adminDashboardService.users()) await this.adminDashboardService.getUsers()
    }
}
