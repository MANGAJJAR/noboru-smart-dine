export const Footer = () => (
  <footer className="border-t border-border py-10 mt-12">
    <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="font-display text-xl text-gradient-gold">登</span>
        <span>© {new Date().getFullYear()} Noboru · Japanese & Korean Diner</span>
      </div>
      <p className="text-xs italic">Where Japanese Elegance Meets Smart Digital Dining</p>
    </div>
  </footer>
);
