import { useEffect, useState } from "react";
import { X, MapPin, AlignLeft, Book } from "lucide-react";

const SURAH_NAME_BN = {
  1: "আল-ফাতিহা", 2: "আল-বাকারা", 3: "আল ইমরান", 4: "আন-নিসা",
  5: "আল-মায়িদা", 6: "আল-আনআম", 7: "আল-আরাফ", 8: "আল-আনফাল",
  9: "আত-তাওবা", 10: "ইউনুস", 11: "হুদ", 12: "ইউসুফ",
  13: "আর-রাদ", 14: "ইব্রাহিম", 15: "আল-হিজর", 16: "আন-নাহল",
  17: "বনি ইসরাইল", 18: "আল-কাহফ", 19: "মারইয়াম", 20: "ত্ব-হা",
  21: "আল-আম্বিয়া", 22: "আল-হাজ্জ", 23: "আল-মুমিনুন",
  24: "আন-নূর", 25: "আল-ফুরকান", 26: "আশ-শু'আরা",
  27: "আন-নামল", 28: "আল-কাসাস", 29: "আল-আনকাবুত",
  30: "আর-রূম", 31: "লুকমান", 32: "আস-সাজদা",
  33: "আল-আহযাব", 34: "সাবা", 35: "ফাতির",
  36: "ইয়াসিন", 37: "আস-সাফফাত", 38: "সোয়াদ",
  39: "আয-যুমার", 40: "গাফির", 41: "ফুসসিলাত",
  42: "আশ-শূরা", 43: "আয-যুখরুফ", 44: "আদ-দুখান",
  45: "আল-জাসিয়া", 46: "আল-আহকাফ", 47: "মুহাম্মদ",
  48: "আল-ফাতহ", 49: "আল-হুজুরাত", 50: "ক্বাফ",
  51: "আয-যারিয়াত", 52: "আত-তূর", 53: "আন-নাজম",
  54: "আল-কামার", 55: "আর-রাহমান", 56: "আল-ওয়াক্বিয়া",
  57: "আল-হাদিদ", 58: "আল-মুজাদিলা", 59: "আল-হাশর",
  60: "আল-মুমতাহিনা", 61: "আস-সাফ", 62: "আল-জুমু'আ",
  63: "আল-মুনাফিকুন", 64: "আত-তাগাবুন", 65: "আত-তালাক",
  66: "আত-তাহরিম", 67: "আল-মুলক", 68: "আল-কলম",
  69: "আল-হাক্কা", 70: "আল-মা'আরিজ", 71: "নূহ",
  72: "আল-জিন", 73: "আল-মুযযাম্মিল", 74: "আল-মুদ্দাসসির",
  75: "আল-কিয়ামাহ", 76: "আদ-দাহর", 77: "আল-মুরসালাত",
  78: "আন-নাবা", 79: "আন-নাযিয়াত", 80: "আবাসা",
  81: "আত-তাকভির", 82: "আল-ইনফিতার", 83: "আল-মুতাফফিফিন",
  84: "আল-ইনশিকাক", 85: "আল-বুরুজ", 86: "আত-তারিক",
  87: "আল-আ'লা", 88: "আল-গাশিয়া", 89: "আল-ফজর",
  90: "আল-বালাদ", 91: "আশ-শামস", 92: "আল-লাইল",
  93: "আদ-দুহা", 94: "আশ-শারহ", 95: "আত-তিন",
  96: "আল-আলাক", 97: "আল-কদর", 98: "আল-বাইয়্যিনা",
  99: "আয-যিলযাল", 100: "আল-আদিয়াত", 101: "আল-কারিয়া",
  102: "আত-তাকাসুর", 103: "আল-আসর", 104: "আল-হুমাজা",
  105: "আল-ফিল", 106: "কুরাইশ", 107: "আল-মাউন",
  108: "আল-কাওসার", 109: "আল-কাফিরুন", 110: "আন-নাসর",
  111: "আল-লাহাব", 112: "আল-ইখলাস", 113: "আল-ফালাক",
  114: "আন-নাস"
};

