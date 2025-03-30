import axios from 'axios';
import NodeCache from 'node-cache';

const BASE_URL = 'https://api.github.com';
const cache = new NodeCache({ stdTTL: 3600 });

export const fetchUsers = async (searchTerm?: string) => {
    try {
        if (searchTerm) {
            const cacheKey = `users-${searchTerm}`;
            const cachedData = cache.get(cacheKey);

            if (cachedData) {
                return cachedData as any[];
            }

            const response = await axios.get(`${BASE_URL}/search/users?q=${searchTerm}`);
            const data = response.data.items;

            cache.set(cacheKey, data);
            return data;
        } else {
            const cacheKey = 'users';
            const cachedData = cache.get(cacheKey);

            if (cachedData) {
                return cachedData as any[];
            }

            const response = await axios.get(`${BASE_URL}/users`);
            const data = response.data;

            cache.set(cacheKey, data);
            return data;
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

export const fetchUser = async (username: string) => {
    try {
        const cacheKey = `user-${username}`;
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            return cachedData as any;
        }

        const response = await axios.get(`${BASE_URL}/users/${username}`);
        const data = response.data;

        cache.set(cacheKey, data);
        return data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};