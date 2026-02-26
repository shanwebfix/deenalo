import { BookOpen, Languages, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuranLinks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
      
      {/* আরবি কুরআন কার্ড */}
      <Link
        to="/quran-ar"
        className="group relative flex items-center gap-5 p-6 rounded-2xl 
                   bg-white dark:bg-gray-900 
                   border border-gray-100 dark:border-gray-800
                   hover:border-emerald-500 dark:hover:border-emerald-400
                   transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
      >
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
          <BookOpen size={32} strokeWidth={1.5} />
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-1">
            আরবি কুরআন
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            শুধুমাত্র মূল আরবি আয়াত ও তিলাওয়াত
          </p>
        </div>

        <ArrowRight className="text-gray-300 dark:text-gray-700 group-hover:text-emerald-500 transition-colors" size={20} />
      </Link>

      {/* বাংলা অর্থসহ কুরআন কার্ড */}
      <Link
        to="/quran-bn"
        className="group relative flex items-center gap-5 p-6 rounded-2xl 
                   bg-white dark:bg-gray-900 
                   border border-gray-100 dark:border-gray-800
                   hover:border-emerald-500 dark:hover:border-emerald-400
                   transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
      >
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
          <Languages size={32} strokeWidth={1.5} />
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-1">
            বাংলা অর্থসহ কুরআন
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            আরবি এবং সহজ বাংলা অনুবাদ
          </p>
        </div>

        

        <ArrowRight className="text-gray-300 dark:text-gray-700 group-hover:text-emerald-500 transition-colors" size={20} />
      </Link>


      {/* বাংলা অর্থসহ কুরআন কার্ড */}
      <Link
        to="/bukhari"
        className="group relative flex items-center gap-5 p-6 rounded-2xl 
                   bg-white dark:bg-gray-900 
                   border border-gray-100 dark:border-gray-800
                   hover:border-emerald-500 dark:hover:border-emerald-400
                   transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
      >
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
          <Languages size={32} strokeWidth={1.5} />
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 mb-1">
            বাংলা অর্থসহ বুখারী
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            আরবি এবং সহজ বাংলা অনুবাদ
          </p>
        </div>

        

        <ArrowRight className="text-gray-300 dark:text-gray-700 group-hover:text-emerald-500 transition-colors" size={20} />
      </Link>

    </div>
  );
}