import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bookmark, Menu, Sun, Moon, X, Home, BookOpen, Headphones, FileText, BookText, Wrench, ChevronLeft } from 'lucide-react';

export default function Header() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [isMenuOpen, setMenuOpen] = useState(false);
  
  const location = useLocation(); // বর্তমান পাথ চেক করার জন্য
  const navigate = useNavigate(); // ব্যাক যাওয়ার জন্য

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

  // হোম পেজে আছে কিনা চেক করা
  const isHomePage = location.pathname === '/';

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
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-white/70 backdrop-blur-md dark:bg-gray-900/70">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo or Back Button Section */}
<div className="flex items-center">
  {isHomePage ? (
    /* Home Page এ থাকলে লোগো */
    <Link to="/" className="group flex items-center space-x-2 transition-transform duration-200 active:scale-95">
      <img src="/logo.svg" alt="DeenAlo Logo" className="h-8 w-auto" />
    </Link>
  ) : (
    /* অন্য পেজে থাকলে ব্যাক বাটন - Border এবং BG সহ */
<button 
      onClick={() => navigate(-1)} 
      className="flex h-10 px-3 items-center justify-center gap-1 rounded-xl 
                 bg-gray-50 dark:bg-gray-800/50 
                 border border-gray-200 dark:border-gray-700 
                 text-gray-700 dark:text-gray-200 
                 transition-all duration-200 
                 hover:bg-gray-100 dark:hover:bg-gray-700 
                 active:scale-95 shadow-sm"
    >
      <ChevronLeft size={20} strokeWidth={2.5} />
      <span className="text-sm font-bold pr-1">Back</span>
    </button>
  )}
</div>

            {/* Action Icons */}
            <div className="flex items-center gap-1 sm:gap-3">
              
              {/* Bookmark Button */}
              <Link
                to="/Bookmark"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-400 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
              >
                <Bookmark size={20} strokeWidth={2.2} />
              </Link>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme} 
                className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition-all duration-200 hover:bg-amber-50 hover:text-amber-500 dark:text-gray-400 dark:hover:bg-amber-500/10 dark:hover:text-amber-400"
              >
                {theme === 'dark' ? (
                  <Sun size={20} strokeWidth={2.2} className="animate-spin-slow" />
                ) : (
                  <Moon size={20} strokeWidth={2.2} />
                )}
              </button>

              {/* Divider */}
              <div className="mx-1 h-6 w-[1px] bg-gray-200 dark:bg-gray-800" />

              {/* Menu Button */}
              <button 
                onClick={toggleMenu} 
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-900 transition-all duration-200 hover:bg-emerald-500 hover:text-white dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-emerald-600"
              >
                <Menu size={22} strokeWidth={2.5} />
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