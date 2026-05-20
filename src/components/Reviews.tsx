import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { SectionHeader } from "./MenuSection";

const reviews = [
  { name: "Aarav S.", text: "Most authentic ramen I've had outside Tokyo. The cozy ambiance and red lanterns set the perfect mood.", rating: 5 },
  { name: "Priya M.", text: "The bibimbap is phenomenal and the self-order from table is genuinely seamless. Excellent service!", rating: 5 },
  { name: "Rahul K.", text: "Loved the matcha cheesecake and the bulgogi bowl. Premium dining without the wait.", rating: 4 },
  { name: "Ishita R.", text: "Beautifully designed space — feels like Seoul meets Kyoto. Will be back for the omakase.", rating: 5 },
];

export const Reviews = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % reviews.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="reviews" className="py-16 md:py-24 container">
      <SectionHeader kicker="お客様の声 · Reviews" title="Loved by Diners" />
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="flex">{[1,2,3,4,5].map(n => <Star key={n} className={`h-5 w-5 ${n <= 4 ? "fill-gold text-gold" : "fill-gold/40 text-gold/40"}`} />)}</div>
        <span className="font-semibold text-lg">4.5</span>
        <span className="text-muted-foreground">· 234+ reviews</span>
      </div>
      <div className="max-w-2xl mx-auto glass rounded-2xl p-6 md:p-10 relative min-h-[220px]">
        <Quote className="absolute top-6 left-6 h-8 w-8 text-gold/30" />
        <div key={i} className="animate-fade-in text-center">
          <p className="text-lg md:text-xl font-display leading-relaxed mb-5">"{reviews[i].text}"</p>
          <p className="text-sm text-gold">— {reviews[i].name}</p>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, n) => (
            <button key={n} onClick={() => setI(n)} className={`h-1.5 rounded-full transition-all ${n === i ? "w-8 bg-gold" : "w-2 bg-border"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};
