import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Compass, 
  Moon, 
  MessageSquare, 
  Heart, 
  Calendar, 
  ArrowRight,
  PlayCircle,
  QrCode,
  BookMarked,
  Sparkles,
  Radio,
  Telescope,
  Leaf,
  Users,
  Globe,
  HandHeart,
  GraduationCap,
  FileText,
  Video,
  MapPin,
  AlertCircle
} from 'lucide-react';

const tools = [
  // কুরআন বিভাগ
  {
    category: "কুরআন",
    items: [
      {
        title: "আল-কুরআন",
        desc: "অডিও তিলাওয়াত ও বাংলা অর্থ",
        icon: <BookOpen size={24} />,
        path: "/quran",
        color: "from-emerald-500 to-teal-500",
        bgLight: "bg-emerald-50",
        bgDark: "dark:bg-emerald-950/30",
        textColor: "text-emerald-600",
        darkText: "dark:text-emerald-400",
        features: ["৩০ পারা", "১১৪ সূরা", "৬২৩৬ আয়াত"]
      },
      {
        title: "তাফসীর ইবনে কাসীর",
        desc: "বিস্তারিত তাফসীর ও ব্যাখ্যা",
        icon: <BookMarked size={24} />,
        path: "/tafsir",
        color: "from-emerald-600 to-teal-600",
        bgLight: "bg-emerald-50",
        bgDark: "dark:bg-emerald-950/30",
        textColor: "text-emerald-600",
        darkText: "dark:text-emerald-400",
        features: ["সম্পূর্ণ তাফসীর", "সহজ ভাষায়"]
      },
      {
        title: "কুরআনের গল্প",
        desc: "কুরআনে বর্ণিত নবী-রাসূলদের গল্প",
        icon: <Sparkles size={24} />,
        path: "/quran-stories",
        color: "from-emerald-500 to-green-500",
        bgLight: "bg-emerald-50",
        bgDark: "dark:bg-emerald-950/30",
        textColor: "text-emerald-600",
        darkText: "dark:text-emerald-400",
        features: ["২৫ জন নবী", "ইতিহাসের ঘটনা"]
      }
    ]
  },
  
  // হাদীস বিভাগ
  {
    category: "হাদীস",
    items: [
      {
        title: "সহীহ বুখারী",
        desc: "সবচেয়ে নির্ভরযোগ্য হাদীস গ্রন্থ",
        icon: <BookMarked size={24} />,
        path: "/bukhari",
        color: "from-amber-500 to-orange-500",
        bgLight: "bg-amber-50",
        bgDark: "dark:bg-amber-950/30",
        textColor: "text-amber-600",
        darkText: "dark:text-amber-400",
        features: ["৭৫৬৩ হাদীস", "৯৭ কিতাব"]
      },
      {
        title: "সহীহ মুসলিম",
        desc: "বিশুদ্ধ হাদীসের দ্বিতীয় গ্রন্থ",
        icon: <BookMarked size={24} />,
        path: "/muslim",
        color: "from-amber-500 to-yellow-500",
        bgLight: "bg-amber-50",
        bgDark: "dark:bg-amber-950/30",
        textColor: "text-amber-600",
        darkText: "dark:text-amber-400",
        features: ["৫৩৬২ হাদীস", "৫৭ কিতাব"]
      },
      {
        title: "হাদীসের গল্প",
        desc: "হাদীসে বর্ণিত শিক্ষণীয় ঘটনা",
        icon: <Sparkles size={24} />,
        path: "/hadith-stories",
        color: "from-amber-500 to-amber-600",
        bgLight: "bg-amber-50",
        bgDark: "dark:bg-amber-950/30",
        textColor: "text-amber-600",
        darkText: "dark:text-amber-400",
        features: ["সাহাবীদের জীবনী", "শিক্ষামূলক গল্প"]
      }
    ]
  },

  // নামাজ ও ইবাদত
  {
    category: "নামাজ ও ইবাদত",
    items: [
      {
        title: "নামাজের সময়",
        desc: "আপনার এলাকার সঠিক সময়সূচী",
        icon: <Clock size={24} />,
        path: "/namaj-time",
        color: "from-sky-500 to-blue-500",
        bgLight: "bg-sky-50",
        bgDark: "dark:bg-sky-950/30",
        textColor: "text-sky-600",
        darkText: "dark:text-sky-400",
        features: ["ফযর", "যোহর", "আসর", "মাগরিব", "ইশা"]
      },
      {
        title: "কিবলা কম্পাস",
        desc: "সঠিক কিবলা দিক নির্ণয় করুন",
        icon: <Compass size={24} />,
        path: "/qibla",
        color: "from-blue-500 to-indigo-500",
        bgLight: "bg-blue-50",
        bgDark: "dark:bg-blue-950/30",
        textColor: "text-blue-600",
        darkText: "dark:text-blue-400",
        features: ["রিয়েল টাইম", "৩৬০° নির্দেশক"]
      },
      {
        title: "তসবিহ কাউন্টার",
        desc: "ডিজিটাল জিকির গণনাকারী",
        icon: <PlayCircle size={24} />,
        path: "/tasbih",
        color: "from-rose-500 to-pink-500",
        bgLight: "bg-rose-50",
        bgDark: "dark:bg-rose-950/30",
        textColor: "text-rose-600",
        darkText: "dark:text-rose-400",
        features: ["সুবহানাল্লাহ", "আলহামদুলিল্লাহ", "আল্লাহু আকবার"]
      },
      {
        title: "নামাজ শিক্ষা",
        desc: "সঠিক নামাজ পড়ার পদ্ধতি",
        icon: <GraduationCap size={24} />,
        path: "/namaz-learning",
        color: "from-sky-500 to-cyan-500",
        bgLight: "bg-sky-50",
        bgDark: "dark:bg-sky-950/30",
        textColor: "text-sky-600",
        darkText: "dark:text-sky-400",
        features: ["সূরা ও দোয়া", "নিয়ম-কানুন"]
      }
    ]
  },

  // দোয়া ও জিকির
  {
    category: "দোয়া ও জিকির",
    items: [
      {
        title: "দোয়া ও জিকির",
        desc: "প্রতিদিনের প্রয়োজনীয় মাসনুন দোয়া",
        icon: <Heart size={24} />,
        path: "/duas",
        color: "from-purple-500 to-violet-500",
        bgLight: "bg-purple-50",
        bgDark: "dark:bg-purple-950/30",
        textColor: "text-purple-600",
        darkText: "dark:text-purple-400",
        features: ["সকাল-সন্ধ্যা", "ঘুমানোর আগে", "খাওয়ার পর"]
      },
      {
        title: "সকাল-সন্ধ্যার দোয়া",
        desc: "প্রতিদিন সকালে ও সন্ধ্যায় পড়ার দোয়া",
        icon: <Moon size={24} />,
        path: "/morning-evening-dua",
        color: "from-purple-500 to-fuchsia-500",
        bgLight: "bg-purple-50",
        bgDark: "dark:bg-purple-950/30",
        textColor: "text-purple-600",
        darkText: "dark:text-purple-400",
        features: ["সকালের দোয়া", "সন্ধ্যার দোয়া"]
      },
      {
        title: "ঘুমানোর দোয়া",
        desc: "ঘুমানোর আগে ও পরে পড়ার দোয়া",
        icon: <Moon size={24} />,
        path: "/sleeping-dua",
        color: "from-purple-500 to-purple-600",
        bgLight: "bg-purple-50",
        bgDark: "dark:bg-purple-950/30",
        textColor: "text-purple-600",
        darkText: "dark:text-purple-400",
        features: ["শোয়ার দোয়া", "ঘুম থেকে উঠে"]
      },
      {
        title: "আয়াতুল কুরসী",
        desc: "সর্বশ্রেষ্ঠ আয়াত ও এর ফজিলত",
        icon: <Sparkles size={24} />,
        path: "/ayatul-kursi",
        color: "from-purple-500 to-indigo-500",
        bgLight: "bg-purple-50",
        bgDark: "dark:bg-purple-950/30",
        textColor: "text-purple-600",
        darkText: "dark:text-purple-400",
        features: ["আরবি", "উচ্চারণ", "বাংলা অর্থ"]
      }
    ]
  },

  // ইসলামিক শিক্ষা
  {
    category: "ইসলামিক শিক্ষা",
    items: [
      {
        title: "নবীদের জীবনী",
        desc: "২৫ জন নবী-রাসূলের জীবন কাহিনী",
        icon: <Users size={24} />,
        path: "/prophets-stories",
        color: "from-teal-500 to-emerald-500",
        bgLight: "bg-teal-50",
        bgDark: "dark:bg-teal-950/30",
        textColor: "text-teal-600",
        darkText: "dark:text-teal-400",
        features: ["আদম (আ)", "মূসা (আ)", "ঈসা (আ)", "মুহাম্মদ (সা)"]
      },
      {
        title: "সাহাবীদের জীবনী",
        desc: "রাসূলের সাথীদের জীবন কাহিনী",
        icon: <Users size={24} />,
        path: "/sahabah-stories",
        color: "from-teal-500 to-cyan-500",
        bgLight: "bg-teal-50",
        bgDark: "dark:bg-teal-950/30",
        textColor: "text-teal-600",
        darkText: "dark:text-teal-400",
        features: ["আবু বকর (রা)", "উমর (রা)", "উসমান (রা)", "আলী (রা)"]
      },
      {
        title: "ইসলামের ইতিহাস",
        desc: "ইসলামের গৌরবময় ইতিহাস",
        icon: <Globe size={24} />,
        path: "/islamic-history",
        color: "from-teal-500 to-teal-600",
        bgLight: "bg-teal-50",
        bgDark: "dark:bg-teal-950/30",
        textColor: "text-teal-600",
        darkText: "dark:text-teal-400",
        features: ["মক্কী জীবন", "মাদানী জীবন", "খুলাফায়ে রাশেদীন"]
      }
    ]
  },

  // অন্যান্য টুলস
  {
    category: "অন্যান্য টুলস",
    items: [
      {
        title: "ইসলামিক ক্যালেন্ডার",
        desc: "হিজরি তারিখ ও বিশেষ দিনসমূহ",
        icon: <Calendar size={24} />,
        path: "/calendar",
        color: "from-cyan-500 to-blue-500",
        bgLight: "bg-cyan-50",
        bgDark: "dark:bg-cyan-950/30",
        textColor: "text-cyan-600",
        darkText: "dark:text-cyan-400",
        features: ["হিজরি তারিখ", "রমজান", "ঈদুল ফিতর", "ঈদুল আযহা"]
      },
      {
        title: "যাকাত ক্যালকুলেটর",
        desc: "সঠিক যাকাত হিসাব করুন",
        icon: <HandHeart size={24} />,
        path: "/zakat-calculator",
        color: "from-cyan-500 to-teal-500",
        bgLight: "bg-cyan-50",
        bgDark: "dark:bg-cyan-950/30",
        textColor: "text-cyan-600",
        darkText: "dark:text-cyan-400",
        features: ["স্বর্ণ", "রৌপ্য", "নগদ টাকা"]
      },
      {
        title: "হজ্জ ও ওমরাহ গাইড",
        desc: "হজ্জ ও ওমরাহর সম্পূর্ণ গাইড",
        icon: <MapPin size={24} />,
        path: "/hajj-umrah",
        color: "from-cyan-500 to-sky-500",
        bgLight: "bg-cyan-50",
        bgDark: "dark:bg-cyan-950/30",
        textColor: "text-cyan-600",
        darkText: "dark:text-cyan-400",
        features: ["হজ্জের নিয়ম", "ওমরাহর নিয়ম", "মাসআলা-মাসায়েল"]
      },
      {
        title: "রমজান ক্যালেন্ডার",
        desc: "সেহরি ও ইফতারের সময়সূচী",
        icon: <Moon size={24} />,
        path: "/ramadan",
        color: "from-cyan-500 to-indigo-500",
        bgLight: "bg-cyan-50",
        bgDark: "dark:bg-cyan-950/30",
        textColor: "text-cyan-600",
        darkText: "dark:text-cyan-400",
        features: ["সেহরি", "ইফতার", "তারাবীহ"]
      }
    ]
  },

  // মিডিয়া ও কন্টেন্ট
  {
    category: "মিডিয়া ও কন্টেন্ট",
    items: [
      {
        title: "ইসলামিক ভিডিও",
        desc: "বক্তৃতা, ওয়াজ ও ইসলামিক ভিডিও",
        icon: <Video size={24} />,
        path: "/videos",
        color: "from-rose-500 to-pink-500",
        bgLight: "bg-rose-50",
        bgDark: "dark:bg-rose-950/30",
        textColor: "text-rose-600",
        darkText: "dark:text-rose-400",
        features: ["তাফসীর", "হাদীস", "বক্তৃতা"]
      },
      {
        title: "ইসলামিক অডিও",
        desc: "কুরআন তিলাওয়াত ও বয়ান",
        icon: <Radio size={24} />,
        path: "/audio",
        color: "from-rose-500 to-red-500",
        bgLight: "bg-rose-50",
        bgDark: "dark:bg-rose-950/30",
        textColor: "text-rose-600",
        darkText: "dark:text-rose-400",
        features: ["তিলাওয়াত", "বয়ান", "হামদ-নাত"]
      },
      {
        title: "প্রশ্নোত্তর",
        desc: "ইসলামিক মাসআলা-মাসায়েল",
        icon: <MessageSquare size={24} />,
        path: "/qa",
        color: "from-rose-500 to-orange-500",
        bgLight: "bg-rose-50",
        bgDark: "dark:bg-rose-950/30",
        textColor: "text-rose-600",
        darkText: "dark:text-rose-400",
        features: ["আকীদা", "ফিকহ", "সমসাময়িক"]
      }
    ]
  }
];

