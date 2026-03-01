import React, { useState, useEffect } from 'react';
import { 
    BookOpen, Heart, Star, Moon, Sun, Cloud, Shield, 
    Sparkles, Coffee, Bell, Award, Infinity, RefreshCw, 
    CheckCircle, AlertCircle, Clock 
} from 'lucide-react';

const DailyTasbih = () => {
    // স্টেট ম্যানেজমেন্ট
    const [counters, setCounters] = useState({});
    const [completedZikr, setCompletedZikr] = useState({});
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);

    // ডার্ক মোড টগল
    useEffect(() => {
        // লোকাল স্টোরেজ থেকে ডার্ক মোড প্রেফারেন্স লোড
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(savedMode);
        
        // HTML এলিমেন্টে ক্লাস যোগ/বাদ
        if (savedMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const dailyZikrData = [
        {
            id: 1,
            category: "সকাল-সন্ধ্যার তাসবিহ",
            categoryIcon: <Sun className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
            arabic: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
            pronunciation: "সুবহা-নাল্লা-হি ওয়া বিহামদিহী",
            meaning: "আমি আল্লাহর প্রশংসাসহ পবিত্রতা ও মহিমা ঘোষণা করছি।",
            virtue: "যে ব্যক্তি সকালে ১০০ বার ও সন্ধ্যায় ১০০ বার এই তাসবিহ পড়বে, কিয়ামতের দিন তার চেয়ে উৎকৃষ্ট আমল আর কেউ নিয়ে আসতে পারবে না।",
            recommendedCount: 100,
            timePreference: "সকাল-সন্ধ্যা",
            hadith: "সহিহ মুসলিম ২৬৯২",
            icon: <Coffee className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        },
        {
            id: 2,
            category: "ফজর ও মাগরিবের পর",
            categoryIcon: <Moon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />,
            arabic: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
            pronunciation: "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারিকা লাহু লাহুল মুলকু ওয়া লাহুল হামদু ইউহ্‌য়ী ওয়া ইউমিতু, ওয়া হুয়া 'আলা কুল্লি শাইয়িন কাদীর।",
            meaning: "আল্লাহ ছাড়া সত্য কোনো উপাস্য নেই, তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব তাঁরই এবং সমস্ত প্রশংসা তাঁরই জন্য।",
            virtue: "এই দোয়া পড়লে দশটি নেকি লেখা হয়, দশটি গুনাহ মাফ হয় এবং তা শয়তান থেকে রক্ষাকবচ হয়।",
            recommendedCount: 10,
            timePreference: "ফজর-মাগরিব",
            hadith: "সহিহ বুখারী ৬৩২৯",
            icon: <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        },
        {
            id: 3,
            category: "সকাল-সন্ধ্যা",
            categoryIcon: <Cloud className="w-4 h-4 text-sky-500 dark:text-sky-400" />,
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
            pronunciation: "আল্লাহুম্মা ইন্নি আসআলুকা ইলমান নাফিআ, ওয়া রিজকান ত্বাইয়িবা, ওয়া আমালান মুতাকাব্বালা।",
            meaning: "হে আল্লাহ! আমি আপনার কাছে উপকারী জ্ঞান, পবিত্র রিজিক এবং কবুলকৃত আমল প্রার্থনা করছি।",
            virtue: "যে ব্যক্তি সকালে এই দোয়া পড়ে, তার জন্য উপকারী জ্ঞান, পবিত্র রিজিক এবং কবুলকৃত আমলের দুআ করা হয়।",
            recommendedCount: 1,
            timePreference: "সকাল-সন্ধ্যা",
            hadith: "সুনানে ইবনে মাজাহ ৯২৫",
            icon: <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400" />
        },
        {
            id: 4,
            category: "ঘুমানোর আগে",
            categoryIcon: <Moon className="w-4 h-4 text-purple-500 dark:text-purple-400" />,
            arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
            pronunciation: "বিসমিকা আল্লাহুম্মা আমূতু ওয়া আহ্‌ইয়া।",
            meaning: "হে আল্লাহ! আপনার নামেই আমি মৃত্যুবরণ করি এবং জীবন লাভ করি।",
            virtue: "ঘুমানোর আগে এই দোয়া পড়লে সারা রাত যিকিরের সওয়াব পাওয়া যায়।",
            recommendedCount: 1,
            timePreference: "শোবার সময়",
            hadith: "সহিহ বুখারী ৬৩২৪",
            icon: <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        },
        {
            id: 5,
            category: "প্রত্যেক কাজের শুরুতে",
            categoryIcon: <Bell className="w-4 h-4 text-green-500 dark:text-green-400" />,
            arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
            pronunciation: "বিসমিল্লাহির রাহমানির রাহীম।",
            meaning: "পরম করুণাময় অসীম দয়ালু আল্লাহর নামে (শুরু করছি)।",
            virtue: "বিসমিল্লাহ দিয়ে শুরু না হলে কোনো কাজের বরকত হয় না।",
            recommendedCount: "সর্বদা",
            timePreference: "যেকোনো সময়",
            hadith: "সহিহ বুখারী",
            icon: <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
        },
        {
            id: 6,
            category: "ক্ষমা প্রার্থনা",
            categoryIcon: <Heart className="w-4 h-4 text-rose-500 dark:text-rose-400" />,
            arabic: "أَسْتَغْفِرُ اللَّهَ",
            pronunciation: "আস্তাগফিরুল্লাহ।",
            meaning: "আমি আল্লাহর কাছে ক্ষমা প্রার্থনা করছি।",
            virtue: "যে ব্যক্তি নিয়মিত ইস্তিগফার পড়ে, আল্লাহ তাকে সব সংকট থেকে মুক্তির পথ বের করে দেন।",
            recommendedCount: "১০০ বার",
            timePreference: "দৈনিক",
            hadith: "সুনানে আবু দাউদ",
            icon: <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" />
        },
        {
            id: 7,
            category: "দরুদ শরীফ",
            categoryIcon: <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />,
            arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
            pronunciation: "আল্লাহুম্মা সাল্লি আলা মুহাম্মাদিও ওয়া আলা আলি মুহাম্মাদ।",
            meaning: "হে আল্লাহ! আপনি মুহাম্মাদ (ﷺ) এবং তার পরিবারের ওপর রহমত বর্ষণ করুন।",
            virtue: "যে ব্যক্তি একবার দরুদ পড়ে, আল্লাহ তার ওপর দশবার রহমত বর্ষণ করেন।",
            recommendedCount: "১০০ বার",
            timePreference: "দৈনিক",
            hadith: "সহিহ মুসলিম",
            icon: <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        },
        {
            id: 8,
            category: "তাওহীদের তাসবিহ",
            categoryIcon: <Infinity className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
            arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
            pronunciation: "লা ইলাহা ইল্লাল্লাহু।",
            meaning: "আল্লাহ ছাড়া সত্য কোনো উপাস্য নেই।",
            virtue: "এটি জান্নাতের চাবি। যে ব্যক্তি শেষ নিঃশ্বাস পর্যন্ত এই কালিমা পড়ে, সে জান্নাতে যাবে।",
            recommendedCount: "১০০ বার",
            timePreference: "দৈনিক",
            hadith: "সহিহ বুখারী",
            icon: <Infinity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        },
        {
            id: 9,
            category: "পানাহারের দোয়া",
            categoryIcon: <Coffee className="w-4 h-4 text-orange-500 dark:text-orange-400" />,
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
            pronunciation: "আলহামদু লিল্লাহিল্লাজি আত'আমানি হাজা ওয়া রাজাকানিহি মিন গাইরি হাওলিন মিন্নি ওয়া লা কুওয়াতিন।",
            meaning: "সকল প্রশংসা আল্লাহর যিনি আমাকে এই খাবার খাওয়ালেন এবং রিজিক দিলেন।",
            virtue: "পূর্বের গুনাহ মাফ হয়ে যায়।",
            recommendedCount: "পড়ুন",
            timePreference: "পানাহারের পর",
            hadith: "সুনানে তিরমিজি",
            icon: <Coffee className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        },
        {
            id: 10,
            category: "ঘর থেকে বের হওয়ার দোয়া",
            categoryIcon: <Shield className="w-4 h-4 text-blue-500 dark:text-blue-400" />,
            arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
            pronunciation: "বিসমিল্লাহি, তাওয়াক্কালতু আলাল্লাহি, ওয়া লা হাওলা ওয়ালা কুওয়াতা ইল্লা বিল্লাহ।",
            meaning: "আল্লাহর নামে, আল্লাহর ওপর ভরসা করছি, আল্লাহ ছাড়া কারো কোনো ক্ষমতা নেই।",
            virtue: "শয়তান থেকে রক্ষা পাওয়া যায় এবং হেদায়েত পাওয়া যায়।",
            recommendedCount: "পড়ুন",
            timePreference: "বের হওয়ার সময়",
            hadith: "সুনানে তিরমিজি",
            icon: <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        }
    ];

    // হ্যান্ডলার ফাংশন
    const handleCount = (id, maxCount) => {
        if (typeof maxCount !== 'number') return;
        
        const currentCount = counters[id] || 0;
        if (currentCount < maxCount) {
            const newCount = currentCount + 1;
            setCounters(prev => ({ ...prev, [id]: newCount }));
            
            if (newCount === maxCount) {
                setCompletedZikr(prev => ({ ...prev, [id]: true }));
                showNotificationMessage("🎉 মাশাআল্লাহ! আপনি এই জিকির সম্পন্ন করেছেন।");
            }
        }
    };

    const resetCount = (id) => {
        setCounters(prev => ({ ...prev, [id]: 0 }));
        setCompletedZikr(prev => ({ ...prev, [id]: false }));
        showNotificationMessage("কাউন্টার রিসেট করা হয়েছে");
    };

    const resetAllCounts = () => {
        setCounters({});
        setCompletedZikr({});
        showNotificationMessage("সব কাউন্টার রিসেট করা হয়েছে");
    };

    const showNotificationMessage = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const groupedByCategory = dailyZikrData.reduce((acc, zikr) => {
        if (!acc[zikr.category]) acc[zikr.category] = [];
        acc[zikr.category].push(zikr);
        return acc;
    }, {});

    const completedCount = Object.values(completedZikr).filter(Boolean).length;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans selection:bg-emerald-100 dark:selection:bg-emerald-900 selection:text-emerald-900 dark:selection:text-emerald-100 transition-colors duration-300">
            {/* নোটিফিকেশন */}
            {showNotification && (
                <div className="fixed top-4 right-4 z-[100] animate-slideDown">
                    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-200 dark:border-gray-700">
                        <CheckCircle className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                        <p className="font-medium text-sm">{notificationMessage}</p>
                    </div>
                </div>
            )}

            {/* হেডার */}
            <header className="relative py-12 px-4 text-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
                <button 
                    onClick={toggleDarkMode}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    {isDarkMode ? 
                        <Sun className="w-5 h-5 text-yellow-500" /> : 
                        <Moon className="w-5 h-5 text-gray-700" />
                    }
                </button>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                    দৈনিক <span className="text-emerald-600 dark:text-emerald-400">তাসবিহ</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-2xl mx-auto">
                    সহিহ হাদিসের আলোকে প্রতিদিনের পঠিতব্য জিকির ও দুআসমূহ
                </p>
            </header>

            {/* স্ট্যাটাস কার্ডস */}
            <div className="max-w-6xl mx-auto px-4 -mt-6 grid grid-cols-4 gap-2 relative z-10">
                <StatusCard 
                    icon={<BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />} 
                    label="মোট" 
                    value={`${dailyZikrData.length}`} 
                />
                <StatusCard 
                    icon={<Star className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />} 
                    label="সম্পন্ন" 
                    value={`${completedCount}`}
                />
                <StatusCard 
                    icon={<Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />} 
                    label="ক্যাটাগরি" 
                    value={`${Object.keys(groupedByCategory).length}`}
                />
                <button 
                    onClick={resetAllCounts}
                    className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all group"
                >
                    <RefreshCw className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 group-hover:rotate-180 transition-transform duration-500 mx-auto" />
                    <span className="text-[9px] font-medium text-gray-500 dark:text-gray-400 mt-1 block">রিসেট</span>
                </button>
            </div>

            {/* জিকির লিস্ট */}
            <main className="max-w-4xl mx-auto px-4 mt-10 space-y-10 pb-16">
                {Object.entries(groupedByCategory).map(([category, zikrs]) => (
                    <section key={category}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
                            <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-4 py-1.5 rounded-full">
                                {category}
                            </h2>
                            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
                        </div>

                        <div className="space-y-4">
                            {zikrs.map(zikr => (
                                <ZikrCard 
                                    key={zikr.id} 
                                    zikr={zikr} 
                                    count={counters[zikr.id] || 0}
                                    isCompleted={completedZikr[zikr.id]}
                                    onCount={() => handleCount(zikr.id, zikr.recommendedCount)}
                                    onReset={() => resetCount(zikr.id)}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
};

// সাব-কম্পোনেন্ট: স্ট্যাটাস কার্ড
const StatusCard = ({ icon, label, value }) => (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center">
        <div className="mb-1">{icon}</div>
        <p className="text-[8px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">{label}</p>
        <p className="text-sm font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
);

// সাব-কম্পোনেন্ট: জিকির কার্ড
const ZikrCard = ({ zikr, count, isCompleted, onCount, onReset }) => {
    const isNumberCount = typeof zikr.recommendedCount === 'number';
    
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${
            isCompleted 
                ? 'border-emerald-300 dark:border-emerald-700 ring-2 ring-emerald-50 dark:ring-emerald-900/20' 
                : 'border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-700'
        }`}>
            <div className="p-5">
                {/* হেডার */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">{zikr.icon}</div>
                        <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{zikr.timePreference}</span>
                    </div>
                    {isCompleted && (
                        <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[8px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                            সম্পন্ন
                        </span>
                    )}
                </div>

                {/* আরবি */}
                <p className="text-xl md:text-2xl text-right font-arabic leading-relaxed mb-4 text-gray-900 dark:text-white" dir="rtl">
                    {zikr.arabic}
                </p>

                {/* উচ্চারণ ও অর্থ */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <p className="text-[8px] font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-1">উচ্চারণ</p>
                        <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">{zikr.pronunciation.substring(0, 30)}...</p>
                    </div>
                    <div>
                        <p className="text-[8px] font-bold text-blue-600 dark:text-blue-400 uppercase mb-1">অর্থ</p>
                        <p className="text-[11px] text-gray-500 dark:text-gray-500 italic">{zikr.meaning.substring(0, 25)}...</p>
                    </div>
                </div>

                {/* ফজিলত */}
                <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg mb-3">
                    <p className="text-[9px] text-gray-600 dark:text-gray-400 flex items-start gap-1">
                        <AlertCircle className="w-3 h-3 text-amber-500 dark:text-amber-400 shrink-0" />
                        <span className="line-clamp-1">{zikr.virtue.substring(0, 60)}... <span className="text-gray-500 dark:text-gray-500">({zikr.hadith})</span></span>
                    </p>
                </div>

                {/* কাউন্টার */}
                <div className="flex items-center gap-2">
                    <button 
                        onClick={onReset}
                        className="p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    
                    {isNumberCount ? (
                        <button 
                            onClick={onCount}
                            disabled={isCompleted}
                            className={`flex-1 flex items-center justify-between px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                                isCompleted 
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 cursor-not-allowed' 
                                : 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm hover:bg-emerald-700 dark:hover:bg-emerald-600'
                            }`}
                        >
                            <span>পড়ুন</span>
                            <div className="flex items-center gap-1">
                                <span className="font-bold">{count}</span>
                                <span className="text-[10px] opacity-60">/ {zikr.recommendedCount}</span>
                            </div>
                        </button>
                    ) : (
                        <div className="flex-1 bg-gray-100 dark:bg-gray-700 px-4 py-2.5 rounded-xl text-center">
                            <span className="text-xs text-gray-600 dark:text-gray-400">{zikr.recommendedCount}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DailyTasbih;