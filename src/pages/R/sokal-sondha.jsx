import React, { useState, useEffect } from 'react';
import { 
    BookOpen, 
    Clock, 
    Moon, 
    Sun, 
    Star,
    Shield,
    Heart,
    Sparkles,
    Cloud,
    Coffee
} from 'lucide-react';

const TasbihPage = () => {
    const [activeTab, setActiveTab] = useState('morning');
    const [isDarkMode, setIsDarkMode] = useState(false);

    // ডার্ক মোড টগল
    useEffect(() => {
        // লোকাল স্টোরেজ থেকে ডার্ক মোড প্রেফারেন্স লোড
        const savedMode = localStorage.getItem('tasbihDarkMode') === 'true';
        setIsDarkMode(savedMode);
        
        // HTML এলিমেন্টে ক্লাস যোগ/বাদ
        if (savedMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

  

    // তাসবিহ ডেটা
    const zikrData = {
        morning: [
            {
                id: 1,
                arabic: "بِسْمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
                pronunciation: "বিসমিল্লাহিল্লাজি লা ইয়াদুররু মা'আসমিহি শাইউন ফিল আরদি ওয়ালা ফিস সামা-ই, ওয়াহুয়াস সামী'উল 'আলীম।",
                meaning: "আল্লাহর নামে (আরম্ভ করছি) যার নামের বরকতে আসমান ও জমিনের কোনো বস্তুই ক্ষতি করতে পারে না, তিনি সর্বশ্রোতা ও মহাজ্ঞানী।",
                virtue: "দিনের নিরাপত্তা: যে ব্যক্তি সকালে তিনবার ও সন্ধ্যায় তিনবার এই দোয়া পড়বে, কোনো কিছুই তার ক্ষতি করতে পারবে না।",
                count: 3,
                icon: <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            },
            {
                id: 2,
                arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
                pronunciation: "আ'ঊযু বিকালিমা-তিল্লা-হিত তা-ম্মা-তি মিন শাররি মা খালাক।",
                meaning: "আমি আশ্রয় চাই আল্লাহর পরিপূর্ণ বাণীসমূহের মাধ্যমে, তাঁর সৃষ্টিকুলের অনিষ্ট থেকে।",
                virtue: "সৃষ্টির ক্ষতি থেকে হেফাজত: যে ব্যক্তি সকাল-বিকাল তিনবার এই দোয়া পড়বে, তাকে কোনো বিষাক্ত প্রাণী দংশন করলেও তার ক্ষতি হবে না।",
                count: 3,
                icon: <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            },
            {
                id: 3,
                arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
                pronunciation: "হা'সবিয়াল্লাহু লা ইলাহা ইল্লা হুয়া, 'আলাইহি তাওয়াক্কালতু, ওয়া হুয়া রব্বুল 'আরশিল 'আযীম।",
                meaning: "আল্লাহই আমার জন্য যথেষ্ট, তিনি ছাড়া সত্য কোনো ইলাহ নেই। আমি তাঁরই ওপর ভরসা করেছি এবং তিনি মহান আরশের অধিপতি।",
                virtue: "যাবতীয় সমস্যার সমাধান: যে ব্যক্তি সকালে ও সন্ধ্যায় সাতবার এই দোয়া পড়বে, আল্লাহ তার সকল চিন্তা, উৎকণ্ঠা ও সমস্যা মিটিয়ে দেবেন।",
                count: 7,
                icon: <Star className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            },
            {
                id: 4,
                arabic: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ نَبِيًّا",
                pronunciation: "রাদ্বীতু বিল্লা-হি রব্বাওঁ, ওয়াবিল ইসলামি দ্বীনাওঁ, ওয়াবি মুহাম্মাদিন সাল্লাল্লাহু আলাইহি ওয়া সাল্লামা নাবিয়্যা।",
                meaning: "আমি সন্তুষ্টচিত্তে আল্লাহকে রব হিসেবে, ইসলামকে দ্বীন হিসেবে এবং মুহাম্মাদ (ﷺ)-কে নবী ও রাসূল হিসেবে গ্রহণ করেছি।",
                virtue: "আল্লাহর সন্তুষ্টি লাভ: যে ব্যক্তি সকাল-সন্ধ্যা তিনবার এই দোয়া পড়বে, কিয়ামতের দিন আল্লাহ তাকে সন্তুষ্ট করবেন।",
                count: 3,
                icon: <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            }
        ],
        evening: [
            {
                id: 5,
                arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
                pronunciation: "আল্ল-হুম্মা আনতাস সালাম, ওয়া মিনকাস সালাম, তাবারক্তা ইয়া যাল জালালি ওয়াল ইকরাম।",
                meaning: "হে আল্লাহ! আপনিই শান্তি, শান্তি শুধু আপনার পক্ষ থেকেই আসে। আপনি বরকতময়, হে মর্যাদা ও সম্মানের অধিকারী!",
                virtue: "এটি সাধারণত ফজর ও মাগরিবের ফরজ নামাজের পর পড়া হয়। সহিহ মুসলিমে বর্ণিত।",
                count: 1,
                icon: <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            },
            {
                id: 6,
                arabic: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ",
                pronunciation: "আল্ল-হুম্মা আজিরনী মিনান্ নার।",
                meaning: "হে আল্লাহ! আমাকে জাহান্নামের আগুন থেকে রক্ষা করুন।",
                virtue: "জাহান্নাম থেকে মুক্তি: যে ব্যক্তি ফজর ও মাগরিবের পর সাতবার এই দোয়া পড়ে, সে দিন বা রাতে মারা গেলে আল্লাহ তাকে জাহান্নাম থেকে রক্ষা করবেন।",
                count: 7,
                icon: <Cloud className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            }
        ],
        daily: [
            {
                id: 7,
                arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
                pronunciation: "সুবহা-নাল্লা-হি ওয়া বিহামদিহী",
                meaning: "আমি আল্লাহর প্রশংসাসহ পবিত্রতা ও মহিমা ঘোষণা করছি।",
                virtue: "যে ব্যক্তি সকালে ১০০ বার ও সন্ধ্যায় ১০০ বার এই তাসবিহ পড়বে, কিয়ামতের দিন তার চেয়ে উৎকৃষ্ট আমল আর কেউ নিয়ে আসতে পারবে না।",
                count: 100,
                icon: <Coffee className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            },
            {
                id: 8,
                arabic: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
                pronunciation: "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারিকা লাহু লাহুল মুলকু ওয়া লাহুল হামদু ইউহ্‌য়ী ওয়া ইউমিতু, ওয়া হুয়া 'আলা কুল্লি শাইয়িন কাদীর।",
                meaning: "আল্লাহ ছাড়া সত্য কোনো উপাস্য নেই, তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব তাঁরই এবং সমস্ত প্রশংসা তাঁরই জন্য। তিনি জীবন দান করেন ও মৃত্যু ঘটান এবং তিনি সবকিছুর ওপর ক্ষমতাবান।",
                virtue: "এই দোয়া পড়লে দশটি নেকি লেখা হয়, দশটি গুনাহ মাফ হয় এবং তা শয়তান থেকে রক্ষাকবচ হয়।",
                count: 10,
                icon: <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
            }
        ]
    };

    // কাউন্টার স্টেট
    const [counters, setCounters] = useState({});

    const handleCount = (id, maxCount) => {
        setCounters(prev => {
            const currentCount = prev[id] || 0;
            if (currentCount < maxCount) {
                return { ...prev, [id]: currentCount + 1 };
            }
            return prev;
        });
    };

    const resetCount = (id) => {
        setCounters(prev => ({ ...prev, [id]: 0 }));
    };

    const resetAllCounts = () => {
        setCounters({});
    };

    const getCurrentData = () => {
        switch(activeTab) {
            case 'morning': return zikrData.morning;
            case 'evening': return zikrData.evening;
            case 'daily': return zikrData.daily;
            default: return zikrData.morning;
        }
    };

    const getTabIcon = () => {
        switch(activeTab) {
            case 'morning': return <Sun className="w-4 h-4" />;
            case 'evening': return <Moon className="w-4 h-4" />;
            case 'daily': return <Clock className="w-4 h-4" />;
            default: return <Sun className="w-4 h-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans selection:bg-emerald-100 dark:selection:bg-emerald-900 selection:text-emerald-900 dark:selection:text-emerald-100 transition-colors duration-300">
            


            {/* হেডার */}
            <div className="text-center pt-8 pb-4 px-4 relative">
                <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-emerald-200 dark:border-gray-700 mb-4">
                    {getTabIcon()}
                    <span className="text-emerald-700 dark:text-emerald-400 text-sm font-medium">
                        {activeTab === 'morning' ? 'সকালের আমল' : activeTab === 'evening' ? 'সন্ধ্যার আমল' : 'নিয়মিত আমল'}
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 dark:text-white mb-3 drop-shadow-sm">
                    সকাল-সন্ধ্যার তাসবিহ
                </h1>
                <p className="text-emerald-700 dark:text-emerald-400 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm inline-block px-6 py-2 rounded-full shadow-sm border border-emerald-200 dark:border-gray-700">
                    সহিহ হাদিস ভিত্তিক জিকির ও দোয়া
                </p>
            </div>

            {/* ট্যাব */}
            <div className="flex justify-center gap-2 px-4 mt-6 mb-8">
                <button
                    onClick={() => setActiveTab('morning')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-md ${
                        activeTab === 'morning'
                            ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-lg scale-105 dark:from-amber-500 dark:to-orange-500'
                            : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                >
                    <Sun className="w-5 h-5" />
                    <span>সকাল</span>
                </button>
                
                <button
                    onClick={() => setActiveTab('evening')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-md ${
                        activeTab === 'evening'
                            ? 'bg-gradient-to-r from-indigo-400 to-purple-400 text-white shadow-lg scale-105 dark:from-indigo-500 dark:to-purple-500'
                            : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                >
                    <Moon className="w-5 h-5" />
                    <span>সন্ধ্যা</span>
                </button>
                
                <button
                    onClick={() => setActiveTab('daily')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-md ${
                        activeTab === 'daily'
                            ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-lg scale-105 dark:from-emerald-500 dark:to-teal-500'
                            : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                >
                    <Clock className="w-5 h-5" />
                    <span>নিয়মিত</span>
                </button>
            </div>

            {/* রিসেট অল বাটন */}
            <div className="max-w-4xl mx-auto px-4 mb-4 flex justify-end">
                <button
                    onClick={resetAllCounts}
                    className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400 transition-colors border border-gray-200 dark:border-gray-700 text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                    <span>সব রিসেট</span>
                </button>
            </div>

            {/* জিকির কার্ড */}
            <div className="max-w-4xl mx-auto px-4 pb-12 space-y-6">
                {getCurrentData().map((zikr) => (
                    <div
                        key={zikr.id}
                        className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-100 dark:border-gray-700 overflow-hidden"
                    >
                        {/* আরবি অংশ */}
                        <div className="bg-gradient-to-l from-emerald-50 via-white to-emerald-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 p-6 border-b border-emerald-100 dark:border-gray-700">
                            <div className="flex items-start gap-3">
                                <div className="bg-emerald-100 dark:bg-gray-700 p-2 rounded-full">
                                    {zikr.icon}
                                </div>
                                <div className="flex-1 text-right">
                                    <p className="text-3xl md:text-4xl font-arabic leading-loose text-gray-900 dark:text-white" dir="rtl">
                                        {zikr.arabic}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* বিবরণ */}
                        <div className="p-6 space-y-4">
                            {/* উচ্চারণ */}
                            <div className="bg-emerald-50/70 dark:bg-gray-700/50 p-4 rounded-xl">
                                <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-emerald-500 dark:bg-emerald-400 rounded-full"></span>
                                    উচ্চারণ
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
                                    {zikr.pronunciation}
                                </p>
                            </div>

                            {/* অর্থ */}
                            <div className="bg-blue-50/70 dark:bg-gray-700/50 p-4 rounded-xl">
                                <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-blue-500 dark:bg-blue-400 rounded-full"></span>
                                    অর্থ
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {zikr.meaning}
                                </p>
                            </div>

                            {/* ফজিলত ও কাউন্টার */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
                                <div className="bg-amber-50/70 dark:bg-gray-700/50 p-4 rounded-xl flex-1">
                                    <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
                                        <span className="w-1 h-4 bg-amber-500 dark:bg-amber-400 rounded-full"></span>
                                        ফজিলত
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        {zikr.virtue}
                                    </p>
                                </div>

                                {/* কাউন্টার */}
                                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-xl min-w-[200px]">
                                    <button
                                        onClick={() => resetCount(zikr.id)}
                                        className="px-3 py-1.5 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-sm font-medium"
                                    >
                                        রিসেট
                                    </button>
                                    <div className="flex-1 text-center">
                                        <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                                            {counters[zikr.id] || 0}
                                        </span>
                                        <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                                            / {zikr.count}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleCount(zikr.id, zikr.count)}
                                        disabled={(counters[zikr.id] || 0) >= zikr.count}
                                        className={`px-4 py-2 rounded-lg transition-all transform active:scale-95 ${
                                            (counters[zikr.id] || 0) >= zikr.count
                                                ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-600 dark:text-gray-400'
                                                : 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white shadow-md hover:shadow-lg'
                                        }`}
                                    >
                                        +১
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ফুটার */}
            <footer className="text-center py-6 text-emerald-700 dark:text-emerald-400 border-t border-emerald-200 dark:border-gray-700 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                <p className="text-sm">
                    সহিহ হাদিস ভিত্তিক সকাল-সন্ধ্যার জিকির • সমস্ত দুআ বিশুদ্ধ সূত্রে বর্ণিত
                </p>
                <p className="text-xs mt-2 text-emerald-500 dark:text-emerald-500">
                    আল্লাহ তাআলা আমাদের সবাইকে সঠিকভাবে আমল করার তাওফিক দান করুন।
                </p>
            </footer>
        </div>
    );
};

export default TasbihPage;