import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Navigation, AlertCircle, RefreshCw, Info } from 'lucide-react';
import { Geolocation } from '@capacitor/geolocation'; // Capacitor Geolocation ইমপোর্ট

export default function QiblaCompass() {
  const [location, setLocation] = useState(null);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [userDirection, setUserDirection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // মক্কার স্থানাঙ্ক
  const MAKKAH_LAT = 21.4225;
  const MAKKAH_LNG = 39.8262;

  // লোকেশন নেওয়ার ক্যাপাসিটর লজিক
  const fetchLocation = async () => {
    try {
      setLoading(true);
      const position = await Geolocation.getCurrentPosition();
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      
      setLocation({ lat: userLat, lng: userLng });
      const direction = calculateQiblaDirection(userLat, userLng);
      setQiblaDirection(direction);
      setLoading(false);
    } catch (err) {
      console.error('Location error:', err);
      // পারমিশন ডিনাইড হলে চেক করা
      if (err.message && err.message.toLowerCase().includes('denied')) {
        setPermissionDenied(true);
      } else {
        setError('লোকেশন পাওয়া যায়নি। জিপিএস অন আছে কিনা চেক করুন।');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    // অ্যাপ লোড হলে লোকেশন কল হবে
    fetchLocation();

    // ডিভাইসের অরিয়েন্টেশন ট্র্যাক করা
    const handleOrientation = (event) => {
      if (event.webkitCompassHeading) {
        // iOS
        setUserDirection(event.webkitCompassHeading);
      } else if (event.alpha !== null) {
        // Android (Absolute orientation)
        setUserDirection(360 - event.alpha);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // কিবলা দিক নির্ণয়ের ফর্মুলা
  const calculateQiblaDirection = (userLat, userLng) => {
    const lat1 = toRadians(userLat);
    const lat2 = toRadians(MAKKAH_LAT);
    const lngDiff = toRadians(MAKKAH_LNG - userLng);

    const y = Math.sin(lngDiff);
    const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(lngDiff);
    
    let qibla = Math.atan2(y, x);
    qibla = toDegrees(qibla);
    qibla = (qibla + 360) % 360;

    return qibla;
  };

  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const toDegrees = (radians) => radians * (180 / Math.PI);

  // কম্পাসের ঘূর্ণন ক্যালকুলেশন
  const getCompassRotation = () => {
    if (userDirection && qiblaDirection) {
      return (qiblaDirection - userDirection + 360) % 360;
    }
    return qiblaDirection;
  };

  // রিফ্রেশ ফাংশন
  const refreshLocation = () => {
    setError(null);
    setPermissionDenied(false);
    fetchLocation();
  };

  // ডিগ্রি থেকে দিকের নাম
  const getDirectionName = (degree) => {
    const directions = ['উত্তর', 'উত্তর-পূর্ব', 'পূর্ব', 'দক্ষিণ-পূর্ব', 'দক্ষিণ', 'দক্ষিণ-পশ্চিম', 'পশ্চিম', 'উত্তর-পশ্চিম'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-emerald-200 dark:border-emerald-900 border-t-emerald-500 rounded-full animate-spin"></div>
            <Compass className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-emerald-500" size={32} />
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400">লোকেশন নেওয়া হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (permissionDenied) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="text-center py-8">
          <div className="inline-flex p-4 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
            <AlertCircle size={40} className="text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">লোকেশন অনুমতি প্রয়োজন</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            কিবলা দিক নির্ণয়ের জন্য আপনার লোকেশন প্রয়োজন। অনুগ্রহ করে অ্যাপ সেটিংস থেকে লোকেশন অনুমতি দিন।
          </p>
          <button
            onClick={refreshLocation}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-colors"
          >
            <RefreshCw size={18} />
            <span>পুনরায় চেষ্টা করুন</span>
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="text-center py-8">
          <div className="inline-flex p-4 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            <AlertCircle size={40} className="text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">সমস্যা হয়েছে</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={refreshLocation}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-colors"
          >
            <RefreshCw size={18} />
            <span>আবার চেষ্টা করুন</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
      {/* হেডার */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl">
            <Compass size={28} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">কিবলা কম্পাস</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">সঠিক কিবলা দিক নির্ণয়</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <Info size={20} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* ইনফো প্যানেল */}
      {showInfo && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            আপনার ডিভাইসটি সমতল পৃষ্ঠে রাখুন এবং কম্পাস ক্যালিব্রেট করতে আট অঙ্কের মতো ঘোরান। 
            লাল রঙের সুই সবসময় কিবলা নির্দেশ করবে।
          </p>
        </div>
      )}

      {/* কম্পাস */}
      <div className="relative flex justify-center mb-8">
        <div className="relative w-64 h-64 md:w-72 md:h-72">
          <div className="absolute inset-0 rounded-full border-8 border-gray-100 dark:border-gray-800 shadow-inner"></div>
          
          <div className="absolute inset-0">
            {[...Array(360)].map((_, i) => {
              if (i % 30 === 0) {
                const angle = (i * Math.PI) / 180;
                const x1 = 50 + 45 * Math.sin(angle);
                const y1 = 50 - 45 * Math.cos(angle);
                return (
                  <div
                    key={i}
                    className="absolute w-px h-1 bg-gray-300 dark:bg-gray-700"
                    style={{
                      left: `${x1}%`,
                      top: `${y1}%`,
                      transform: `rotate(${i}deg)`,
                      transformOrigin: '0 0',
                      width: i % 90 === 0 ? '3px' : '1px',
                      height: i % 90 === 0 ? '12px' : '8px',
                      backgroundColor: i % 90 === 0 ? '#10b981' : undefined
                    }}
                  />
                );
              }
              return null;
            })}
          </div>

          <div className="absolute inset-0">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-bold text-emerald-600">N</div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-bold text-emerald-600">E</div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-bold text-emerald-600">S</div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-sm font-bold text-emerald-600">W</div>
          </div>

          <div 
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{ transform: `rotate(${getCompassRotation()}deg)` }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-1 h-24 bg-gradient-to-t from-red-500 to-red-600 rounded-full origin-bottom transform -translate-y-12"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 w-3 h-3 bg-red-600 rounded-full"></div>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-1 h-24 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full origin-top transform translate-y-12"></div>
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900 z-10"></div>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div 
                className="absolute w-12 h-12 bg-emerald-500/20 rounded-full blur-xl"
                style={{
                  transform: `rotate(${qiblaDirection - userDirection}deg) translateX(120px)`
                }}
              />
              <div 
                className="absolute w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-900"
                style={{
                  transform: `rotate(${qiblaDirection - userDirection}deg) translateX(100px)`
                }}
              >
                <span className="text-white text-xs font-bold">🕋</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* তথ্য বক্স */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">কিবলা দিক</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {Math.round(qiblaDirection)}°
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {getDirectionName(qiblaDirection)} থেকে
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">আপনার দিক</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {userDirection ? Math.round(userDirection) : '—'}°
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {userDirection ? getDirectionName(userDirection) : 'অজানা'}
          </p>
        </div>
      </div>

      {/* লোকেশন ও দূরত্ব */}
      {location && (
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <MapPin size={18} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm text-gray-700 dark:text-gray-300">আপনার অবস্থান</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            অক্ষাংশ: {location.lat.toFixed(4)}°, দ্রাঘিমা: {location.lng.toFixed(4)}°
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            কাবা শরীফের দূরত্ব: {calculateDistance(location.lat, location.lng, MAKKAH_LAT, MAKKAH_LNG)} কিমি
          </p>
        </div>
      )}

      {/* রিফ্রেশ ও ক্যালিব্রেট বাটন */}
      <div className="flex gap-3">
        <button
          onClick={refreshLocation}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl transition-colors"
        >
          <RefreshCw size={18} />
          <span>রিফ্রেশ</span>
        </button>
        
        <button
          onClick={() => {
            if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
              DeviceOrientationEvent.requestPermission()
                .then(state => { if (state === 'granted') window.location.reload(); })
                .catch(console.error);
            }
          }}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition-colors"
        >
          ক্যালিব্রেট
        </button>
      </div>

      <p className="text-xs text-center text-gray-400 dark:text-gray-600 mt-4">
        * সঠিক ফলাফলের জন্য ডিভাইসটি সমতল পৃষ্ঠে রাখুন
      </p>
    </div>
  );
}

// দূরত্ব নির্ণয় (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
}