export interface MyJwtPayload {
    id: string;
    email?: string;
    role?: "admin" | "parent" | "child";
    exp: number;
}