import { Injectable, signal } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { Attendance } from '../../../interfaces/attendance.interface';
import { Guests } from '../../../interfaces/visitors.interface';
import { Tasks } from '../../../interfaces/tasks.interfaces';
import { UserProfile } from '../../../interfaces/profile.interface';
import { Users } from '../../../interfaces/users.interfaces';
import { Teams } from '../../../pages/admin/teams/teams';
import { AuthService } from '../../auth/auth-service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor() { }

    accessToken = localStorage.getItem('access_token')
    userLoggedIn = AuthService.userLoggedIn
    attendances = signal<Attendance[]>([])
    guests = signal<Guests[]>([])
    tasks = signal<Tasks[]>([])
    profile_data = signal<UserProfile | null>(null)
    subunit_members = signal<UserProfile[]>([])
    subunit_teams = signal<Teams[]>([])

    async getAttendance() {
        try {
            const response = await fetch(`${Environment.backend_api_url}/attendance`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const result = await response.json();

            if (result.success) {
                this.attendances.set(result.data);
            } else {
                console.error('Failed to fetch attendances:', result.message);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async getGuests() {
        try {
            const response = await fetch(`${Environment.backend_api_url}/guests`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const result = await response.json();

            if (result.success) {
                this.guests.set(result.data);
            } else {
                console.error('Failed to fetch guests:', result.message);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async getTasks() {
        try {
            setTimeout(() => {
                this.tasks.set([
                    {
                        _id: "1",
                        status: 'commenced',
                        task_details: "buy candy"
                    },
                    {
                        _id: "2",
                        status: 'completed',
                        task_details: "sweep the office"
                    }
                ])
            }, 3000)

            const response = await fetch(`${Environment.backend_api_url}/tasks`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const result = await response.json();

            if (result.success) {
                this.tasks.set(result.data);
            } else {
                console.error('Failed to fetch tasks:', result.message);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async getProfileData() {
        try {
            const response = await fetch(`${Environment.backend_api_url}/subunits/${this.userLoggedIn()?.subunitId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const result = await response.json();

            const user = this.userLoggedIn();
            if (user && result.success) {
                this.profile_data.set({
                    ...user,
                    subunit: result.subunit.name
                });
            } else {
                console.error('Failed to fetch profile data:', result.message);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async getSubunitMembers() {
        try {
            const response = await fetch(`${Environment.backend_api_url}/subunits`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const result = await response.json();

            if (result.success) {
                this.subunit_members.set(result.data);
            } else {
                console.error('Failed to fetch profile data:', result.message);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async getSubunitTeams(team: string) {
        try {
            const response = await fetch(`${Environment.backend_api_url}/subunits/${encodeURIComponent(team)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });

            const result = await response.json();

            if (result.success) {
                this.subunit_teams.set(result.data);
            } else {
                console.error('Failed to fetch subunit team data:', result.message);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async addUserAsSubunitLeader(user: Users) {
        try {
            const response = await fetch(`${Environment.backend_api_url}/user/auth/signup`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            const result = await response.json();

            if (result.success) {
                // use this in prod
                this.subunit_members.update((prevMembers) => [...prevMembers, result.data]);
            }
        } catch (error: any) {
            console.error(error);
        }
    }
}
