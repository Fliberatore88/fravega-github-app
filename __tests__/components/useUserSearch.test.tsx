import { renderHook, act, waitFor } from '@testing-library/react';
import useUserSearch from '@/hooks/useUserSearch';
import { AppProvider } from '@/contexts/AppContext';
import { fetchUsers, fetchSearchedUsers } from '@/services/github';
import { User } from '@/types/user';

jest.mock('@/services/github');

const mockUsers: User[] = [
    { login: 'usuario1', avatar_url: '', html_url: '', followers: 0, public_repos: 0 },
    { login: 'usuario2', avatar_url: '', html_url: '', followers: 0, public_repos: 0 },
  ];

describe('useUserSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AppProvider>{children}</AppProvider>
  );

  it('deberia fetchear los usuarios iniciales cuando searchTerm está vacío', async () => {
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

    const { result } = renderHook(() => useUserSearch(), { wrapper });

    await waitFor(() => {
      expect(result.current.users).toEqual(mockUsers);
      expect(result.current.userNotFound).toBe(false);
    });
  });

  it('debería fetchear busqueda de usuarios cuando se da un searchTerm y encuentra resultados', async () => {
    (fetchSearchedUsers as jest.Mock).mockResolvedValue(mockUsers);

    const { result } = renderHook(() => useUserSearch(), { wrapper });

    act(() => {
      result.current.setSearchTerm('octocat');
    });

    await waitFor(() => {
      expect(fetchSearchedUsers).toHaveBeenCalledWith('octocat');
      expect(result.current.users).toEqual(mockUsers);
      expect(result.current.userNotFound).toBe(false);
    });
  });

  it('deberia manejar cuando no encuentra usuarios', async () => {
    (fetchSearchedUsers as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useUserSearch(), { wrapper });

    act(() => {
      result.current.setSearchTerm('unknownuser');
    });

    await waitFor(() => {
      expect(result.current.users).toEqual([]);
      expect(result.current.userNotFound).toBe(true);
    });
  });

  it('deberia limpiar el searchTerm cuando se llama a clearSearch', async () => {
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);

    const { result } = renderHook(() => useUserSearch(), { wrapper });

    act(() => {
      result.current.setSearchTerm('something');
    });

    await waitFor(() => {
      expect(result.current.searchTerm).toBe('something');
    });

    act(() => {
      result.current.clearSearch();
    });

    await waitFor(() => {
      expect(result.current.searchTerm).toBe('');
    });
  });

  it('deberia manejar el error de fetchSearchedUsers', async () => {
    (fetchSearchedUsers as jest.Mock).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useUserSearch(), { wrapper });

    act(() => {
      result.current.setSearchTerm('error');
    });

    await waitFor(() => {
      expect(result.current.users).toEqual([]);
      expect(result.current.userNotFound).toBe(true);
    });
  });
});
