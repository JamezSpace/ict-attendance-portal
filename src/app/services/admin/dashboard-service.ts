import { Injectable, signal } from '@angular/core';
import { Environment } from '../../environments/environment';
import { Attendance } from '../../interfaces/attendance.interface';
import { UserProfile } from '../../interfaces/profile.interface';
import { Tasks } from '../../interfaces/tasks.interfaces';
import { Guests } from '../../interfaces/visitors.interface';
import { Teams } from '../../interfaces/team.interface';
import { Room } from '../../interfaces/rooms.interfaces';
import { Users } from '../../interfaces/users.interfaces';
import { Subunit } from '../../interfaces/subunits.interfaces';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor() { }

    accessToken = localStorage.getItem('access_token')
    attendances = signal<Attendance[]>([])
    guests = signal<Guests[]>([])
    tasks = signal<Tasks[]>([])
    teams = signal<Teams[]>([])
    users = signal<UserProfile[]>([])
    rooms = signal<Room[]>([])
    subunits = signal<Subunit[]>([])
    member_count = signal(0)

    total_users = signal(0);
    pagination = signal({ page: 1, limit: 10, total: 0 });
    async getUsers(page: number = 1, limit: number = 10) {
        try {
            const response = await fetch(`${Environment.backend_api_url}/users?page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });

            const result = await response.json();

            if (result.success) {
                this.total_users.set(result.pagination.total);
                this.users.set(result.users);
                this.pagination.set({
                    page: result.pagination.page,
                    limit: result.pagination.limit,
                    total: result.pagination.total
                });
            } else {
                console.error('Failed to fetch users:', result.message);
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

    async getTeams() {
        try {
            const response = await fetch(`${Environment.backend_api_url}/teams`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const result = await response.json();

            if (result.success) {
                this.teams.set(result.data);
            } else {
                console.error('Failed to fetch teams:', result.message);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async getAttendanceHistories() {
        try {
            const response = await fetch(`${Environment.backend_api_url}/attendance/all`, {
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

    async getRooms() {
        try {
            const response = await fetch(`${Environment.backend_api_url}/rooms`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const result = await response.json();

            if (result.success) {
                this.rooms.set(result.data);
            } else {
                console.error('Failed to fetch rooms:', result.message);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async getSubunits() {
        try {
            const response = await fetch(`${Environment.backend_api_url}/subunits`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const result = await response.json();

            if (result.success) {
                this.subunits.set(result.data);
                this.member_count.set(result.member_count)
            } else {
                console.error('Failed to fetch subunits:', result.message);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async addRoom(room: Room) {
        try {
            const response = await fetch(`${Environment.backend_api_url}/rooms`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(room)
            })

            const result = await response.json();

            if (result.success) {
                // use this in prod
                this.rooms.update((prevRooms) => [...prevRooms, result.data]);
                // this.rooms.update((prevRooms) => [...prevRooms, room]);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async deleteRoom(roomId: string) {
    try {
        const response = await fetch(`${Environment.backend_api_url}/rooms/${roomId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        });

        const result = await response.json();

        if (result.success) {
            // Update the local rooms list by removing the deleted one
            this.rooms.update((prevRooms) => prevRooms.filter(room => room._id !== roomId));
        } else {
            console.error('Failed to delete room:', result.message);
        }
    } catch (error: any) {
        console.error(error);
    }
}


    async addUser(user: Users) {
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
                this.users.update((prevUsers) => [...prevUsers, result.data]);
                // this.users.update((prevUsers) => [...prevUsers, user]);
            }
        } catch (error: any) {
            console.error(error);
        }

    }
}
