import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Navigation, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QiblaDirection() {
  const [location, setLocation] = useState(null);
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [loading, setLoading] = useState(true);

  // মক্কার স্থানাঙ্ক
  const MAKKAH = { lat: 21.4225, lng: 39.8262 };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          // কিবলা দিক নির্ণয়
          const direction = calculateQibla(userLat, userLng);
          
          setLocation({ lat: userLat, lng: userLng });
          setQiblaDirection(direction);
          setLoading(false);
        },
        (error) => {
          console.error('Error:', error);
          setLoading(false);
        }
      );
    }
  }, []);

  // কিবলা ক্যালকুলেশন ফর্মুলা
  const calculateQibla = (lat1, lng1) => {
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = MAKKAH.lat * Math.PI / 180;
    const lngDiffRad = (MAKKAH.lng - lng1) * Math.PI / 180;

    const y = Math.sin(lngDiffRad);
    const x = Math.cos(lat1Rad) * Math.tan(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lngDiffRad);
    
    let qibla = Math.atan2(y, x) * 180 / Math.PI;
    qibla = (qibla + 360) % 360;
    
    return Math.round(qibla);
  };

  // ডিগ্রি থেকে দিকের নাম
  const getDirectionName = (degree) => {
    const directions = ['উত্তর', 'উত্তর-পূর্ব', 'পূর্ব', 'দক্ষিণ-পূর্ব', 'দক্ষিণ', 'দক্ষিণ-পশ্চিম', 'পশ্চিম', 'উত্তর-পশ্চিম'];
    return directions[Math.floor(degree / 45) % 8];
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
        <div className="animate-pulse flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
      {/* হেডার */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
          <Compass size={24} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">কিবলা দিক</h3>
      </div>

      {location && qiblaDirection !== null ? (
        <>
          {/* ডিগ্রি ও দিক */}
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
              {qiblaDirection}°
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getDirectionName(qiblaDirection)} দিকে কিবলা
            </p>
          </div>

          {/* সরল রেখা নির্দেশক */}
          <div className="relative h-32 mb-4">
            {/* কম্পাস রোজ */}
            <div className="absolute inset-x-0 top-0 h-24 flex items-center justify-center">
              {/* লাল দিক নির্দেশক */}
              <div 
                className="w-1 h-20 bg-gradient-to-t from-red-500 to-red-600 rounded-full origin-bottom"
                style={{ transform: `rotate(${qiblaDirection}deg)` }}
              />
              
              {/* বৃত্ত */}
              <div className="absolute w-24 h-24 rounded-full border-2 border-gray-200 dark:border-gray-700">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs">N</div>
                <div className="absolute right-1 top-1/2 translate-x-1/2 -translate-y-1/2 text-xs">E</div>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2 text-xs">S</div>
                <div className="absolute left-1 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs">W</div>
              </div>
            </div>
          </div>

          {/* লোকেশন তথ্য */}
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <MapPin size={14} />
            <span>
              {location.lat.toFixed(2)}°, {location.lng.toFixed(2)}°
            </span>
          </div>

          {/* ফুল পেজ লিংক */}
          <Link
            to="/qibla"
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              পূর্ণাঙ্গ কম্পাস দেখুন
            </span>
            <ArrowRight size={16} className="text-gray-500" />
          </Link>
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          লোকেশন পাওয়া যায়নি
        </p>
      )}
    </div>
  );
}