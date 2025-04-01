import { useEffect, useRef } from 'react';
import { debounce } from '../utils/debounce';
import { useAppContext } from '../contexts/AppContext';
import { fetchUsers, fetchSearchedUsers } from '../services/github';

const useUserSearch = () => {
    const { setSearchResults, searchResults, setSearchTerm, searchTerm, setUserNotFound } = useAppContext();
    const debouncedSearchRef = useRef<((term: string) => void) & { cancel: () => void } | undefined>(undefined);

    useEffect(() => {
        debouncedSearchRef.current = debounce((term: string) => {
            const searchUsers = async () => {
                try {
                    if (term) {
                        const searchedUsers = await fetchSearchedUsers(term);
                        if (searchedUsers.length === 0) {
                            setUserNotFound(true);
                            setSearchResults([]);
                        } else {
                            setUserNotFound(false);
                            setSearchResults(searchedUsers);
                        }
                    } else {
                        const initialUsers = await fetchUsers();
                        setUserNotFound(false);
                        setSearchResults(initialUsers);
                    }
                } catch (error) {
                    console.error("Error fetching users:", error);
                    setUserNotFound(true);
                    setSearchResults([]);
                }
            };
            searchUsers();
        }, 200);

        return () => {
            debouncedSearchRef.current?.cancel();
        };
    }, [searchTerm, setSearchResults, setUserNotFound]);

    useEffect(() => {
        debouncedSearchRef.current?.(searchTerm);
    }, [searchTerm]);

    const clearSearch = () => {
        setSearchTerm('');
    };

    return {
        users: searchResults,
        searchTerm,
        setSearchTerm,
        clearSearch,
    };
};

export default useUserSearch;