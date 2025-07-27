import { Injectable, signal } from '@angular/core';
import { Environment } from '../../environments/environment';
import { Attendance } from '../../interfaces/attendance.interface';
import { UserProfile } from '../../interfaces/profile.interface';
import { Tasks } from '../../interfaces/tasks.interfaces';
import { Guests } from '../../interfaces/visitors.interface';
import { Team } from '../../interfaces/team.interface';
import { Room } from '../../interfaces/rooms.interfaces';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor() { }

    accessToken = localStorage.getItem('access_token')
    attendances = signal<Attendance[]>([])
    guests = signal<Guests[]>([])
    tasks = signal<Tasks[]>([])
    teams = signal<Team[]>([])
    users = signal<UserProfile[]>([])
    rooms = signal<Room[]>([])

    async getUsers() {
        try {
            const response = await fetch(`${Environment.backend_url}/users`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const result = await response.json();

            if (result.status === 'success') {
                this.users.set(result.data);
            } else {
                console.error('Failed to fetch users:', result.message);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async getGuests(){
        try {
            const response = await fetch(`${Environment.backend_url}/guests`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const result = await response.json();

            if (result.status === 'success') {
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
            const response = await fetch(`${Environment.backend_url}/teams`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const result = await response.json();

            if (result.status === 'success') {
                this.teams.set(result.data);
            } else {
                console.error('Failed to fetch teams:', result.message);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async getAttendances() {
        try {
            const response = await fetch(`${Environment.backend_url}/attendance`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const result = await response.json();

            if (result.status === 'success') {
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
            const response = await fetch(`${Environment.backend_url}/rooms`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })

            const result = await response.json();

            if (result.status === 'success') {
                this.rooms.set(result.data);
            } else {
                console.error('Failed to fetch rooms:', result.message);
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    async addRoom(room: Room) {
        try {
            // const response = await fetch(`${Environment.backend_url}/rooms`, {
            //     method: 'POST',
            //     headers: {
            //         'Authorization': `Bearer ${this.accessToken}`
            //     }
            // })

            // const result = await response.json();

            this.rooms.update((prevRooms) => [...prevRooms, room]);

            // if (result.status === 'success') {
            // } else {
            //     console.error('Failed to fetch rooms:', result.message);
            // }
        } catch (error: any) {
            console.error(error);
        }
    }
}
