import { createContext, useState, useEffect, useContext } from 'react';
import { User } from '../types/user';

interface FavoriteUsersContextProps {
  favoriteUsers: User[];
  setFavoriteUsers: (users: User[]) => void;
  toggleFavorite: (user: User) => void;
}

const FavoriteUsersContext = createContext<FavoriteUsersContextProps | undefined>(undefined);

export const FavoriteUsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteUsers, setFavoriteUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteUsers');
    if (storedFavorites) {
      setFavoriteUsers(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteUsers', JSON.stringify(favoriteUsers));
  }, [favoriteUsers]);

  const toggleFavorite = (user: User) => {
    if (favoriteUsers.find((u) => u.login === user.login)) {
      setFavoriteUsers(favoriteUsers.filter((u) => u.login !== user.login));
    } else {
      setFavoriteUsers([...favoriteUsers, user]);
    }
  };

  return (
    <FavoriteUsersContext.Provider value={{ favoriteUsers, setFavoriteUsers, toggleFavorite }}>
      {children}
    </FavoriteUsersContext.Provider>
  );
};

export const useFavoriteUsers = () => {
  const context = useContext(FavoriteUsersContext);
  if (!context) {
    throw new Error('useFavoriteUsers must be used within a FavoriteUsersProvider');
  }
  return context;
};