import { useState, useEffect, useRef } from 'react';
import {
  Play, Pause, ListMusic, Users, X, Volume2, SkipBack, SkipForward, Music,
  Headphones, Search, Heart, Mic2, Radio, Sparkles, Waves, Disc3, Repeat, ChevronDown
} from 'lucide-react';
import surahData from '../../surahs.json';
import SURAH_INFO from '../../surahMeta.json';

const QARIS = [
  {
    id: 'ar.alafasy',
    name: 'মিশারী রশিদ আল-আফাসী',
    nameEn: 'Mishary Rashid Alafasy',
    country: 'কুয়েত',
    style: 'মুরাত্তাল',
    sources: [
      (surah) => `https://download.quranicaudio.com/quran/mishary_rashid_alafasy/${surah.toString().padStart(3, '0')}.mp3`,
      (surah) => `https://server8.mp3quran.net/afs/${surah.toString().padStart(3, '0')}.mp3`,
      (surah) => `https://server11.mp3quran.net/afs/${surah.toString().padStart(3, '0')}.mp3`
    ],
    color: 'emerald',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    popularity: 5
  },
  {
    id: 'ar.sudais',
    name: 'আব্দুর রহমান আস-সুদাইস',
    nameEn: 'Abdur Rahman Al-Sudais',
    country: 'সৌদি আরব',
    style: 'মুজাওয়াদ',
    sources: [
      (surah) => `https://download.quranicaudio.com/quran/abdurrahmaan_as-sudais/${surah.toString().padStart(3, '0')}.mp3`,
      (surah) => `https://server8.mp3quran.net/sds/${surah.toString().padStart(3, '0')}.mp3`,
      (surah) => `https://server11.mp3quran.net/sds/${surah.toString().padStart(3, '0')}.mp3`
    ],
    color: 'blue',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400',
    popularity: 5
  },
  {
    id: 'ar.abdulbasitmurattal',
    name: 'আব্দুল বাসিত আব্দুস সামাদ',
    nameEn: 'Abdul Basit Abdus Samad',
    country: 'মিশর',
    style: 'মুরাত্তাল',
    sources: [
      (surah) => `https://download.quranicaudio.com/quran/abdul_basit_murattal/${surah.toString().padStart(3, '0')}.mp3`,
      (surah) => `https://server8.mp3quran.net/basit/${surah.toString().padStart(3, '0')}.mp3`
    ],
    color: 'purple',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    textColor: 'text-purple-600 dark:text-purple-400',
    popularity: 4
  },
  {
    id: 'ar.minshawi',
    name: 'মুহাম্মদ সিদ্দিক আল-মিনশাবী',
    nameEn: 'Muhammad Siddiq Al-Minshawi',
    country: 'মিশর',
    style: 'মুরাত্তাল',
    sources: [
      (surah) => `https://download.quranicaudio.com/quran/muhammad_siddiq_al-minshawi/${surah.toString().padStart(3, '0')}.mp3`,
      (surah) => `https://server8.mp3quran.net/minsh/${surah.toString().padStart(3, '0')}.mp3`
    ],
    color: 'amber',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    textColor: 'text-amber-600 dark:text-amber-400',
    popularity: 4
  },
  {
    id: 'ar.husary',
    name: 'মাহমুদ খলিল আল-হুসারি',
    nameEn: 'Mahmoud Khalil Al-Husary',
    country: 'মিশর',
    style: 'মুরাত্তাল',
    sources: [
      (surah) => `https://download.quranicaudio.com/quran/mahmood_khaleel_al-husary/${surah.toString().padStart(3, '0')}.mp3`,
      (surah) => `https://server8.mp3quran.net/husr/${surah.toString().padStart(3, '0')}.mp3`
    ],
    color: 'rose',
    bgColor: 'bg-rose-100 dark:bg-rose-900/30',
    textColor: 'text-rose-600 dark:text-rose-400',
    popularity: 4
  },
  {
    id: 'ar.ajamy',
    name: 'আহমেদ আল-আজমি',
    nameEn: 'Ahmed Al-Ajamy',
    country: 'সৌদি আরব',
    style: 'মুরাত্তাল',
    sources: [
      (surah) => `https://download.quranicaudio.com/quran/ahmed_ajamy/${surah.toString().padStart(3, '0')}.mp3`,
      (surah) => `https://server8.mp3quran.net/ajm/${surah.toString().padStart(3, '0')}.mp3`
    ],
    color: 'indigo',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    popularity: 3
  },
  {
    id: 'ar.maher',
    name: 'মাহের আল-মুইকলি',
    nameEn: 'Maher Al-Muaiqly',
    country: 'সৌদি আরব',
    style: 'মুরাত্তাল',
    sources: [
      (surah) => `https://download.quranicaudio.com/quran/maher_al-muaiqly/${surah.toString().padStart(3, '0')}.mp3`,
      (surah) => `https://server8.mp3quran.net/maher/${surah.toString().padStart(3, '0')}.mp3`
    ],
    color: 'cyan',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    popularity: 4
  },
  {
    id: 'ar.abdulbasitmujawwad',
    name: 'আব্দুল বাসিত (মুজাওয়াদ)',
    nameEn: 'Abdul Basit (Mujawwad)',
    country: 'মিশর',
    style: 'মুজাওয়াদ',
    sources: [
      (surah) => `https://download.quranicaudio.com/quran/abdul_basit_mujawwad/${surah.toString().padStart(3, '0')}.mp3`
    ],
    color: 'pink',
    bgColor: 'bg-pink-100 dark:bg-pink-900/30',
    textColor: 'text-pink-600 dark:text-pink-400',
    popularity: 3
  }
];

