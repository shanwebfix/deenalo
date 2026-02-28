import { BookOpen, Languages, ArrowRight, Headphones, BookText, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function QuranLinks() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cards = [
    {
      id: 'quran-ar',
      to: "/quran-ar",
      icon: BookOpen,
      icon2: Headphones,
      title: "আরবি কুরআন",
      description: "শুধুমাত্র মূল আরবি আয়াত ও তিলাওয়াত",
      gradient: "from-emerald-600 to-emerald-500",
      lightBg: "bg-emerald-50",
      lightBorder: "border-emerald-200",
      textColor: "text-emerald-600",
      darkText: "dark:text-emerald-400",
      darkBg: "dark:bg-emerald-950/30",
      darkBorder: "dark:border-emerald-800",
      features: ["মিশারি রশিদ", "আব্দুল বাসিত", "সাদ আল-ঘামিদি"]
    },
    {
      id: 'quran-bn',
      to: "/quran-bn",
      icon: Languages,
      icon2: BookText,
      title: "বাংলা অর্থসহ কুরআন",
      description: "আরবি এবং সহজ বাংলা অনুবাদ",
      gradient: "from-sky-600 to-sky-500",
      lightBg: "bg-sky-50",
      lightBorder: "border-sky-200",
      textColor: "text-sky-600",
      darkText: "dark:text-sky-400",
      darkBg: "dark:bg-sky-950/30",
      darkBorder: "dark:border-sky-800",
      features: ["শায়খুল হাদীস", "ড. মুজিবুর রহমান", "তাফসীর"]
    },
    {
      id: 'bukhari',
      to: "/bukhari",
      icon: ScrollText,
      icon2: BookText,
      title: "বাংলা অর্থসহ বুখারী",
      description: "আরবি এবং সহজ বাংলা অনুবাদ",
      gradient: "from-amber-600 to-amber-500",
      lightBg: "bg-amber-50",
      lightBorder: "border-amber-200",
      textColor: "text-amber-600",
      darkText: "dark:text-amber-400",
      darkBg: "dark:bg-amber-950/30",
      darkBorder: "dark:border-amber-800",
      features: ["সহীহ হাদীস", "ইমাম বুখারী (রহ)", "৭০+ কিতাব"]
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Simple header */}
      <div className="px-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          ইসলামিক লাইব্রেরি
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          কুরআন ও হাদীস অধ্যয়ন
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6 pt-0">
        {cards.map((card) => {
          const Icon = card.icon;
          const Icon2 = card.icon2;
          const isHovered = hoveredCard === card.id;

          return (
            <Link
              key={card.id}
              to={card.to}
              className="group relative block h-full"
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Main card */}
              <div 
                className={`relative h-full p-6 rounded-2xl
                  bg-white dark:bg-gray-900
                  border-2 ${card.lightBorder} ${card.darkBorder}
                  hover:border-${card.textColor.split('-')[1]}-500
                  transition-all duration-300
                  ${isHovered ? 'shadow-xl -translate-y-1' : 'shadow-md'}
                  flex flex-col`}
              >
                {/* Icon section */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    {/* Main icon */}
                    <div className={`p-3 rounded-xl ${card.lightBg} ${card.darkBg}`}>
                      <Icon size={28} className={card.textColor} />
                    </div>

                    {/* Secondary icon */}
                    <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-lg
                      bg-white dark:bg-gray-800 shadow-md
                      border ${card.lightBorder} ${card.darkBorder}`}>
                      <Icon2 size={14} className={card.textColor} />
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className={`p-2 rounded-lg ${card.lightBg} ${card.darkBg}`}>
                    <ArrowRight 
                      size={18}
                      className={`${card.textColor} group-hover:translate-x-1 transition-transform`}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {card.description}
                  </p>

                  {/* Feature chips */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {card.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className={`text-xs px-2.5 py-1.5 rounded-lg
                          ${card.lightBg} ${card.darkBg}
                          ${card.textColor} ${card.darkText}
                          border ${card.lightBorder} ${card.darkBorder}`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}