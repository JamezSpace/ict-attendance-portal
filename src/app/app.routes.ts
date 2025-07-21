import { Routes } from '@angular/router';
import { Auth } from './pages/auth/auth';
import { Dashboard } from './pages/dashboard/dashboard';
import { DashboardHome } from './components/dashboard-home/dashboard-home';
import { AttendanceHistory } from './components/attendance-history/attendance-history';
import { Visitors } from './components/visitors/visitors';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
    {
        path: 'auth',
        component: Auth
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: DashboardHome
            },
            {
                path: 'attendance',
                component: AttendanceHistory
            },
            {
                path: 'visitors',
                component: Visitors
            },
            // {
            //     path: 'me',
            //     component: 
            // }
        ]
    },
];
