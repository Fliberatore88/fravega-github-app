import React, { useEffect } from 'react';
import { fetchUsers } from '../services/github';
import { useAppContext } from '../contexts/AppContext';

const UserLoader: React.FC = () => {
  const { setSearchResults, setSearchTerm, searchTerm } = useAppContext();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const initialUsers = await fetchUsers();
        setSearchResults(initialUsers);
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    if (!searchTerm) {
      loadUsers();
    }
  }, [setSearchResults, searchTerm]);

  return null;
};

export default UserLoader;