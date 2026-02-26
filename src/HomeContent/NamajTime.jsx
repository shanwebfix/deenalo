import React, { useState, useEffect } from "react";
import { Clock, MapPin, Loader2, AlertCircle, ChevronDown, Moon, Sun } from "lucide-react";

// বিভাগ ও জেলা ভিত্তিক ডাটা
const BD_DIVISIONS = [
  {
    name: "ঢাকা",
    districts: ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Faridpur", "Mymensingh", "Kishoreganj", "Manikganj", "Munshiganj", "Narsingdi"]
  },
  {
    name: "চট্টগ্রাম",
    districts: ["Chittagong", "Cox's Bazar", "Comilla", "Noakhali", "Feni", "Brahmanbaria", "Rangamati", "Khagrachari", "Bandarban", "Lakshmipur"]
  },
  {
    name: "রাজশাহী",
    districts: ["Rajshahi", "Bogra", "Pabna", "Naogaon", "Natore", "Chapainawabganj", "Joypurhat", "Sirajganj"]
  },
  {
    name: "খুলনা",
    districts: ["Khulna", "Jessore", "Kushtia", "Jhenaidah", "Magura", "Chuadanga", "Meherpur", "Narail", "Bagerhat", "Satkhira"]
  },
  {
    name: "বরিশাল",
    districts: ["Barisal", "Bhola", "Patuakhali", "Pirojpur", "Jhalokati", "Barguna"]
  },
  {
    name: "সিলেট",
    districts: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"]
  },
  {
    name: "রংপুর",
    districts: ["Rangpur", "Dinajpur", "Kurigram", "Gaibandha", "Nilphamari", "Lalmonirhat", "Panchagarh", "Thakurgaon"]
  }
];

const PRAYER_NAMES_BN = {
  Fajr: "ফজর",
  Dhuhr: "যোহর",
  Asr: "আসর",
  Maghrib: "মাগরিব",
  Isha: "এশা",
  Sunrise: "সূর্যোদয়",
  Sunset: "সূর্যাস্ত"
};

const PRAYER_ORDER = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

