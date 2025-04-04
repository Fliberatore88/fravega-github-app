import axios, { AxiosError, AxiosResponse } from 'axios';
import NodeCache from 'node-cache';
import { User } from '../types/user';

const BASE_URL = 'https://api.github.com';
const cache = new NodeCache({ stdTTL: 3600 });

export const fetchUsers = async (): Promise<User[]> => {
    try {
        const cacheKey = 'users';
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            return cachedData as User[];
        }

        const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}/users`);
        const data = response.data;

        cache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 403) {
                throw new Error('Límite de solicitudes alcanzado. Inténtalo más tarde.');
            }
            throw new AxiosError(error.message, error.code, error.config, error.request, error.response);
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};

export const fetchSearchedUsers = async (searchTerm: string): Promise<User[]> => {
    try {
        const cacheKey = `users-${searchTerm}`;
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            return cachedData as User[];
        }

        const response: AxiosResponse<{ items: User[] }> = await axios.get(`${BASE_URL}/search/users?q=${searchTerm}`);
        const data = response.data.items;

        cache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 403) {
                throw new Error('Límite de solicitudes alcanzado. Inténtalo más tarde.');
            }
            throw new AxiosError(error.message, error.code, error.config, error.request, error.response);
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};

export const fetchUser = async (username: string): Promise<User> => {
    try {
        const cacheKey = `user-${username}`;
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            return cachedData as User;
        }

        const response: AxiosResponse<User> = await axios.get(`${BASE_URL}/users/${username}`);
        const data = response.data;

        cache.set(cacheKey, data);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 403) {
                throw new Error('Límite de solicitudes alcanzado. Inténtalo más tarde.');
            }
            throw new AxiosError(error.message, error.code, error.config, error.request, error.response);
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
};

export const __cache = cache;