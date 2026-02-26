import { Home, Headphones, BookOpen, BookText, Wrench, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  const navItems = [
    { icon: <Home size={22} />, name: 'Home', path: '/' },
    { icon: <Headphones size={22} />, name: 'Listen', path: '/listen' },
 
    { icon: <BookOpen size={22} />, name: 'Reading', path: '/reading' },
 
    { icon: <Wrench size={22} />, name: 'Tools', path: '/tools' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 z-50">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex flex-col items-center justify-center transition-all duration-200 w-full ${location.pathname === item.path ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'}`}>
            <div className="mb-0.5">
              {item.icon}
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.name}</span>
          </Link>
        ))}
      </nav>
    </footer>
  );
}