import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const RootComponent = () => {
  useEffect(() => {
    // Check korbe click kora element-ti allow-list e ache kina
    const isAllowed = (el) => {
      return (
        el.tagName === 'INPUT' || 
        el.tagName === 'TEXTAREA' || 
        el.isContentEditable || 
        el.classList.contains('allow-copy') // Jekhane 'allow-copy' class thakbe sheta allow hobe
      );
    };

    // ১. Right Click / Long Press Block (Except Inputs)
    const handleContextMenu = (e) => {
      if (!isAllowed(e.target)) {
        e.preventDefault();
      }
    };

    // ২. Copy, Cut, Paste Block (Except Inputs)
    const handleCopyPaste = (e) => {
      if (!isAllowed(e.target)) {
        e.preventDefault();
      }
    };

    // ৩. Keydown Block (F12, Ctrl+U etc.) - Eta shob somoy block thakai bhalo
    const handleKeyDown = (e) => {
      if (
        e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || 
        (e.ctrlKey && e.keyCode === 85)
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('cut', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('cut', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
    };
  }, []);

  return <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>,
)