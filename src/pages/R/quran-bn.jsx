import { useEffect, useState } from "react";
import { X, MapPin, AlignLeft } from "lucide-react";

/* ===== SURAH NAME IN BANGLA ===== */
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
  81: "আত-তakভির", 82: "আল-ইনফিতার", 83: "আল-মুতাফফিফিন",
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
    fetch("https://api.alquran.cloud/v1/surah")
      .then(res => res.json())
      .then(data => setSurahs(data.data));
  }, []);

  const openSurah = (surah) => {
    setActiveSurah(surah);
    setLoading(true);

    // আরবির জন্য নূরানী স্টাইল (Indopak) এবং বাংলার জন্য এডিশন ব্যবহার করা হয়েছে
    fetch(
      `https://api.alquran.cloud/v1/surah/${surah.number}/editions/quran-indopak,bn.bengali`
    )
      .then(res => res.json())
      .then(data => {
        const ar = data.data[0].ayahs;
        const bn = data.data[1].ayahs;

        setAyahs(
          ar.map((a, i) => ({
            number: a.numberInSurah,
            ar: a.text,
            bn: bn[i]?.text || ""
          }))
        );
        setLoading(false);
      });
  };

  const closeSurah = () => {
    setActiveSurah(null);
    setAyahs([]);
  };

  return (
    <div className="p-0 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white px-2">
        📖 পবিত্র কুরআন
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {surahs.map(s => (
          <button
            key={s.number}
            onClick={() => openSurah(s)}
            className="group relative overflow-hidden p-5 rounded-3xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
          >
            <div className="absolute top-0 right-0 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-bl-3xl font-bold text-sm">
              #{s.number}
            </div>

            <div className="flex flex-col gap-4">
              <div className="pr-10">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {SURAH_NAME_BN[s.number]}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1 mt-1">
                  <AlignLeft size={14} /> {s.numberOfAyahs} আয়াত
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-2 border-t border-slate-50 dark:border-slate-800 pt-4">
                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md flex items-center gap-1">
                  <MapPin size={12} /> {s.revelationType === 'Meccan' ? 'মাক্কী' : 'মাদানী'}
                </span>
                <span className="font-arabic text-2xl text-emerald-700 dark:text-emerald-500 opacity-80 group-hover:opacity-100 transition-opacity">
                  {s.name}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeSurah && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex justify-center items-center p-0 md:p-6">
          <div className="bg-white dark:bg-gray-950 w-full max-w-5xl h-full md:h-[90vh] md:rounded-3xl shadow-2xl flex flex-col overflow-hidden border dark:border-slate-800">
            
            <div className="p-6 bg-white dark:bg-gray-900 border-b dark:border-gray-800 flex justify-between items-center shadow-sm shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner">
                  {activeSurah.number}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-none">
                    {SURAH_NAME_BN[activeSurah.number]}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                    {activeSurah.name} • {activeSurah.numberOfAyahs} আয়াত
                  </p>
                </div>
              </div>

              <button
                onClick={closeSurah}
                className="p-3 rounded-2xl bg-slate-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-500/20 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 custom-scroll">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 py-20">
                  <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold animate-pulse">লোড হচ্ছে...</p>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto">
                  {activeSurah.number !== 1 && activeSurah.number !== 9 && (
                    <div className="text-center mb-12">
                      <p className="text-4xl md:text-5xl font-arabic text-slate-800 dark:text-white leading-relaxed">
                        بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                      </p>
                    </div>
                  )}

                  {ayahs.map((a, idx) => (
                    <div key={idx} className="group relative border-b border-slate-100 dark:border-gray-800/50 pb-12 last:border-0 mb-8">
                      <div className="flex flex-col gap-8">
                        <div className="flex flex-row-reverse items-start gap-4">
                          {/* BD Nurani Font Style Applied Here */}
                          <p className="text-right text-4xl md:text-5xl leading-[3.2] font-arabic text-slate-900 dark:text-slate-50 w-full"
                             style={{ fontFamily: "'Noto Naskh Arabic', serif", wordSpacing: '4px' }}>
                            {a.ar}
                            <span className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 ml-4 md:ml-6 text-sm md:text-lg font-bold rounded-full border-2 border-emerald-500/20 text-emerald-600 dark:text-emerald-500 align-middle">
                                {a.number}
                            </span>
                          </p>
                        </div>

                        <div className="flex items-start gap-4">
                          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium pl-6 border-l-4 border-emerald-500/40">
                            {a.bn}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Footer gap to ensure visibility */}
                  <div className="h-20" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto_Naskh_Arabic:wght@400;700&display=swap');
        
        .font-arabic {
          font-family: 'Noto Naskh Arabic', serif;
        }

        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
}