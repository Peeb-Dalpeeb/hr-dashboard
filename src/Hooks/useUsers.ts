import { api } from "../api/axiosInstances";
import type { User } from "../types";
import { useState, useEffect } from "react";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
            } catch (error) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return { users, loading, error };
}
