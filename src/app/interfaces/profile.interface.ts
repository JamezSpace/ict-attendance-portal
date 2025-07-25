export interface UserProfile {
    _id: string;
    name: string;
    email: string;
    gender: 'male' | 'female';
    role: 'member' | 'executive' | 'official';
    region: string;
    province: string;
    subunit?: string;
    passport_url: string;
}