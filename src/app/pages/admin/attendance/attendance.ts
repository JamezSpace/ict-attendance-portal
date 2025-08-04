import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../../services/admin/dashboard-service';
import { Room } from '../../../interfaces/rooms.interfaces';
import { Environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceQrDialog } from '../../../components/dialogs/attendance-qr-dialog/attendance-qr-dialog';
import { AddAttendanceRoomspaceDialog } from '../../../components/dialogs/add-attendance-roomspace-dialog/add-attendance-roomspace-dialog';
import { DeleteRoomspaceDialog } from '../../../components/dialogs/delete-roomspace-dialog/delete-roomspace-dialog';

@Component({
    selector: 'app-attendance',
    imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule],
    templateUrl: './attendance.html',
    styleUrl: './attendance.css'
})
export class Attendance  {
    selectedDay!: string;
    selectedStatus!: string;
    private adminDashboardService = inject(DashboardService);
    attendances = this.adminDashboardService.attendances;
    rooms = this.adminDashboardService.rooms
    private dialog = inject(MatDialog);

    qrValue = signal('')
    generateQrCode(room: Room) {
        if (!room) return

        const base_url = Environment.general_ict_url
        this.qrValue.set(`${base_url}?lat=${room.lat}&long=${room.long}`)

        this.openAttendanceQrDialog()
    }

    deleteRoomSpace(room: Room) {
        const dialogRef = this.dialog.open(DeleteRoomspaceDialog, {
            data: room,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The attendance qr code dialog was closed');
        });
    }

    openAttendanceQrDialog(): void {
        const dialogRef = this.dialog.open(AttendanceQrDialog, {
            data: {
                qrValue: this.qrValue()
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The attendance qr code dialog was closed');
        });
    }

    createAttendanceRoomSpace() {
        const dialogRef = this.dialog.open(AddAttendanceRoomspaceDialog)

        dialogRef.afterClosed().subscribe(result => {
            console.log('The add attendance qr code dialog was closed');
        });
    }

    duration(timeIn: any, timeOut: any): string {
        const diffMs = new Date(timeOut).getTime() - new Date(timeIn).getTime();

        if (isNaN(diffMs) || diffMs < 0) {
            return "Invalid or negative time range";
        }

        const totalSeconds = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSeconds / (60 * 60 * 24));
        const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${days > 0 ? days + "d " : ""}${hours}h ${minutes}m ${seconds}s`;
    }
}
