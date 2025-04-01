import { createContext, useState, useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { User } from '../types/user';

interface AppContextProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  favoriteUsers: User[];
  setFavoriteUsers: (users: User[]) => void;
  toggleFavorite: (user: User) => void;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  searchResults: User[];
  setSearchResults: Dispatch<SetStateAction<User[]>>;
  setUserNotFound: Dispatch<SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [favoriteUsers, setFavoriteUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme === 'dark' ? 'dark' : 'light');
    } else {
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleFavorite = (user: User) => {
    if (favoriteUsers.find((u) => u.login === user.login)) {
      setFavoriteUsers(favoriteUsers.filter((u) => u.login !== user.login));
    } else {
      setFavoriteUsers([...favoriteUsers, user]);
    }
  };

  return (
    <AppContext.Provider value={{ theme, setTheme, toggleTheme, favoriteUsers, setFavoriteUsers, toggleFavorite, searchTerm, setSearchTerm, searchResults, setSearchResults, setUserNotFound }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};