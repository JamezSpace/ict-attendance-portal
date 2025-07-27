import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
    selector: 'app-attendance-qr-dialog',
    imports: [QRCodeComponent],
    templateUrl: './attendance-qr-dialog.html',
    styleUrl: './attendance-qr-dialog.css'
})
export class AttendanceQrDialog {
    readonly dialogRef = inject(MatDialogRef<AttendanceQrDialog>);
    readonly data = inject<{ qrValue: string }>(MAT_DIALOG_DATA);

    onNoClick(): void {
        this.dialogRef.close();
    }

    printNow = signal(false);
    async printQr() {
        this.printNow.set(!this.printNow())

        setTimeout(() => window.print(), 1000)
    }
}
