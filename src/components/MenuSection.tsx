import { useState } from "react";
import { Plus, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { menu, categories, type MenuItem } from "@/lib/menu";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const MenuSection = () => {
  const [active, setActive] = useState<(typeof categories)[number]>("Sushi");
  const items = menu.filter((m) => m.category === active);
  const { add } = useCart();

  return (
    <section id="menu" className="py-12 md:py-24 container">
      <SectionHeader kicker="お品書き · Menu" title="Interactive Digital Menu" subtitle="Crafted dishes from Tokyo's alleyways and Seoul's hottest streets." />
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-5 py-2 rounded-full text-sm transition-all border ${
              active === c
                ? "bg-primary border-primary text-primary-foreground shadow-glow"
                : "border-border text-muted-foreground hover:text-gold hover:border-gold/40"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <article
            key={item.id}
            className="group rounded-2xl overflow-hidden glass hover-lift animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={item.image} alt={item.name} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <Badge className={`absolute top-3 left-3 ${item.veg ? "bg-emerald-600/90" : "bg-primary/90"} text-white border-0`}>
                {item.veg ? <><Leaf className="h-3 w-3 mr-1"/>Veg</> : "Non-Veg"}
              </Badge>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-display text-xl">{item.name}</h3>
                  {item.jp && <p className="text-xs text-gold/80 mt-0.5">{item.jp}</p>}
                </div>
                <span className="text-gold font-semibold whitespace-nowrap">₹{item.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
              <Button
                size="sm"
                className="w-full"
                onClick={() => { add(item); toast.success(`${item.name} added to cart`); }}
              >
                <Plus className="h-4 w-4 mr-1" /> Add to Cart
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export const SectionHeader = ({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) => (
  <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12 animate-fade-in">
    <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">{kicker}</p>
    <h2 className="font-display text-3xl md:text-5xl mb-4">{title}</h2>
    {subtitle && <p className="text-sm md:text-base text-muted-foreground">{subtitle}</p>}
  </div>
);

export type { MenuItem };
