import { Users } from "./users.interfaces";

export interface UserProfile extends Users {
    gender?: string;
    region?: string;
    province?: string;
    subunit?: any;
}