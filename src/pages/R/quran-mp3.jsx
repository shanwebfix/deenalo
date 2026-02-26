import { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  ListMusic,
  Users,
  X,
  Volume2,
  SkipBack,
  SkipForward
} from 'lucide-react';
import surahData from '../../surahs.json';

/* ===== WORKING & VERIFIED QARIS ===== */
const QARIS = [
  {
    id: 'ar.alafasy',
    fallbackId: 'mishari_rashid_alafasy',
    name: 'Mishary Rashid Alafasy'
  },
  {
    id: 'ar.abdulbasitmurattal',
    fallbackId: 'abdul_basit_murattal',
    name: 'Abdul Basit (Murattal)'
  },
  {
    id: 'ar.minshawi',
    fallbackId: 'muhammad_siddeeq_al-minshaawee',
    name: 'Al-Minshawi'
  },
  {
    id: 'ar.husary',
    fallbackId: 'mahmood_khaleel_al-husary',
    name: 'Mahmood Khalil Al-Husary'
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

  const audioRef = useRef(new Audio());

  /* ===== AUDIO EVENTS ===== */
  useEffect(() => {
    const audio = audioRef.current;

    const timeUpdate = () => {
      if (!isNaN(audio.duration)) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const metaLoaded = () => setDuration(audio.duration);

    const ended = () => handleNext();

    audio.addEventListener('timeupdate', timeUpdate);
    audio.addEventListener('loadedmetadata', metaLoaded);
    audio.addEventListener('ended', ended);

    return () => {
      audio.removeEventListener('timeupdate', timeUpdate);
      audio.removeEventListener('loadedmetadata', metaLoaded);
      audio.removeEventListener('ended', ended);
    };
  }, [selectedSurah]);

  /* ===== HELPERS ===== */
  const formatTime = (t) => {
    if (isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  /* ===== PLAY AUDIO (WITH FALLBACK) ===== */
  const playAudio = (surah, qari = activeQari) => {
    setSelectedSurah(surah);

    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;

    const primaryUrl = `https://cdn.islamic.network/quran/audio-surah/128/${qari.id}/${surah.id}.mp3`;
    const surah3 = String(surah.id).padStart(3, '0');
    const fallbackUrl = `https://download.quranicaudio.com/quran/${qari.fallbackId}/${surah3}.mp3`;

    audio.src = primaryUrl;
    audio.load();

    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        console.warn('Primary failed, trying fallback...');
        audio.src = fallbackUrl;
        audio.load();
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.error('Both servers failed', err);
            setIsPlaying(false);
          });
      });
  };

  /* ===== CONTROLS ===== */
  const handleSurahClick = (surah) => {
    if (selectedSurah?.id === surah.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
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
    audio.currentTime = (e.target.value / 100) * audio.duration;
    setProgress(e.target.value);
  };

  const handleQariChange = (e) => {
    const qari = QARIS.find(q => q.id === e.target.value);
    setActiveQari(qari);
    if (selectedSurah) playAudio(selectedSurah, qari);
  };

  /* ===== UI ===== */
  return (
    <div className="space-y-6 pb-0">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ListMusic className="text-emerald-500" size={32} />
          <h2 className="text-3xl font-bold dark:text-white">Listen to Surahs</h2>
        </div>

        <div className="flex items-center bg-white dark:bg-gray-800 border dark:border-gray-700 p-2 rounded-lg">
          <Users size={18} className="text-emerald-500 mr-2" />
          <select
            value={activeQari.id}
            onChange={handleQariChange}
            className="bg-transparent outline-none text-sm font-semibold dark:text-white"
          >
            {QARIS.map(q => (
              <option key={q.id} value={q.id} className="dark:bg-gray-800">
                {q.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SURAH LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {surahs.map(surah => (
          <button
            key={surah.id}
            onClick={() => handleSurahClick(surah)}
            className={`p-4 rounded-xl shadow-md border-2 transition
              ${selectedSurah?.id === surah.id
                ? 'border-emerald-500 bg-emerald-50/10'
                : 'border-transparent hover:border-emerald-200'}
              bg-white dark:bg-gray-800`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                  {surah.id}
                </div>
                <div className="truncate text-left">
                  <p className="font-semibold truncate dark:text-white">
                    {surah.name_bengali}
                  </p>
                  <p className="text-xs text-gray-500">
                    {surah.name_arabic}
                  </p>
                </div>
              </div>

              {selectedSurah?.id === surah.id && isPlaying
                ? <Pause className="text-emerald-500 animate-pulse" />
                : <Play className="text-gray-400" />
              }
            </div>
          </button>
        ))}
      </div>

      {/* PLAYER */}
      {selectedSurah && (
        <div className="fixed bottom-24 left-2 right-2 md:left-10 md:right-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur border border-emerald-500/30 rounded-xl px-4 py-3 z-50">
          <div className="flex justify-between items-center gap-4">

            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 bg-emerald-500 text-white rounded-lg">
                <Volume2 size={18} className={isPlaying ? 'animate-pulse' : ''} />
              </div>
              <div className="truncate">
                <p className="font-bold truncate dark:text-white">
                  {selectedSurah.name_bengali}
                </p>
                <p className="text-xs text-emerald-600 uppercase">
                  {activeQari.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={handlePrev}><SkipBack /></button>
              <button
                onClick={() => handleSurahClick(selectedSurah)}
                className="bg-emerald-500 text-white p-3 rounded-full"
              >
                {isPlaying ? <Pause /> : <Play />}
              </button>
              <button onClick={handleNext}><SkipForward /></button>
            </div>

            <button
              onClick={() => {
                audioRef.current.pause();
                setSelectedSurah(null);
                setIsPlaying(false);
              }}
              className="text-gray-400 hover:text-red-500"
            >
              <X />
            </button>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="flex-1 accent-emerald-500"
            />
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
}