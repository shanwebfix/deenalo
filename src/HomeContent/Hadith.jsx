import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const ramadanHadiths = [
  { text: "যে ব্যক্তি রমজানে ইমান সহকারে উপবাস রাখে, তার পূর্বের সমস্ত পাপ ক্ষমা করা হয়।", ref: "সহীহ বুখারী ও মুসলিম" },
  { text: "রোজা একটি ঢাল। তাই যে ব্যক্তি রোজা রাখে, তাকে কোনো পাপ কাজ থেকে বিরত থাকতে সাহায্য করে।", ref: "সহীহ মুসলিম" },
  { text: "রমজান মাসে জান্নাতের দরজা খোলা হয় এবং জাহান্নামের দরজা বন্ধ থাকে।", ref: "সহীহ বুখারী" },
  { text: "রোজাদারের জন্য দুটি আনন্দ: একটি ইফতারের সময়, অন্যটি আল্লাহর সাথে সাক্ষাতের সময়। রোজাদারের মুখের গন্ধ আল্লাহর কাছে মিশক আম্বারের চেয়েও অধিক প্রিয়।", ref: "সহীহ বুখারী" }, // বড় টেক্সট টেস্ট করার জন্য
];

export default function RamadanHadithSlider() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoHeight={true} // এখানে মেইন ম্যাজিক, এটি টেক্সট অনুযায়ী হাইট নিবে
        autoplay={{ 
          delay: 4000, 
          disableOnInteraction: false 
        }}
        pagination={{ clickable: true }}
        className="mySwiper !pb-12" // প্যাজিনেশনের জন্য নিচে একটু স্পেস
      >
        {ramadanHadiths.map((h, idx) => (
          <SwiperSlide key={idx} className="h-auto"> 
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-lg h-full flex flex-col justify-center transition-all duration-300">
              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-6 italic leading-relaxed text-center">
                "{h.text}"
              </p>
              <div className="h-px bg-emerald-100 dark:bg-emerald-900/30 w-24 mx-auto mb-4"></div>
              <p className="text-xs text-emerald-600 font-bold text-center tracking-widest uppercase">
                সূত্র: {h.ref}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* প্যাজিনেশন ডট এবং স্লাইডার হাইট ট্রানজিশন ফিক্স */}
      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #10b981 !important;
        }
        /* হাইট পরিবর্তনের সময় যেন ঝটকা না লাগে তার জন্য ট্রানজিশন */
        .swiper-wrapper {
          transition: height 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}