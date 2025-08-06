import { Injectable, signal } from '@angular/core';
import { Environment } from '../../../environments/environment';
import { Attendance } from '../../../interfaces/attendance.interface';
import { Guests } from '../../../interfaces/visitors.interface';
import { Tasks } from '../../../interfaces/tasks.interfaces';
import { UserProfile } from '../../../interfaces/profile.interface';
import { Users } from '../../../interfaces/users.interfaces';
import { AuthService } from '../../auth/auth-service';
import { Teams } from '../../../interfaces/team.interface';
import { Room } from '../../../interfaces/rooms.interfaces';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor() { }

    accessToken = localStorage.getItem('access_token')
    profile_data = AuthService.userLoggedIn;
    attendance_history = signal<Attendance[]>([])
    attendance_roomspaces = signal<Room[]>([])
    guests = signal<Guests[]>([])
    tasks = signal<Tasks[]>([])
    profile_data_with_subunit = this.profile_data
    subunit_members = signal<UserProfile[]>([])
    subunit_teams = signal<Teams[]>([])
    complete_profile_loaded = signal(false);

    async getAttendanceHistory() {
        try {
            const response = await fetch(`${Environment.backend_api_url}/attendance/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const result = await response.json();

            if (result.success) {
                this.attendance_history.set(result.data);
            } else {
                console.error('Failed to fetch attendance history:', result.message);
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

    async getSubunitDetails(subunitId: string) {
        try {
            const response = await fetch(`${Environment.backend_api_url}/subunits/${subunitId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const result = await response.json();

            const user = this.profile_data();
            if (user && result.success) {
                this.profile_data_with_subunit.set({
                    ...user,
                    subunit: result.data
                });
            } else {
                console.error('Failed to fetch profile data:', result.message);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async loadProfileData(subunitId: string): Promise<void> {
        try {
            await this.getSubunitDetails(subunitId);
        } catch (err) {
            console.error('Failed to load profile data:', err);
        }
    }

    async getSubunitMembers(subunitId: string, page = 1, limit = 10) {
        try {
            const response = await fetch(
                `${Environment.backend_api_url}/users/subunits/${subunitId}?page=${page}&limit=${limit}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`
                    }
                }
            );

            const result = await response.json();

            if (result.success) {
                this.subunit_members.set(result.data);
                return result; // Important: return pagination too
            } else {
                console.error('Failed to fetch subunit members:', result.message);
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
                this.subunit_members.update((prevMembers) => [...prevMembers, result.user]);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async editUser(user: Partial<UserProfile>) {
        try {
            const response = await fetch(`${Environment.backend_api_url}/users/${this.profile_data()?._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })

            const result = await response.json()
            if (result.success) {
                const members = this.subunit_members();
                const updated = members.map(member =>
                    member._id === result.user._id ? result.user : member
                );
                this.subunit_members.set(updated);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async updateProfile(formData: FormData) {
        try {
            const response = await fetch(`${Environment.backend_api_url}/upload/profile/user/${this.profile_data()?._id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                    // ❗️Do NOT set Content-Type manually. Let browser set it for FormData.
                },
                body: formData
            });

            const result = await response.json();
            console.log('Upload result:', result);

            if (result.success) {
                // Optionally update the user signal with new avatar URL
                const updatedUser = { ...this.profile_data()!, avatar: result.avatarUrl };
                this.profile_data.set(updatedUser);
            }

        } catch (error) {
            console.error('Upload failed:', error);
        }
    }

    async clockIn(day: number) {
        try {
            const response = await fetch(`${Environment.backend_api_url}/attendance/clock-in`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ day })
            });

            const result = await response.json();

            if (result.success && Array.isArray(result.data)) {
                this.attendance_history.update(prev => [...prev, ...result.data]);
            }

        } catch (error) {
            console.error('Clock-in failed:', error);
        }
    }


    async clockOut(day: number) {
        try {
            const response = await fetch(`${Environment.backend_api_url}/attendance/clock-out`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ day })
            });

            const result = await response.json();

            if (result.success && result.data) {
                const updatedAttendance: Attendance = result.data;

                this.attendance_history.update((prev) =>
                    prev.map(att =>
                        att._id === updatedAttendance._id ? updatedAttendance : att
                    )
                );
            }

        } catch (error) {
            console.error('Clock-out failed:', error);
        }
    }

    async getAttendanceRooms() {
        try {
            const response = await fetch(
                `${Environment.backend_api_url}/rooms`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`
                    }
                }
            );

            const result = await response.json();

            if (result.success) {
                this.attendance_roomspaces.set(result.data);
            } else {
                console.error('Failed to fetch attendance room spaces:', result.message);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

}
