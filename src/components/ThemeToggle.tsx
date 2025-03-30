import { useAppContext } from '../contexts/AppContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded"
    >
      {theme === 'light' ? 'Oscuro' : 'Claro'}
    </button>
  );
};

export default ThemeToggle;