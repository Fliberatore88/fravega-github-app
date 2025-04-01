import React, { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';
import { User } from '../types/user';

interface SearchContextProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  searchResults: User[];
  setSearchResults: Dispatch<SetStateAction<User[]>>;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};