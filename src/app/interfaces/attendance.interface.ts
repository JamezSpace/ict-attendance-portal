export interface Attendance {
    _id: string;
    day: number;
    clockInTime: Date;
    clockOutTime: Date;
}

export interface AttendanceExtended {
    duration?: string;
    status?: 'late'|'on time'|'absent'
}