import { Users } from "./users.interfaces";

export interface Subunit {
    _id: string;
    name: string;
    description?: string;
    leaderId: string; 
    members?: Users[]; 
    createdAt?: string;
    updatedAt?: string;
}