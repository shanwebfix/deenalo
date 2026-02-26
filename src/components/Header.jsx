import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Menu, Sun, Moon, X, Home, BookOpen, Headphones, FileText, BookText, Wrench } from 'lucide-react';

export default function Header() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: '/', icon: <Home size={20}/>, label: 'Home' },
    { path: '/listen', icon: <Headphones size={20}/>, label: 'Listen' },
    { path: '/sirah', icon: <FileText size={20}/>, label: 'Sirah' },
    { path: '/reading', icon: <BookOpen size={20}/>, label: 'Reading' },
    { path: '/hadith', icon: <BookText size={20}/>, label: 'Hadith' },
    { path: '/tools', icon: <Wrench size={20}/>, label: 'Tools' },
  ];

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Quran App Logo" className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">Quran App</span>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="text-gray-600 dark:text-gray-300 hover:text-emerald-500">
                <Bookmark size={22} />
              </button>
              <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 hover:text-emerald-500">
                {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
              </button>
              <button onClick={toggleMenu} className="text-gray-600 dark:text-gray-300 hover:text-emerald-500">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Off-canvas Menu */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu}></div>
      <div className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-bold text-lg dark:text-white">Menu</h2>
            <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">
                <X size={24}/>
            </button>
        </div>
        <nav className="p-4">
          <ul>
            {navLinks.map(link => (
              <li key={link.path}>
                <Link to={link.path} onClick={toggleMenu} className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}