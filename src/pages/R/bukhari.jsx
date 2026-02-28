import { useEffect, useState } from "react";
import { Book, ChevronRight, ArrowLeft, Hash } from "lucide-react";

export default function BukhariShorif() {
  const [chapters, setChapters] = useState([]);
  const [activeChapter, setActiveChapter] = useState(null);
  const [hadiths, setHadiths] = useState([]);
  const [loading, setLoading] = useState(false);

  // ১. বইয়ের অধ্যায় লোড করা
  useEffect(() => {
    setLoading(true);
    fetch("https://api.hadith.sutanlab.id/books/bukhari")
      .then(res => res.json())
      .then(data => {
        // SutanLab API থেকে chapters
        const totalHadiths = data.data.available;
        const chapterList = [];
        const chunk = 50; // প্রতি chapter 50 হাদীস ধরে নিলে
        let id = 1;
        for (let start = 1; start <= totalHadiths; start += chunk) {
          const end = Math.min(start + chunk - 1, totalHadiths);
          chapterList.push({ id: id++, name: `হাদীস নং ${start} - ${end}`, start, end });
        }
        setChapters(chapterList);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ২. নির্দিষ্ট অধ্যায়ের হাদীস লোড করা
  const loadHadiths = (chapter) => {
    setLoading(true);
    setActiveChapter(chapter);

    fetch(`https://api.hadith.sutanlab.id/books/bukhari?range=${chapter.start}-${chapter.end}`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.data.hadiths.map(h => ({
          hadithNumber: h.number,
          arabic: h.arab,
          bengali: h.id || "অনুবাদ পাওয়া যায়নি"
        }));
        setHadiths(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3">
            <Book className="text-emerald-600" size={32} /> সহীহ বুখারী
          </h1>
          <p className="text-slate-500 mt-1 font-medium italic">ইসলামিক ফাউন্ডেশন বাংলাদেশ</p>
        </div>

        {!activeChapter ? (
          /* অধ্যায় লিস্ট ভিউ */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.length > 0 ? chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => loadHadiths(chapter)}
                className="group p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] flex items-center justify-between hover:border-emerald-500 transition-all text-left shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
                    {chapter.id}
                  </div>
                  <h3 className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600">{chapter.name}</h3>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-emerald-500" />
              </button>
            )) : (
              <div className="col-span-full text-center py-20 text-emerald-600 font-bold">লোড হচ্ছে...</div>
            )}
          </div>
        ) : (
          /* হাদীস লিস্ট ভিউ */
          <div className="space-y-8">
            <button
              onClick={() => setActiveChapter(null)}
              className="flex items-center gap-2 text-emerald-600 font-bold bg-white dark:bg-slate-900 px-5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all active:scale-95"
            >
              <ArrowLeft size={20} /> ফিরে যান
            </button>

            {loading ? (
              <div className="text-center py-20 font-bold text-emerald-600 animate-pulse">হাদীস ডাটা লোড হচ্ছে...</div>
            ) : (
              hadiths.map((h, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                  <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800 flex justify-between items-center">
                    <span className="flex items-center gap-2 text-emerald-600 font-bold">
                      <Hash size={16} /> হাদীস নং: {h.hadithNumber}
                    </span>
                  </div>

                  <div className="p-8 md:p-12">
                    {/* আরবী - নূরানী ফন্ট স্টাইল */}
                    <p className="text-right text-3xl md:text-5xl leading-[2.5] font-arabic mb-10 text-slate-900 dark:text-slate-50" dir="rtl" style={{ fontFamily: "'Noto Naskh Arabic', serif" }}>
                      {h.arabic}
                    </p>

                    {/* অনুবাদ */}
                    <div className="space-y-4">
                      <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">অনুবাদ</p>
                      <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {h.bengali}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto_Naskh_Arabic:wght@400;700&display=swap');
        .font-arabic {
          font-family: 'Noto Naskh Arabic', serif;
        }
      `}</style>
    </div>
  );
}