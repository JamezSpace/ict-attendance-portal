import { Users } from "./users.interfaces";

export interface UserProfile extends Users {
    gender?: 'male' | 'female';
    region?: string;
    province?: string;
    subunit?: any;
}