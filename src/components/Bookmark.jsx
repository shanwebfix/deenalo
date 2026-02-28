import { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Heart, Trash2, Music, X, Disc3, Mic2, Waves, 
  SkipBack, SkipForward, Volume2, Repeat, Radio
} from 'lucide-react';
import surahData from '../surahs.json';

// Listen page er motoi list of qaris and sources
const QARIS = [
  {
    id: 'ar.alafasy',
    name: 'মিশারী রশিদ আল-আফাসী',
    sources: [
      (id) => `https://download.quranicaudio.com/quran/mishary_rashid_alafasy/${id.toString().padStart(3, '0')}.mp3`,
      (id) => `https://server8.mp3quran.net/afs/${id.toString().padStart(3, '0')}.mp3`
    ],
    textColor: 'text-emerald-600 dark:text-emerald-400'
  }
];

export default function Bookmarks() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('quran_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedSurah, setSelectedSurah] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none'); // 'none', 'one', 'all'
  
  const audioRef = useRef(new Audio());

  // 1. LocalStorage Sync
  useEffect(() => {
    localStorage.setItem('quran_bookmarks', JSON.stringify(favorites));
  }, [favorites]);

  // 2. Audio Event Listeners (Listen page logic)
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

    audio.addEventListener('timeupdate', timeUpdate);
    audio.addEventListener('loadedmetadata', metaLoaded);
    audio.addEventListener('ended', ended);

    return () => {
      audio.removeEventListener('timeupdate', timeUpdate);
      audio.removeEventListener('loadedmetadata', metaLoaded);
      audio.removeEventListener('ended', ended);
    };
  }, [selectedSurah, repeatMode, favorites]);

  const bookmarkedSurahs = surahData.filter(surah => favorites.includes(surah.id));

  // 3. Play Logic with Multiple Source Support
  const playAudio = async (surah) => {
    setIsLoading(true);
    setSelectedSurah(surah);
    const audio = audioRef.current;
    
    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume;

    let played = false;
    const qari = QARIS[0]; // Currently using Alafasy as default

    for (const sourceFn of qari.sources) {
      try {
        audio.src = sourceFn(surah.id);
        audio.load();
        await audio.play();
        setIsPlaying(true);
        setIsLoading(false);
        played = true;
        break; 
      } catch (err) {
        console.warn("Source failed, trying next...");
        continue;
      }
    }

    if (!played) {
      setIsLoading(false);
      setIsPlaying(false);
      alert("অডিও প্লে করা সম্ভব হচ্ছে না।");
    }
  };

  const handleSurahClick = (surah) => {
    if (selectedSurah?.id === surah.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      playAudio(surah);
    }
  };

  const handleNext = () => {
    const i = bookmarkedSurahs.findIndex(s => s.id === selectedSurah?.id);
    if (i !== -1 && i < bookmarkedSurahs.length - 1) {
      playAudio(bookmarkedSurahs[i + 1]);
    } else if (i === bookmarkedSurahs.length - 1 && repeatMode === 'all') {
      playAudio(bookmarkedSurahs[0]);
    }
  };

  const handlePrev = () => {
    const i = bookmarkedSurahs.findIndex(s => s.id === selectedSurah?.id);
    if (i > 0) {
      playAudio(bookmarkedSurahs[i - 1]);
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

  const formatTime = (t) => {
    if (isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const removeBookmark = (e, surahId) => {
    e.stopPropagation();
    if (selectedSurah?.id === surahId) {
      audioRef.current.pause();
      setSelectedSurah(null);
      setIsPlaying(false);
    }
    setFavorites(prev => prev.filter(id => id !== surahId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 pb-40 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/20">
            <Heart size={24} className="fill-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-800 dark:text-white">বুকমার্ক তালিকা</h1>
            <p className="text-gray-500 dark:text-gray-400">সংরক্ষিত সূরা: {bookmarkedSurahs.length}টি</p>
          </div>
        </div>

        {/* List Section */}
        <div className="grid grid-cols-1 gap-4">
          {bookmarkedSurahs.length > 0 ? (
            bookmarkedSurahs.map((surah) => {
              const isSelected = selectedSurah?.id === surah.id;
              return (
                <div 
                  key={surah.id}
                  onClick={() => handleSurahClick(surah)}
                  className={`group relative flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 cursor-pointer
                    ${isSelected 
                      ? 'bg-emerald-50 border-emerald-500 dark:bg-emerald-900/20 shadow-lg ring-1 ring-emerald-500' 
                      : 'bg-white dark:bg-gray-800/90 border-gray-100 dark:border-gray-700 hover:shadow-md'}`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg
                      ${isSelected ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-white'}`}>
                      {surah.id}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">{surah.name_bengali}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-arabic">{surah.name_arabic} • {surah.total_verses} আয়াত</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`p-3 rounded-xl transition-all ${isSelected ? 'text-emerald-500' : 'text-gray-400'}`}>
                      {isLoading && isSelected ? <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /> : 
                       isSelected && isPlaying ? <Waves size={24} className="animate-pulse" /> : <Play size={24} fill="currentColor" opacity={0.5} />}
                    </div>
                    <button 
                      onClick={(e) => removeBookmark(e, surah.id)}
                      className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white/50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
              <Music className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">বুকমার্ক তালিকা খালি</p>
            </div>
          )}
        </div>
      </div>

      {/* Modern Floating Player (Full Logic from Listen Page) */}
      {selectedSurah && (
        <div className="fixed bottom-24 left-4 right-4 max-w-2xl mx-auto z-50">
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Progress Bar Top */}
            <div className="h-1.5 bg-gray-100 dark:bg-gray-800">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="p-4 md:p-6">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg overflow-hidden shrink-0">
                  <Disc3 size={32} className={isPlaying ? 'animate-spin' : ''} style={{ animationDuration: '4s' }} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lg dark:text-white truncate">{selectedSurah.name_bengali}</h4>
                  <p className="text-xs text-emerald-500 flex items-center gap-1 font-medium">
                    <Mic2 size={12} /> মিশারী রশিদ আল-আফাসী
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-400 font-mono">{formatTime(currentTime)}</span>
                    <span className="text-[10px] text-gray-400">/</span>
                    <span className="text-[10px] text-gray-400 font-mono">{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={handlePrev} className="p-2 text-gray-400 hover:text-emerald-500 transition-colors">
                    <SkipBack size={20} />
                  </button>
                  <button 
                    onClick={() => handleSurahClick(selectedSurah)} 
                    className="p-4 bg-emerald-500 text-white rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> :
                     isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" />}
                  </button>
                  <button onClick={handleNext} className="p-2 text-gray-400 hover:text-emerald-500 transition-colors">
                    <SkipForward size={20} />
                  </button>
                  <button 
                    onClick={() => { audioRef.current.pause(); setSelectedSurah(null); setIsPlaying(false); }} 
                    className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full ml-2"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Interaction Controls */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <button onClick={() => setIsVolumeVisible(!isVolumeVisible)} className="p-2 text-gray-400 hover:text-emerald-500">
                      <Volume2 size={18} />
                    </button>
                    {isVolumeVisible && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200">
                        <input 
                          type="range" min="0" max="1" step="0.1" 
                          value={volume} 
                          onChange={(e) => {
                            const v = parseFloat(e.target.value);
                            setVolume(v);
                            audioRef.current.volume = v;
                          }} 
                          className="w-20 h-1 accent-emerald-500" 
                        />
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => setRepeatMode(prev => prev === 'none' ? 'one' : prev === 'one' ? 'all' : 'none')}
                    className={`p-2 rounded-lg transition-colors ${repeatMode !== 'none' ? 'bg-emerald-50 text-emerald-500' : 'text-gray-400'}`}
                  >
                    <Repeat size={18} />
                    {repeatMode === 'one' && <span className="absolute text-[8px] font-bold ml-1">1</span>}
                  </button>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="flex-1 mx-4 h-1 bg-gray-100 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}