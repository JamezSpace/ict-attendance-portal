import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { Room } from '../../../interfaces/rooms.interfaces';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DashboardService } from '../../../services/admin/dashboard-service';

@Component({
    selector: 'app-add-attendance-roomspace-dialog',
    imports: [MatFormFieldModule, MatInputModule, MatCheckboxModule, FormsModule, MatProgressSpinnerModule],
    templateUrl: './add-attendance-roomspace-dialog.html',
    styleUrl: './add-attendance-roomspace-dialog.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAttendanceRoomspaceDialog {
    readonly dialogRef = inject(MatDialogRef<AddAttendanceRoomspaceDialog>);
    private adminDshboardService = inject(DashboardService)
    roomspace_name = model('')
    room_details = signal<Room>({
        lat: 0,
        long: 0,
        name: ''
    })

    onNoClick(): void {
        this.dialogRef.close();
    }

    locationAttached = signal(false);
    toggleLocationAttached() {
        this.locationAttached.set(!this.locationAttached())
    }

    getCurrentLocation(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject('Geolocation is not supported by your browser.');
            } else {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 5000
                });
            }
        });
    }

    async useMyLocation() {
        try {
            const position = await this.getCurrentLocation();
            this.room_details.update((room) =>  {
                room.lat = position.coords.latitude
                room.long = position.coords.longitude;
                room.name = this.roomspace_name()

                return room
            });

            return true;
        } catch (error: any) {
            alert('⚠️ Could not get your location: ' + error.message || error);

            return false;
        }
    }

    loading = signal(false)
    toggleLoading() {
        this.loading.set(!this.loading())
    }

    async addRoom() {
        this.toggleLoading()
        
        const response = await this.useMyLocation()
        
        if(!response) {
            this.toggleLoading()   
            return 
        }
        
        await this.adminDshboardService.addRoom(this.room_details());

        this.toggleLoading()
        this.dialogRef.close()        
    }
}