export default function Quran() {
  const [surahs, setSurahs] = useState([]);
  const [activeSurah, setActiveSurah] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeSurah) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [activeSurah]);

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then(res => res.json())
      .then(data => setSurahs(data.data));
  }, []);

  const openSurah = (surah) => {
    setActiveSurah(surah);
    setLoading(true);
    // নূরানী স্টাইল আরবির জন্য 'quran-indopak' সবথেকে সেরা (BD তে এটাই চলে)
    fetch(`https://api.alquran.cloud/v1/surah/${surah.number}/quran-indopak`)
      .then(res => res.json())
      .then(data => {
        setAyahs(data.data.ayahs);
        setLoading(false);
      });
  };

  return (
    <div className="p-0 min-h-screen font-sans">
      <header className="max-w-7xl mx-auto mb-8 mt-4 px-2">
        <h1 className="text-2xl font-bold dark:text-white flex items-center gap-2">
          <Book className="text-emerald-600" size={24} /> আল-কুরআন
        </h1>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
        {surahs.map(s => (
          <button
            key={s.number}
            onClick={() => openSurah(s)}
            className="group relative overflow-hidden p-5 rounded-3xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-left"
          >
            <div className="absolute top-0 right-0 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-bl-2xl font-bold text-xs">
              #{s.number}
            </div>
            <h3 className="text-lg font-bold dark:text-white group-hover:text-emerald-600">{SURAH_NAME_BN[s.number]}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded flex items-center gap-1 dark:text-slate-400">
                <MapPin size={10} /> {s.revelationType === 'Meccan' ? 'মাক্কী' : 'মাদানী'}
              </span>
              <span className="font-arabic text-xl text-emerald-700">{s.name}</span>
            </div>
          </button>
        ))}
      </div>

      {activeSurah && (
        <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/60 backdrop-blur-sm p-4 md:p-10">
          <div className="bg-[#fffdf9] dark:bg-gray-950 w-full max-w-5xl max-h-full flex flex-col rounded-3xl shadow-2xl overflow-hidden border dark:border-gray-800">
            
            <div className="px-6 py-4 border-b dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-xl font-bold">{activeSurah.number}</span>
                <h2 className="text-xl font-bold dark:text-white">{SURAH_NAME_BN[activeSurah.number]}</h2>
              </div>
              <button onClick={() => setActiveSurah(null)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all">
                <X size={26} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scroll-smooth custom-scroll">
              <div className="p-6 md:p-12 max-w-3xl mx-auto text-center">
                {loading ? (
                  <div className="py-20 flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                    <p className="text-emerald-600 font-bold">লোড হচ্ছে...</p>
                  </div>
                ) : (
                  <>
                    {activeSurah.number !== 1 && activeSurah.number !== 9 && (
                      <div className="mb-14 mt-4">
                        <p className="text-4xl md:text-5xl font-arabic text-slate-800 dark:text-white">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
                      </div>
                    )}

                    <div className="text-right leading-[3.8] md:leading-[4.8] mb-20" dir="rtl">
                      {ayahs.map((a, idx) => (
                        <span key={idx} className="inline font-arabic text-4xl md:text-5xl text-slate-900 dark:text-slate-100 antialiased">
                          {a.text}
                          <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 mx-3 text-[12px] font-sans font-bold rounded-full border border-emerald-500/30 text-emerald-600 align-middle">
                            {a.numberInSurah}
                          </span>
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* নূরানী কুরআনের জন্য পারফেক্ট ফন্ট (Indopak Style) */
        @import url('https://fonts.googleapis.com/css2?family=Noto_Naskh_Arabic:wght@400;700&display=swap');
        
        .font-arabic {
          font-family: 'Noto Naskh Arabic', serif;
          word-spacing: 4px;
        }
        
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; margin-bottom: 20px; margin-top: 20px; }
      `}</style>
    </div>
  );
}