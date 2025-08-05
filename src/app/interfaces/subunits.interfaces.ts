import { Users } from "./users.interfaces";

export interface Subunit {
    _id: string;
    name: string;
    description?: string;
    leaderIds: string[]; 
    members?: Users[]; 
    userCount?: number; // Optional field to store the count of users in the subunit
    createdAt?: string;
    updatedAt?: string;
}