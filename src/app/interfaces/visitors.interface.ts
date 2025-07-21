export interface Guests {
    _id: string;
    name: string;
    status: 'opened' | 'closed';
    phone: string;
    time_in: Date;
    time_out: Date;
}

export enum GuestTypes {
    teenager , adult
}