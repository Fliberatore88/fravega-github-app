import { useAppContext } from '../contexts/AppContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <div className="theme-toggle-container flex items-center">
      <button
        onClick={toggleTheme}
        className="theme-toggle-button bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded min-w-[80px]"
      >
        {theme === 'light' ? 'Oscuro' : 'Claro'}
      </button>
    </div>
  );
};

export default ThemeToggle;