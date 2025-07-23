export interface UserProfile {
    _id: string;
    name: string;
    email: string;
    role: 'member' | 'executive' | 'official';
    subunit?: string;
    region: string;
    province: string;
    gender: 'male' | 'female';
}