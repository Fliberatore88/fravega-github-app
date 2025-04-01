import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import Image from 'next/image';

const Search: React.FC = () => {
    const { searchTerm, setSearchTerm, setSearchResults } = useAppContext();

    const clearSearch = () => {
        searchTerm ? (setSearchTerm(''), setSearchResults([])) : null;
    };

    return (
        <div className="search-container flex items-center flex-grow max-w-xl">
            <input
                type="text"
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input border p-2 rounded-md w-full mr-2 flex-grow"
            />
            <button
                onClick={clearSearch}
                className="search-button w-10 h-10 flex items-center justify-center"
                style={{ backgroundColor: 'transparent', border: 'none' }}
            >
                <Image src="/icono-borrar.png" alt="Limpiar búsqueda" width={32} height={32} /> 
            </button>
        </div>
    );
};

export default Search;