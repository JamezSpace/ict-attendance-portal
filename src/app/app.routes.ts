import { Routes } from '@angular/router';
import { AttendanceHistory } from './pages/users/attendance-history/attendance-history';
import { DashboardHome as UserDashboardHome } from './components/users/dashboard-home/dashboard-home';
import { DashboardHome as AdminDashboardHome } from './components/admin/dashboard-home/dashboard-home';
import { Visitors as UserVisitors } from './pages/users/visitors/visitors';
import { Visitors as AdminVisitors } from './pages/admin/visitors/visitors';
import { Dashboard as AdminDashboard } from './pages/admin/dashboard/dashboard';
import { Auth } from './pages/auth/user-auth/auth';
import { Dashboard as UserDashboard } from './pages/users/dashboard/dashboard';
import { Profile } from './pages/users/profile/profile';
import { authGuard } from './guard/auth-guard';
import { Users } from './pages/admin/users/users';
import { Teams } from './pages/admin/teams/teams';
import { Tasks } from './pages/admin/tasks/tasks';
import { Attendance } from './pages/admin/attendance/attendance';
import { Index } from './pages/index';
import { AdminAuth } from './pages/auth/admin-auth/admin-auth';
import { SubunitHub } from './pages/users/subunit-hub/subunit-hub';

export const routes: Routes = [
    {
        path: '',
        component: Index
    },
    {
        path: 'auth',
        component: Auth
    },
    {
        path: 'admin-auth',
        component: AdminAuth
    },
    {
        path: 'dashboard',
        component: UserDashboard,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: UserDashboardHome
            },
            {
                path: 'attendance',
                component: AttendanceHistory
            },
            {
                path: 'visitors',
                component: UserVisitors
            },
            {
                path: 'me',
                component: Profile
            },
            {
                path: 'subunit',
                component: SubunitHub
            }
        ]
    },
    {
        path: 'admin',
        component: AdminDashboard,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: AdminDashboardHome
            },
            {
                path: 'users',
                component: Users
            },
            {
                path: 'visitors',
                component: AdminVisitors
            },
            {
                path: 'teams',
                component: Teams
            },
            {
                path: 'tasks',
                component: Tasks
            },
            {
                path: 'attendance',
                component: Attendance
            }
        ]
    }
];
