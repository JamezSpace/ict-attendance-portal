export interface Attendance {
    _id: string;
    day: string;
    in: string;
    out: string;
    duration: string;
    status: 'late' | 'on time' | 'absent'
}