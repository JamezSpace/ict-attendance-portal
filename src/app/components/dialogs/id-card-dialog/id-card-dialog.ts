import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
    MAT_DIALOG_DATA, MatDialogRef
} from '@angular/material/dialog';
import { UserProfile } from '../../../interfaces/profile.interface';

@Component({
    selector: 'app-id-card-dialog',
    imports: [],
    templateUrl: './id-card-dialog.html',
    styleUrl: './id-card-dialog.css'
})
export class IdCardDialog {
    @ViewChild('printCard', { static: false }) printCard!: ElementRef;
    @ViewChild('front', { static: false })
    frontPage !: ElementRef;
    @ViewChild('back', { static: false })
    backPage !: ElementRef;
    readonly dialogRef = inject(MatDialogRef<IdCardDialog>);
    readonly data = inject<UserProfile>(MAT_DIALOG_DATA);


    get genderInitial() {
        if (this.data?.gender === 'male') return 'm'
        else if (this.data?.gender === 'female') return 'f'
        else return '--'
    }

    exportAsPDF() {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'in',
            format: [2.125 * 2, 3.375 * 2], // CR80 size with scaling
        });

        const options = {
            scale: 4,
            useCORS: true,
            backgroundColor: null,
        };

        const card = this.printCard.nativeElement;
        const front = this.frontPage.nativeElement
        const back = this.backPage.nativeElement;

        html2canvas(front, options).then(frontCanvas => {
            const imgData = frontCanvas.toDataURL('image/jpeg', 1.0);
            pdf.addImage(imgData, 'JPEG', 0, 0, 4.25, 6.75); // same format

            html2canvas(back, options).then(backCanvas => {
                const backImgData = backCanvas.toDataURL('image/jpeg', 1.0);
                pdf.addPage();
                pdf.addImage(backImgData, 'JPEG', 0, 0, 4.25, 6.75);
                pdf.save(`${this.data?.firstName}-id-card.pdf`);
            });
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
