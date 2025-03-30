import { createContext, useState, useEffect, useContext } from 'react';
import { User } from '../types/user';

interface AppContextProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  favoriteUsers: User[];
  setFavoriteUsers: (users: User[]) => void;
  toggleFavorite: (user: User) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [favoriteUsers, setFavoriteUsers] = useState<User[]>([]);

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
    document.documentElement.setAttribute('data-theme', theme); // Actualizamos el atributo data-theme
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
    <AppContext.Provider value={{ theme, setTheme, toggleTheme, favoriteUsers, setFavoriteUsers, toggleFavorite }}>
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