export default function NamajTime() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locationMethod, setLocationMethod] = useState("auto");
  const [selectedDivision, setSelectedDivision] = useState("ঢাকা");
  const [selectedDistrict, setSelectedDistrict] = useState("Dhaka");
  const [nextPrayer, setNextPrayer] = useState({ name: "...", timeLeft: "00:00:00" });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [error, setError] = useState(null);
  const [locationStatus, setLocationStatus] = useState("");
  const [showLocationPanel, setShowLocationPanel] = useState(false);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get districts for selected division
  const getDistrictsForDivision = () => {
    const division = BD_DIVISIONS.find(d => d.name === selectedDivision);
    return division ? division.districts : BD_DIVISIONS[0].districts;
  };

  // ১. এপিআই থেকে ডাটা আনা
  const fetchTimes = async (params) => {
    setLoading(true);
    setError(null);
    try {
      let url = "https://api.aladhan.com/v1/timings";
      
      if (params.type === "city") {
        url = `${url}ByCity?city=${params.city}&country=Bangladesh&method=1`;
      } else if (params.type === "coordinates") {
        url = `${url}?latitude=${params.lat}&longitude=${params.lng}&method=1`;
      }

      const res = await fetch(url);
      const result = await res.json();
      
      if (result.code === 200 && result.data) {
        setData(result.data.timings);
        setLocationMethod(params.type);
        if (params.type === "city") {
          setSelectedDistrict(params.city);
          // Find division for this district
          for (const div of BD_DIVISIONS) {
            if (div.districts.includes(params.city)) {
              setSelectedDivision(div.name);
              break;
            }
          }
        }
      } else {
        setError("ডাটা লোড করা যায়নি");
      }
    } catch (err) {
      setError("নেটওয়ার্ক সমস্যা হয়েছে");
      console.error("API Error", err);
    } finally {
      setLoading(false);
    }
  };

  // অটো লোকেশন ট্রাই করা
  const getAutoLocation = () => {
    setLocationStatus("লোকেশন পাওয়ার চেষ্টা করা হচ্ছে...");
    setShowLocationPanel(false);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocationStatus("আপনার এলাকার সময় পাওয়া যাচ্ছে...");
          fetchTimes({ type: "coordinates", lat: latitude, lng: longitude });
        },
        (error) => {
          console.log("Geolocation error:", error);
          setLocationStatus("লোকেশন পাওয়া যায়নি, ঢাকার সময় দেখানো হচ্ছে");
          fetchTimes({ type: "city", city: "Dhaka" });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setLocationStatus("জিওলোকেশন সাপোর্ট করে না, ঢাকার সময় দেখানো হচ্ছে");
      fetchTimes({ type: "city", city: "Dhaka" });
    }
  };

  // ম্যানুয়াল সিটি সিলেক্ট
  const handleManualCity = (district) => {
    setSelectedDistrict(district);
    setLocationMethod("manual");
    fetchTimes({ type: "city", city: district });
    setShowLocationPanel(false);
  };

  // Handle division change
  const handleDivisionChange = (division) => {
    setSelectedDivision(division);
    const districts = BD_DIVISIONS.find(d => d.name === division).districts;
    setSelectedDistrict(districts[0]);
  };

  // ইনিশিয়াল লোকেশন সেটআপ
  useEffect(() => {
    getAutoLocation();
  }, []);

  // ২. পরবর্তী ওয়াক্ত এবং কাউন্টডাউন ক্যালকুলেশন
  useEffect(() => {
    if (!data) return;

    const calculateNextPrayer = () => {
      const now = new Date();
      
      const prayerTimes = PRAYER_ORDER.map(key => {
        if (!data[key]) return null;
        
        const [h, m] = data[key].split(":");
        const time = new Date(now);
        time.setHours(parseInt(h), parseInt(m), 0);
        
        return {
          key,
          name: PRAYER_NAMES_BN[key],
          time,
          timestamp: time.getTime()
        };
      }).filter(p => p !== null);

      let next = null;
      for (let i = 0; i < prayerTimes.length; i++) {
        if (prayerTimes[i].timestamp > now.getTime()) {
          next = prayerTimes[i];
          break;
        }
      }

      if (!next && data.Fajr) {
        const [h, m] = data.Fajr.split(":");
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(parseInt(h), parseInt(m), 0);
        
        next = {
          key: "Fajr",
          name: PRAYER_NAMES_BN.Fajr,
          time: tomorrow,
          timestamp: tomorrow.getTime()
        };
      }

      if (next) {
        const diff = next.timestamp - now.getTime();
        const hrs = Math.floor(diff / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        
        setNextPrayer({
          name: next.name,
          timeLeft: `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`,
          time: next.time
        });
      }
    };

    calculateNextPrayer();
    const timer = setInterval(calculateNextPrayer, 1000);
    return () => clearInterval(timer);
  }, [data, currentTime]);

  const formatBanglaNumber = (num) => {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(d => banglaDigits[parseInt(d)] || d).join('');
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-emerald-900 to-teal-900 p-8 rounded-3xl shadow-2xl text-white">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative">
            <Loader2 className="animate-spin w-12 h-12 mb-4 text-emerald-300" />
            <div className="absolute inset-0 animate-ping opacity-20">
              <Loader2 className="w-12 h-12 text-emerald-300" />
            </div>
          </div>
          <p className="text-sm font-medium text-emerald-100">{locationStatus || "লোড হচ্ছে..."}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-rose-600 to-pink-700 p-8 rounded-3xl shadow-2xl text-white">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-white/20 rounded-full p-4 mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <p className="text-lg font-medium mb-2">{error}</p>
          <p className="text-sm opacity-90 mb-6">{locationStatus}</p>
          <button 
            onClick={() => getAutoLocation()}
            className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full text-sm font-medium transition-all hover:scale-105"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-6 rounded-3xl shadow-2xl text-white border border-white/10">
      
      {/* Header with modern design */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-2xl shadow-lg">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">নামাজের সময়</h2>
            <p className="text-[10px] opacity-60 mt-0.5">{formatBanglaNumber(new Date().toLocaleDateString('bn-BD'))}</p>
          </div>
        </div>
        
        {/* Location indicator with animation */}
        <button 
          onClick={() => setShowLocationPanel(!showLocationPanel)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
            locationMethod === "auto" 
              ? "bg-green-500/20 hover:bg-green-500/30" 
              : "bg-blue-500/20 hover:bg-blue-500/30"
          }`}
        >
          <MapPin size={14} className={locationMethod === "auto" ? "text-green-300" : "text-blue-300"} />
          <span className="text-xs font-medium">
            {locationMethod === "auto" ? "স্বয়ংক্রিয়" : selectedDistrict}
          </span>
          <ChevronDown size={14} className={`transition-transform ${showLocationPanel ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Location selection panel */}
      {showLocationPanel && (
        <div className="mb-6 bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10 animate-slideDown">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium">অঞ্চল নির্বাচন</p>
            <button 
              onClick={() => setShowLocationPanel(false)}
              className="text-xs opacity-60 hover:opacity-100"
            >
              বন্ধ করুন
            </button>
          </div>
          
          {/* Division selector */}
          <div className="mb-3">
            <label className="text-[10px] opacity-60 mb-1 block">বিভাগ</label>
            <select 
              value={selectedDivision}
              onChange={(e) => handleDivisionChange(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-white/30"
            >
              {BD_DIVISIONS.map(div => (
                <option key={div.name} value={div.name} className="bg-gray-800 text-white">{div.name}</option>
              ))}
            </select>
          </div>

          {/* District selector */}
          <div className="mb-4">
            <label className="text-[10px] opacity-60 mb-1 block">জেলা</label>
            <select 
              value={selectedDistrict}
              onChange={(e) => handleManualCity(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-white/30"
            >
              {getDistrictsForDivision().map(d => (
                <option key={d} value={d} className="bg-gray-800 text-white">{d}</option>
              ))}
            </select>
          </div>

          {/* Auto location button */}
          <button 
            onClick={getAutoLocation}
            className="w-full bg-white/10 hover:bg-white/20 rounded-xl py-2.5 text-sm font-medium transition-all flex items-center justify-center gap-2"
          >
            <MapPin size={14} />
            স্বয়ংক্রিয় লোকেশন
          </button>
        </div>
      )}

      {/* Main prayer times with modern cards */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((k, index) => {
          const active = nextPrayer.name === PRAYER_NAMES_BN[k];
          return (
            <div 
              key={k} 
              className={`relative overflow-hidden rounded-2xl p-3 text-center transition-all duration-300 ${
                active 
                  ? "bg-gradient-to-br from-amber-400 to-amber-600 text-gray-900 shadow-xl scale-105" 
                  : "bg-white/10 backdrop-blur-sm border border-white/10"
              }`}
            >
              {active && (
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              )}
              <p className="text-[10px] font-medium opacity-80 mb-1">{PRAYER_NAMES_BN[k]}</p>
              <p className="text-sm font-black">{data[k]}</p>
              {index === 4 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sunrise & Sunset with modern design */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-2xl p-3 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <Sun size={14} className="text-yellow-300" />
            <p className="text-[10px] opacity-80">সূর্যোদয়</p>
          </div>
          <p className="text-lg font-bold">{data.Sunrise}</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-3 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <Moon size={14} className="text-indigo-300" />
            <p className="text-[10px] opacity-80">সূর্যাস্ত</p>
          </div>
          <p className="text-lg font-bold">{data.Sunset}</p>
        </div>
      </div>

      {/* Next prayer countdown with glassmorphism */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium opacity-80">পরবর্তী ওয়াক্ত</p>
            <div className="bg-white/20 px-2 py-1 rounded-full">
              <p className="text-[10px] font-bold">{nextPrayer.name}</p>
            </div>
          </div>
          
          <div className="text-5xl font-mono font-bold tracking-wider text-center mb-2">
            {nextPrayer.timeLeft}
          </div>
          
          {nextPrayer.time && (
            <p className="text-center text-xs opacity-60">
              {nextPrayer.time.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>
      </div>

      {/* Current time footer */}
      <div className="mt-4 text-center">
        <p className="text-xs opacity-50">
          বর্তমান সময়: {currentTime.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </p>
        {locationMethod === "auto" && (
          <p className="text-[10px] mt-1 opacity-40">আপনার বর্তমান অবস্থান অনুযায়ী</p>
        )}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
}