import { BrowserRouter, Routes, Route } from "react-router-dom";
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

import Tools from "./HomeContent/Tools";

function App() {
  return (
    <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 mb-32"> {/* Added mb-32 for player spacing */}
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

              <Route path="/Tools" element={<Tools />} />
            </Routes>
          </main>
        
          <Footer />
        </div>

    </BrowserRouter>
  );
}

export default App;