export default function Listen() {

  const [surahs] = useState(surahData);
  const [activeQari, setActiveQari] = useState(QARIS[0]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isQariDropdownOpen, setIsQariDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
 const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem('quran_bookmarks');
  return saved ? JSON.parse(saved) : [];
});
  const [isLoading, setIsLoading] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none');

  const audioRef = useRef(new Audio());
  const qariDropdownRef = useRef(null);

  const filteredSurahs = surahs.filter(surah => 
    surah.name_bengali?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.name_arabic?.includes(searchQuery) ||
    surah.id.toString().includes(searchQuery)
  );

// 1. Shudhu Favorites save korar jonno (Eti alada thakbe)
useEffect(() => {
  localStorage.setItem('quran_bookmarks', JSON.stringify(favorites));
}, [favorites]);

// 2. Audio logic ebong events-er jonno (Eti arekti alada block)
useEffect(() => {
  const audio = audioRef.current;

  const timeUpdate = () => {
    if (!isNaN(audio.duration)) {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const metaLoaded = () => {
    setDuration(audio.duration);
    setIsLoading(false);
    setAudioError(false);
  };

  const ended = () => {
    if (repeatMode === 'one') {
      audio.currentTime = 0;
      audio.play().catch(() => setIsPlaying(false));
    } else if (repeatMode === 'all') {
      handleNext();
    } else {
      setIsPlaying(false);
    }
  };

  const error = () => {
    setAudioError(true);
    setIsLoading(false);
  };

  audio.addEventListener('timeupdate', timeUpdate);
  audio.addEventListener('loadedmetadata', metaLoaded);
  audio.addEventListener('ended', ended);
  audio.addEventListener('error', error);

  return () => {
    audio.removeEventListener('timeupdate', timeUpdate);
    audio.removeEventListener('loadedmetadata', metaLoaded);
    audio.removeEventListener('ended', ended);
    audio.removeEventListener('error', error);
  };
}, [selectedSurah, repeatMode]); // eikhane dependencies thakbe

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (qariDropdownRef.current && !qariDropdownRef.current.contains(event.target)) {
        setIsQariDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = (t) => {
    if (isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const playAudio = async (surah, qari = activeQari) => {
    setIsLoading(true);
    setAudioError(false);
    setSelectedSurah(surah);
    
    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume;

    let played = false;
    // Iterate through sources properly
    for (const sourceFn of qari.sources) {
      try {
        const audioUrl = sourceFn(surah.id);
        audio.src = audioUrl;
        audio.load();
        
        // Wait for play to start
        await audio.play();
        setIsPlaying(true);
        setIsLoading(false);
        played = true;
        break; 
      } catch (err) {
        console.warn(`Source failed for ${qari.nameEn}, trying next...`);
        continue;
      }
    }
    
    if (!played) {
      setAudioError(true);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const handleSurahClick = (surah) => {
    if (selectedSurah?.id === surah.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => setAudioError(true));
        setIsPlaying(true);
      }
    } else {
      playAudio(surah);
    }
  };

  const handleNext = () => {
    const i = surahs.findIndex(s => s.id === selectedSurah?.id);
    if (i !== -1 && i < surahs.length - 1) {
      playAudio(surahs[i + 1]);
    } else if (i === surahs.length - 1 && repeatMode === 'all') {
      playAudio(surahs[0]);
    }
  };

  const handlePrev = () => {
    const i = surahs.findIndex(s => s.id === selectedSurah?.id);
    if (i > 0) {
      playAudio(surahs[i - 1]);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * audio.duration;
    if (!isNaN(newTime)) {
      audio.currentTime = newTime;
      setProgress(e.target.value);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const toggleFavorite = (surahId) => {
    setFavorites(prev => 
      prev.includes(surahId) 
        ? prev.filter(id => id !== surahId)
        : [...prev, surahId]
    );
  };

  const toggleRepeat = () => {
    setRepeatMode(prev => {
      if (prev === 'none') return 'one';
      if (prev === 'one') return 'all';
      return 'none';
    });
  };

  const getGradientClass = (color) => {
    const gradients = {
      emerald: 'from-emerald-500 to-teal-500',
      blue: 'from-blue-500 to-cyan-500',
      purple: 'from-purple-500 to-pink-500',
      amber: 'from-amber-500 to-orange-500',
      rose: 'from-rose-500 to-red-500',
      indigo: 'from-indigo-500 to-purple-500',
      cyan: 'from-cyan-500 to-blue-500',
      pink: 'from-pink-500 to-rose-500'
    };
    return gradients[color] || 'from-emerald-500 to-teal-500';
  };

  return (
    <div className="min-h-screen  pb-32">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Banner Section */}
<div className="relative rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-blue-500/10 dark:from-emerald-500/5 dark:via-teal-500/5 dark:to-blue-500/5 p-8 border border-emerald-500/20 dark:border-emerald-500/10 backdrop-blur-sm z-40">
  {/* Background Decoration - Overflow hidden shudhu eikhane wrapper e deya hoyeche jate dropdown na kate */}
  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
  </div>
  
  <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div className="flex items-center gap-4">
      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/30">
        <Headphones size={32} />
      </div>
      <div>
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
          কুরআন শুনুন
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg flex items-center gap-2">
          <Sparkles size={18} className="text-emerald-500" />
          নির্বাচিত ৮ জন প্রখ্যাত কারীর কণ্ঠে পবিত্র কুরআন
        </p>
      </div>
    </div>

    {/* Dropdown Container */}
    <div className="relative" ref={qariDropdownRef}>
      <button
        onClick={() => setIsQariDropdownOpen(!isQariDropdownOpen)}
        className="w-full group flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800/90 rounded-2xl border-2 border-emerald-500/30 dark:border-emerald-500/20 hover:border-emerald-500 transition-all shadow-lg hover:shadow-xl"
      >
        <div className={` p-2 rounded-xl ${activeQari.bgColor}`}>
          <Radio className={activeQari.textColor} size={20} />
        </div>
        <div className="text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">নির্বাচিত কারী</p>
          <p className="font-bold text-gray-800 dark:text-white">{activeQari.name}</p>
        </div>
        <ChevronDown size={32} className={`ml-10 text-gray-400 group-hover:rotate-180 transition-transform ${isQariDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu - Added z-50 and adjusted positioning */}
      {isQariDropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-[100]">
          <div className="p-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-b border-gray-200 dark:border-gray-700">
            <p className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Users size={16} className="text-emerald-500" />
              নির্বাচন করুন (৮ জন কারী)
            </p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {QARIS.map(qari => (
              <button
                key={qari.id}
                onClick={() => {
                  setActiveQari(qari);
                  setIsQariDropdownOpen(false);
                  if (selectedSurah) playAudio(selectedSurah, qari);
                }}
                className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition border-b border-gray-100 dark:border-gray-700 last:border-0
                  ${activeQari.id === qari.id ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''}`}
              >
                <div className={`p-2 rounded-xl ${qari.bgColor}`}>
                  <Mic2 className={qari.textColor} size={18} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-gray-800 dark:text-white">{qari.name}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>{qari.country}</span>
                    <span>•</span>
                    <span>{qari.style}</span>
                  </div>
                </div>
                {activeQari.id === qari.id && (
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>

  <div className="relative mt-6 max-w-md z-10">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
    <input
      type="text"
      placeholder="সূরা খুঁজুন (নাম বা নম্বর)"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:text-white"
    />
  </div>
</div>

        {/* Surah Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSurahs.map((surah) => {
            const meta = SURAH_INFO[surah.id.toString()];
            const isFavorite = favorites.includes(surah.id);
            const isSelected = selectedSurah?.id === surah.id;
            const gradientClass = getGradientClass(activeQari.color);
            
            return (
              <div
                key={surah.id}
                className={`group relative rounded-2xl transition-all duration-300 transform hover:-translate-y-1
                  ${isSelected 
                    ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 ring-2 ring-emerald-500 shadow-xl shadow-emerald-500/20' 
                    : 'bg-white dark:bg-gray-800/90 hover:shadow-xl hover:shadow-emerald-500/10'}`}
              >
                <button
                  onClick={() => handleSurahClick(surah)}
                  className="w-full p-5 text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className={`relative h-12 w-12 rounded-xl overflow-hidden flex-shrink-0
                      ${isSelected 
                        ? `bg-gradient-to-br ${gradientClass} text-white` 
                        : 'bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30'}`}
                    >
                      <div className="relative h-full flex items-center justify-center font-black dark:text-blue-100 text-lg">
                        {surah.id}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
  <div className="flex items-center gap-2">
    <h3 className="font-bold text-gray-800 dark:text-white truncate">
      {surah.name_bengali}
    </h3>
    {isFavorite && (
      <Heart size={14} className="fill-red-500 text-red-500 flex-shrink-0" />
    )}
  </div>
  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-arabic">
    {surah.name_arabic}
  </p>
  
  <div className="flex items-center gap-2 mt-2">
    {/* আয়াত সংখ্যা */}
    <span className="text-[12px] px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full border border-gray-200/50 dark:border-gray-600/50">
      আয়াত: {SURAH_INFO[surah.id.toString()]?.verses || '--'}
    </span>
    
    {/* সূরার ধরন (মাক্কী/মাদানী) */}
    <span className={`text-[12px] px-2 py-0.5 rounded-full border ${
      SURAH_INFO[surah.id.toString()]?.type === 'মাক্কী' 
      ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/50' 
      : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/50'
    }`}>
      {SURAH_INFO[surah.id.toString()]?.type || '--'}
    </span>
  </div>
</div>

                    <div className={`p-2 rounded-full transition-all duration-300 flex-shrink-0
                      ${isSelected && isPlaying 
                        ? 'bg-emerald-500 text-white animate-pulse' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-emerald-500 group-hover:text-white'}`}
                    >
                      {isLoading && isSelected ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : isSelected && isPlaying ? (
                        <Waves size={16} />
                      ) : (
                        <Play size={16} />
                      )}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => toggleFavorite(surah.id)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white dark:bg-gray-700 shadow-sm hover:bg-red-50 dark:hover:bg-red-900/30 transition group"
                >
                  <Heart 
                    size={14} 
                    className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-red-500'}`} 
                  />
                </button>
              </div>
            );
          })}
        </div>

        {filteredSurahs.length === 0 && (
          <div className="text-center py-20">
            <Music className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">কোন সূরা পাওয়া যায়নি</p>
          </div>
        )}
      </div>

      {/* Floating Player Bar */}
      {selectedSurah && (
        <div className="fixed bottom-20 left-4 right-4 md:left-8 md:right-8 lg:left-auto lg:right-auto lg:max-w-4xl lg:mx-auto z-50">
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-emerald-500/30 dark:border-emerald-500/20 rounded-2xl shadow-2xl overflow-hidden">
            
            <div className="h-1 bg-gray-200 dark:bg-gray-700">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getGradientClass(activeQari.color)} flex items-center justify-center text-white shadow-lg`}>
                    <Disc3 size={32} className={isPlaying ? 'animate-spin-slow' : ''} />
                  </div>
                  {isPlaying && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 dark:text-white truncate">
                    {selectedSurah.name_bengali}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Mic2 size={12} className={activeQari.textColor} />
                    <span>{activeQari.name}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
                    <span className="text-xs text-gray-400">/</span>
                    <span className="text-xs text-gray-400">{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={handlePrev} className="p-2 text-gray-500 hover:text-emerald-500 dark:text-gray-400 rounded-lg">
                    <SkipBack size={18} />
                  </button>

                  <button
                    onClick={() => handleSurahClick(selectedSurah)}
                    disabled={isLoading}
                    className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : isPlaying ? (
                      <Pause size={20} />
                    ) : (
                      <Play size={20} />
                    )}
                  </button>

                  <button onClick={handleNext} className="p-2 text-gray-500 hover:text-emerald-500 dark:text-gray-400 rounded-lg">
                    <SkipForward size={18} />
                  </button>
                </div>

                <div className="hidden md:flex items-center gap-2 ml-4">
                  <div className="relative">
                    <button onClick={() => setIsVolumeVisible(!isVolumeVisible)} className="p-2 text-gray-500 hover:text-emerald-500 dark:text-gray-400">
                      <Volume2 size={18} />
                    </button>
                    {isVolumeVisible && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                        <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} className="w-20 h-1 accent-emerald-500" />
                      </div>
                    )}
                  </div>

                  <button onClick={toggleRepeat} className={`p-2 transition rounded-lg ${repeatMode !== 'none' ? 'text-emerald-500 bg-emerald-50/50' : 'text-gray-500 dark:text-gray-400'}`}>
                    <Repeat size={18} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    audioRef.current.pause();
                    setSelectedSurah(null);
                    setIsPlaying(false);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 transition ml-2"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
                <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}