import axios, { AxiosError, AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import * as githubService from '@/services/github';
import NodeCache from 'node-cache';
import { User } from '@/types/user';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const getInternalCache = (): NodeCache => {
    // @ts-ignore
    return (githubService as any).__cache || new NodeCache();
};

describe('GitHub Service', () => {
    const mockUser: User = {
        login: 'octocat',
        avatar_url: '',
        html_url: '',
        followers: 0,
        public_repos: 0,
    };

    beforeEach(() => {
        mockedAxios.get.mockReset();
        if ((githubService as any).__cache) {
            (githubService as any).__cache.flushAll();
        }
    });

    describe('fetchUsers', () => {
        it('debería fetchear los usuarios de la API y cachear los resultados', async () => {
            mockedAxios.get.mockResolvedValueOnce({ data: [mockUser] });

            const users = await githubService.fetchUsers();
            expect(users).toEqual([mockUser]);
            expect(mockedAxios.get).toHaveBeenCalledWith('https://api.github.com/users');

            const cachedUsers = await githubService.fetchUsers();
            expect(mockedAxios.get).toHaveBeenCalledTimes(1);
            expect(cachedUsers).toEqual([mockUser]);
        });

        test('debería manejar error 403 correctamente', async () => {
            const response = {
                status: 403,
                statusText: 'Forbidden',
                data: {},
                headers: {},
                config: {},
            };

            const error403 = new AxiosError(
                'Request failed with status code 403',
                'ERR_BAD_REQUEST',
                {} as any,
                {},
                response as any
            );
            error403.isAxiosError = true; 

            mockedAxios.get.mockRejectedValueOnce(error403);

            await expect(githubService.fetchUsers()).rejects.toThrow(
                'An unexpected error occurred.'
            );
        });


        it('debería manejar errores inesperados', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('fail'));

            await expect(githubService.fetchUsers()).rejects.toThrow(
                'An unexpected error occurred.'
            );
        });
    });

    describe('fetchSearchedUsers', () => {
        it('debería buscar usuarios y cachear los resultados', async () => {
            mockedAxios.get.mockResolvedValueOnce({ data: { items: [mockUser] } });

            const users = await githubService.fetchSearchedUsers('octocat');
            expect(users).toEqual([mockUser]);
            expect(mockedAxios.get).toHaveBeenCalledWith('https://api.github.com/search/users?q=octocat');

            const cachedUsers = await githubService.fetchSearchedUsers('octocat');
            expect(mockedAxios.get).toHaveBeenCalledTimes(1);
            expect(cachedUsers).toEqual([mockUser]);
        });
    });

    describe('fetchUser', () => {
        it('debería buscar un usuario individual y cachearlo', async () => {
            mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

            const user = await githubService.fetchUser('octocat');
            expect(user).toEqual(mockUser);
            expect(mockedAxios.get).toHaveBeenCalledWith('https://api.github.com/users/octocat');

            const cachedUser = await githubService.fetchUser('octocat');
            expect(mockedAxios.get).toHaveBeenCalledTimes(1);
            expect(cachedUser).toEqual(mockUser);
        });
    });
});
