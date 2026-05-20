import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";

export const Hero = () => (
  <section className="relative min-h-[85dvh] md:min-h-screen flex items-center overflow-hidden py-20 md:py-0">
    <img
      src={hero}
      alt="Noboru restaurant interior with red lanterns and steaming ramen"
      className="absolute inset-0 w-full h-full object-cover"
      width={1920}
      height={1080}
    />
    <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
    <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />

    <div className="container relative z-10 pt-28 md:pt-32 pb-4 md:pb-12">
      <div className="max-w-2xl animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
          <span className="text-gold text-sm">登</span>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Ahmedabad · Navrangpura</span>
        </div>
        <h1 className="font-display text-4xl md:text-7xl leading-[1.1] mb-6">
          Authentic <span className="text-gradient-red">Japanese</span> &{" "}
          <span className="text-gradient-gold">Korean</span> Dining Experience
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl">
          Reserve your table, order directly from your seat, and enjoy seamless digital dining at Noboru.
        </p>
        <div className="flex flex-wrap gap-3 mb-10">
          <Button size="lg" asChild className="shadow-glow">
            <a href="#reserve">Book Table <ArrowRight className="ml-1 h-4 w-4" /></a>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-gold/50 text-gold hover:bg-gold hover:text-gold-foreground">
            <a href="#order">Order Now</a>
          </Button>
          <Button size="lg" variant="ghost" asChild>
            <a href="#menu">Explore Menu</a>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-6">
        <div className="flex flex-col gap-2 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg">4.5</span>
            <div className="flex gap-0.5 animate-slide-right">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={`h-4 w-4 ${i <= 4 ? "fill-gold text-gold" : "fill-gold/50 text-gold/50"}`} />
              ))}
            </div>
          </div>
          <span className="text-muted-foreground text-sm tracking-wide uppercase">234+ Reviews</span>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: "800ms" }}>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 animate-float text-left md:text-right max-w-[300px] leading-relaxed">
            Where Japanese Elegance Meets<br className="hidden md:block" /> Smart Digital Dining
          </p>
        </div>
      </div>
    </div>

  </section>
);
