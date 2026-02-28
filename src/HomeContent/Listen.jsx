import { BookOpen, Languages, ArrowRight, Headphones, BookMarked, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function QuranLinks() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      id: 'quran',
      to: "/quran-mp3",
      icon: BookOpen,
      icon2: Headphones,
      title: "কুরআন অডিও",
      description: "শুধুমাত্র মূল আয়াত ও তিলাওয়াত",
      gradient: "from-emerald-500 to-teal-400",
      bgColor: "emerald",
      features: ["মিশারি রশিদ", "আব্দুল বাসিত", "সাদ আল-ঘামিদি"]
    },
    {
      id: 'sirah',
      to: "/sirah",
      icon: BookMarked, // Changed to BookMarked for sirah
      icon2: Sparkles,
      title: "বাংলা সিরাহ",
      description: "নবী (সাঃ) এর জীবনী",
      gradient: "from-blue-500 to-indigo-400", // Changed to blue gradient
      bgColor: "blue",
      features: ["জন্ম থেকে ওফাত", "মক্কী জীবন", "মাদানী জীবন"]
    }
  ];

  const getGradientClasses = (color) => {
    const gradients = {
      emerald: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-400/5 dark:to-teal-400/5",
      blue: "from-blue-500/10 to-indigo-500/10 dark:from-blue-400/5 dark:to-indigo-400/5"
    };
    return gradients[color];
  };

  const getIconGradient = (color) => {
    const gradients = {
      emerald: "from-emerald-500 to-teal-400",
      blue: "from-blue-500 to-indigo-400"
    };
    return gradients[color];
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Minimal header */}
      <div className="px-6 mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
          অডিও লাইব্রেরি
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          কুরআন তিলাওয়াত ও সিরাহ অধ্যয়ন
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 pt-0">
        {cards.map((card) => {
          const Icon = card.icon;
          const Icon2 = card.icon2;
          const isHovered = hoveredCard === card.id;

          return (
            <Link
              key={card.id}
              to={card.to}
              className="group relative block"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card container with modern border */}
              <div 
                className={`relative p-8 rounded-3xl
                  bg-white dark:bg-gray-900
                  border-2 border-gray-100 dark:border-gray-800
                  hover:border-${card.bgColor}-500 dark:hover:border-${card.bgColor}-400
                  transition-all duration-500 ease-out
                  ${isHovered ? 'shadow-2xl scale-[1.02]' : 'shadow-lg hover:shadow-xl'}
                  overflow-hidden`}
              >
                {/* Abstract background shape */}
                <div 
                  className={`absolute -top-24 -right-24 w-48 h-48 rounded-full 
                    bg-gradient-to-br ${card.gradient} opacity-5 
                    group-hover:opacity-10 transition-opacity duration-700
                    group-hover:scale-150 blur-3xl`}
                />

                {/* Top section with icons */}
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    {/* Main icon with gradient background */}
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity`} />
                      <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                        <Icon size={28} strokeWidth={1.5} className="text-white" />
                      </div>
                    </div>

                    {/* Secondary icon - floating */}
                    <div className={`absolute -bottom-2 -right-2 p-2.5 rounded-xl
                      bg-white dark:bg-gray-800 shadow-md
                      border border-gray-100 dark:border-gray-700
                      group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300`}>
                      <Icon2 size={16} className={`text-${card.bgColor}-600 dark:text-${card.bgColor}-400`} />
                    </div>
                  </div>

                  {/* Arrow button */}
                  <div className={`p-2.5 rounded-xl border border-gray-200 dark:border-gray-700
                    group-hover:border-${card.bgColor}-200 dark:group-hover:border-${card.bgColor}-800
                    group-hover:bg-${card.bgColor}-50 dark:group-hover:bg-${card.bgColor}-900/20
                    transition-all duration-300`}>
                    <ArrowRight 
                      size={20}
                      className={`text-gray-400 dark:text-gray-600
                        group-hover:text-${card.bgColor}-600 dark:group-hover:text-${card.bgColor}-400
                        group-hover:translate-x-1 transition-all duration-300`}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 
                    group-hover:translate-x-1 transition-transform duration-300">
                    {card.title}
                  </h3>
                  
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Feature chips - minimalist */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {card.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className={`text-xs px-3 py-1.5 rounded-full
                          bg-gray-50 dark:bg-gray-800/50
                          text-gray-600 dark:text-gray-400
                          border border-gray-200 dark:border-gray-700
                          group-hover:border-${card.bgColor}-200 dark:group-hover:border-${card.bgColor}-800
                          transition-all duration-300`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div 
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 
                    bg-gradient-to-r ${card.gradient} rounded-full
                    group-hover:w-2/3 transition-all duration-500 ease-out`}
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Subtle footer note */}
      <div className="text-center mt-6">
        <p className="text-xs text-gray-400 dark:text-gray-600">
          আরও অডিও কন্টেন্ট যোগ করা হবে
        </p>
      </div>
    </div>
  );
}