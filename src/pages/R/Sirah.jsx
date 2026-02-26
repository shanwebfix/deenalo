import { useState, useEffect } from 'react';

import { Play, Pause, Loader2 } from 'lucide-react';

export default function Sirah() {
  const [sirahEpisodes, setSirahEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handleMediaClick, selectedMedia, playerState } = usePlayer();

  useEffect(() => {
    setLoading(true);
    fetch('/sirah.json')
      .then(res => res.json())
      .then(data => {
        setSirahEpisodes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch sirah episodes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin h-12 w-12 text-emerald-500"/></div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {sirahEpisodes.map(episode => {
        const isSelected = selectedMedia?.id === episode.id && playerState.isSirah;
        const isPlaying = isSelected && playerState.isPlaying;

        return (
          <div key={episode.id} 
               onClick={() => handleMediaClick(episode, true)}
               className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between cursor-pointer transition-all duration-300 ${isSelected ? 'ring-2 ring-emerald-500' : ''}`}>
            <div className="flex items-center">
               <div className={`font-bold rounded-full h-10 w-10 flex items-center justify-center mr-4 ${isPlaying ? 'bg-emerald-500 text-white' : 'bg-emerald-100 dark:bg-emerald-800/50 text-emerald-600 dark:text-emerald-300'}`}>
                {isPlaying ? <Pause size={20} /> : episode.id}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{episode.name_bengali}</h3>
              </div>
            </div>
            {!isPlaying && <Play className="text-emerald-500" size={24}/>}
          </div>
        )
      })}
    </div>
  );
}
