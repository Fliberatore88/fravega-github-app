import axios, { AxiosError } from 'axios';
import NodeCache from 'node-cache';

const BASE_URL = 'https://api.github.com';
const cache = new NodeCache({ stdTTL: 3600 });

export const fetchUsers = async () => {
    try {
        const cacheKey = 'users';
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            return cachedData as any[];
        }

        const response = await axios.get(`${BASE_URL}/users`);
        const data = response.data;

        cache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new AxiosError(error.message, error.code, error.config, error.request, error.response);
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};

export const fetchSearchedUsers = async (searchTerm: string) => {
    try {
        const cacheKey = `users-${searchTerm}`;
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            return cachedData as any[];
        }

        const response = await axios.get(`${BASE_URL}/search/users?q=${searchTerm}`);
        const data = response.data.items;

        cache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new AxiosError(error.message, error.code, error.config, error.request, error.response);
        } else {
            throw new Error('An unexpected error occurred.');
        }
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
        if (axios.isAxiosError(error)) {
            throw new AxiosError(error.message, error.code, error.config, error.request, error.response);
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};