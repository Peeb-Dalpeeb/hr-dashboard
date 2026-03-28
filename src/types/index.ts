export type UserRole = 'admin' | 'employee';
export type LeaveStatus = 'Pending' | 'Approved' | 'Denied';

export interface User {
    id: number;
    name: string;
    department: string;
    email: string;
    role: UserRole;
}

export interface LeaveRequest {
    id: number;
    userId: number;
    employee: string;
    reason: string;
    date: string;
    status: LeaveStatus;
}

export interface AuthState {
    currentUser: User | null;
    isAuthenticated: boolean;

}