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

  // Time format converter (24h to 12h)
  const formatTo12Hr = (time) => {
    if (!time) return "--:--";
    const [hours, minutes] = time.split(':');
    let h = parseInt(hours);
    const m = minutes;
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getDistrictsForDivision = () => {
    const division = BD_DIVISIONS.find(d => d.name === selectedDivision);
    return division ? division.districts : BD_DIVISIONS[0].districts;
  };

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
    } finally {
      setLoading(false);
    }
  };

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
        () => {
          setLocationStatus("লোকেশন পাওয়া যায়নি, ঢাকার সময় দেখানো হচ্ছে");
          fetchTimes({ type: "city", city: "Dhaka" });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationStatus("জিওলোকেশন সাপোর্ট করে না, ঢাকার সময় দেখানো হচ্ছে");
      fetchTimes({ type: "city", city: "Dhaka" });
    }
  };

  const handleManualCity = (district) => {
    setSelectedDistrict(district);
    setLocationMethod("manual");
    fetchTimes({ type: "city", city: district });
    setShowLocationPanel(false);
  };

  const handleDivisionChange = (division) => {
    setSelectedDivision(division);
    const districts = BD_DIVISIONS.find(d => d.name === division).districts;
    setSelectedDistrict(districts[0]);
  };

  useEffect(() => {
    getAutoLocation();
  }, []);

  useEffect(() => {
    if (!data) return;
    const calculateNextPrayer = () => {
      const now = new Date();
      const prayerTimes = PRAYER_ORDER.map(key => {
        if (!data[key]) return null;
        const [h, m] = data[key].split(":");
        const time = new Date(now);
        time.setHours(parseInt(h), parseInt(m), 0);
        return { key, name: PRAYER_NAMES_BN[key], time, timestamp: time.getTime() };
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
        next = { key: "Fajr", name: PRAYER_NAMES_BN.Fajr, time: tomorrow, timestamp: tomorrow.getTime() };
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
      <div className="bg-gradient-to-br from-emerald-900 to-teal-900 dark:from-gray-900 dark:to-emerald-950 p-8 rounded-3xl shadow-2xl text-white">
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="animate-spin w-12 h-12 mb-4 text-emerald-300" />
          <p className="text-sm font-medium text-emerald-100">{locationStatus || "লোড হচ্ছে..."}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-rose-600 to-pink-700 dark:from-gray-900 dark:to-rose-950 p-8 rounded-3xl shadow-2xl text-white">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="w-8 h-8 mb-4" />
          <p className="text-lg font-medium mb-6">{error}</p>
          <button onClick={() => getAutoLocation()} className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full text-sm">আবার চেষ্টা করুন</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950 p-6 rounded-3xl shadow-2xl text-white border border-white/10">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-2xl shadow-lg">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold dark:text-emerald-400">নামাজের সময়</h2>
            <p className="text-[10px] opacity-60 mt-0.5">{formatBanglaNumber(new Date().toLocaleDateString('bn-BD'))}</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowLocationPanel(!showLocationPanel)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
            locationMethod === "auto" ? "bg-green-500/20 dark:bg-emerald-500/10" : "bg-blue-500/20 dark:bg-blue-500/10"
          }`}
        >
          <MapPin size={14} className={locationMethod === "auto" ? "text-green-300" : "text-blue-300"} />
          <span className="text-xs font-medium">{locationMethod === "auto" ? "স্বয়ংক্রিয়" : selectedDistrict}</span>
          <ChevronDown size={14} className={showLocationPanel ? "rotate-180" : ""} />
        </button>
      </div>

      {/* Location Panel */}
      {showLocationPanel && (
        <div className="mb-6 bg-white/5 dark:bg-black/20 backdrop-blur-lg rounded-2xl p-4 border border-white/10 animate-slideDown">
          <div className="mb-3">
            <select value={selectedDivision} onChange={(e) => handleDivisionChange(e.target.value)} className="w-full bg-white/10 dark:bg-gray-800 border border-white/20 rounded-xl px-3 py-2 text-sm">
              {BD_DIVISIONS.map(div => <option key={div.name} value={div.name} className="bg-gray-800">{div.name}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <select value={selectedDistrict} onChange={(e) => handleManualCity(e.target.value)} className="w-full bg-white/10 dark:bg-gray-800 border border-white/20 rounded-xl px-3 py-2 text-sm">
              {getDistrictsForDivision().map(d => <option key={d} value={d} className="bg-gray-800">{d}</option>)}
            </select>
          </div>
          <button onClick={getAutoLocation} className="w-full bg-white/10 dark:bg-emerald-500/20 rounded-xl py-2 text-sm flex items-center justify-center gap-2"><MapPin size={14} /> স্বয়ংক্রিয় লোকেশন</button>
        </div>
      )}

      {/* Main Times (12hr Format Applied) */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((k) => {
          const active = nextPrayer.name === PRAYER_NAMES_BN[k];
          return (
            <div key={k} className={`rounded-2xl p-2 text-center transition-all ${active ? "bg-gradient-to-br from-amber-400 to-amber-600 dark:from-emerald-500 dark:to-teal-600 text-gray-900 shadow-xl scale-105" : "bg-white/10 dark:bg-white/5 border border-white/10"}`}>
              <p className="text-[10px] font-medium opacity-80 mb-1">{PRAYER_NAMES_BN[k]}</p>
              <p className="text-[11px] font-black">{formatTo12Hr(data[k])}</p>
            </div>
          );
        })}
      </div>

      {/* Sunrise/Sunset (12hr Format Applied) */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-orange-500/20 dark:bg-amber-500/10 rounded-2xl p-3 border border-white/10">
          <div className="flex items-center gap-2 mb-1"><Sun size={14} className="text-yellow-300" /><p className="text-[10px] opacity-80">সূর্যোদয়</p></div>
          <p className="text-lg font-bold">{formatTo12Hr(data.Sunrise)}</p>
        </div>
        <div className="bg-indigo-500/20 dark:bg-indigo-500/10 rounded-2xl p-3 border border-white/10">
          <div className="flex items-center gap-2 mb-1"><Moon size={14} className="text-indigo-300" /><p className="text-[10px] opacity-80">সূর্যাস্ত</p></div>
          <p className="text-lg font-bold">{formatTo12Hr(data.Sunset)}</p>
        </div>
      </div>

      {/* Countdown */}
      <div className="relative overflow-hidden bg-white/10 dark:bg-emerald-500/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
        <div className="relative z-10">
          <p className="text-xs text-center font-medium opacity-80 mb-2">পরবর্তী ওয়াক্ত: {nextPrayer.name}</p>
          <div className="text-5xl font-mono font-bold tracking-wider text-center">{nextPrayer.timeLeft}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="text-xs opacity-50">বর্তমান সময়: {currentTime.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</p>
      </div>

      <style jsx>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>
    </div>
  );
}