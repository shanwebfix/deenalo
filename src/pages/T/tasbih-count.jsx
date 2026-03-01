import React, { useState } from 'react';
import { RotateCcw, Plus, Moon } from 'lucide-react';

export default function Dtasbih() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const reset = () => setCount(0);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">ডিজিটাল তাসবিহ</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">আপনার জিকির গণনা করুন</p>
      </div>

      {/* মেইন কাউন্টার ডিসপ্লে */}
      <div className="relative w-64 h-64 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-2xl border-8 border-emerald-500">
        <span className="text-6xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
          {count}
        </span>
      </div>

      <div className="flex gap-6 items-center">
        {/* রিসেট বাটন */}
        <button 
          onClick={reset}
          className="p-4 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          title="Reset"
        >
          <RotateCcw size={24} className="text-gray-600 dark:text-gray-300" />
        </button>

        {/* প্লাস/কাউন্ট বাটন */}
        <button 
          onClick={increment}
          className="w-32 h-32 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg flex items-center justify-center transform active:scale-95 transition-all"
        >
          <Plus size={48} />
        </button>

        {/* ডার্ক মোড ইন্ডিকেটর বা সাজানো আইকন */}
        <div className="p-4 bg-transparent opacity-0">
           <Moon size={24} />
        </div>
      </div>

      <p className="text-sm text-gray-400 dark:text-gray-500 italic">
        * স্ক্রিনের যেকোনো জায়গায় টাচ করে জিকির গণনা করার অপশন যোগ করা যাবে
      </p>
    </div>
  );
}