export default function IslamicTools() {
  const [expandedCategory, setExpandedCategory] = React.useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full mb-6">
              <Sparkles size={18} className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                ৭০+ ইসলামিক টুলস ও রিসোর্স
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-emerald-100 dark:via-white dark:to-emerald-100 bg-clip-text text-transparent mb-4">
              ইসলামিক টুলস
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              আপনার ইবাদত, শিক্ষা ও দৈনন্দিন জীবনকে সহজ করতে প্রয়োজনীয় সব সরঞ্জাম
            </p>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {tools.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16 last:mb-0">
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {category.category}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800" />
              <button
                onClick={() => setExpandedCategory(expandedCategory === categoryIndex ? null : categoryIndex)}
                className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {expandedCategory === categoryIndex ? 'সংকুচিত করুন' : 'সব দেখুন'}
              </button>
            </div>

            {/* Category Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {(expandedCategory === categoryIndex 
                ? category.items 
                : category.items.slice(0, 4)
              ).map((tool, index) => (
                <Link
                  key={index}
                  to={tool.path}
                  className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2.5 rounded-xl ${tool.bgLight} ${tool.bgDark} group-hover:scale-110 transition-transform duration-300`}>
                        <div className={tool.textColor}>
                          {tool.icon}
                        </div>
                      </div>
                      
                      <div className={`p-1.5 rounded-lg border ${tool.bgLight} ${tool.bgDark} opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                        <ArrowRight size={16} className={tool.textColor} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {tool.title}
                    </h3>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {tool.desc}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5">
                      {tool.features?.map((feature, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded-lg ${tool.bgLight} ${tool.bgDark} ${tool.textColor} ${tool.darkText}`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Border */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tool.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">আরও টুলস চান?</h3>
          <p className="text-emerald-50 mb-6">আপনার প্রয়োজনীয় টুলস সম্পর্কে জানান, আমরা যোগ করে দেব</p>
          <button className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-1 transition-all">
            রিকোয়েস্ট সাবমিট করুন
          </button>
        </div>
      </div>
    </div>
  );
}