import { Routes } from '@angular/router';
import { Auth } from './pages/auth/auth';
import { Dashboard } from './pages/dashboard/dashboard';
import { DashboardHome } from './components/dashboard-home/dashboard-home';
import { AttendanceHistory } from './components/attendance-history/attendance-history';

export const routes: Routes = [
    {
        path: '',
        component: Auth
    },
    {
        path: 'dashboard',
        component: Dashboard,
        children: [
            {
                path: '',
                component: DashboardHome
            },
            {
                path: 'attendance',
                component: AttendanceHistory
            }
        ]
    },
];
