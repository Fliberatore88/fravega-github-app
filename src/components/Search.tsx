interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, setSearchTerm, clearSearch }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Buscar usuarios..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded-md w-full mr-2"
      />
      <button
        onClick={clearSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Limpiar
      </button>
    </div>
  );
};

export default Search;