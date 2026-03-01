import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from 'react'; 
import { App as CapApp } from '@capacitor/app';

import Header from './components/Header';
import Footer from './components/Footer';
import Bookmarks from './components/Bookmark';

import Home from './HomeContent/Home';
import Listen from './HomeContent/Listen';
import Quran_mp3 from "./pages/L/quran-mp3";
import Sirah from "./pages/L/Sirah";

import Reading from "./HomeContent/Reading";
import Bangla from "./pages/R/quran-bn";
import Arbi from "./pages/R/quran-ar";
import Bukhari from "./pages/R/bukhari";
import Sokalsondha from "./pages/R/sokal-sondha";
import Dtasbih from "./pages/R/daily-tasbih";


import Tools from "./HomeContent/Tools";


function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const backHandler = CapApp.addListener('backButton', ({ canGoBack }) => {

      if (location.pathname === '/') {
        CapApp.exitApp();
      } else {

        navigate(-1);
      }
    });

    return () => {
      backHandler.remove();
    };
  }, [location, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 mb-32">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Bookmark" element={<Bookmarks />} />
          <Route path="/listen" element={<Listen />} />
          <Route path="/quran-mp3" element={<Quran_mp3 />} />
          <Route path="/Sirah" element={<Sirah />} />


          <Route path="/Reading" element={<Reading />} />
          <Route path="/quran-bn" element={<Bangla />} />
          <Route path="/quran-ar" element={<Arbi />} />
          <Route path="/bukhari" element={<Bukhari />} />
          <Route path="/sokal-sondha" element={<Sokalsondha />} />
          <Route path="/pages/R/daily-tasbih" element={<Dtasbih />} />



          <Route path="/Tools" element={<Tools />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;