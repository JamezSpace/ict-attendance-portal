export interface Users {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: 'user' | 'admin';
    departmentalRole? : 'member' | 'executive' | 'official';
    password?: string;
    isActive?: boolean;
    __v?: number,
    qrCode?: string;
    updatedAt?: string;
    avatar?: string;
    subunitId?: string;

    isSubunitLeader?: boolean;
}