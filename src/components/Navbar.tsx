import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#reserve", label: "Reserve" },
  { href: "#order", label: "Order" },
  { href: "#track", label: "Track" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [open]);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "glass py-3" : "py-5"}`}>
      <nav className="container flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="font-display text-2xl text-gradient-gold">登</span>
          <span className="font-display text-xl tracking-wide">Noboru</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-3">
            <Button variant="default" size="sm" asChild>
              <a href="#reserve">Book Table</a>
            </Button>
            <Button variant="outline" size="sm" asChild className="border-gold/50 text-gold hover:bg-gold hover:text-gold-foreground hidden md:inline-flex">
              <a href="#order">Order Now</a>
            </Button>
          </div>
        </div>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-background/95 backdrop-blur-md z-40 animate-fade-in px-6 py-8 flex flex-col gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-2xl font-display border-b border-border/50 pb-4">
              {l.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <Button size="lg" className="shadow-glow" asChild>
              <a href="#reserve" onClick={() => setOpen(false)}>Book Table</a>
            </Button>
            <Button size="lg" variant="outline" className="border-gold/50 text-gold hover:bg-gold hover:text-gold-foreground" asChild>
              <a href="#order" onClick={() => setOpen(false)}>Order Now</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
