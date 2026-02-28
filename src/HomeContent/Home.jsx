// Home.jsx
import TodayHadith from "./Hadith"; 
import NamajTime from "./NamajTime"; 
import Kibla from "./Kibla"; 

export default function Home() {
  return (
    <div className="space-y-12">

      {/* এখানে NamajTime কম্পোনেন্ট দেখানো হবে */}
      
      <NamajTime />
      <TodayHadith />
      <Kibla />
    </div>
  );
}