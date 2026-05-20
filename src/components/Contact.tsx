import { MapPin, Phone, Clock, QrCode } from "lucide-react";
import { SectionHeader } from "./MenuSection";

export const Contact = () => (
  <section id="contact" className="py-16 md:py-24 container">
    <SectionHeader kicker="お問い合わせ · Visit Us" title="Find Noboru" />
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="glass rounded-2xl p-5 md:p-7 space-y-5">
        <Item icon={<MapPin />} title="Location">
          <a 
            href="https://www.google.com/maps/place/Noboru+-+Japanese+%26+Korean+Diner/@23.0394718,72.5554182,848m/data=!3m2!1e3!4b1!4m6!3m5!1s0x395e85832df1ad73:0xcd56ebdfe9bd85e3!8m2!3d23.0394718!4d72.5554182!16s%2Fg%2F11x1nrx8s0"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold transition-colors"
          >
            Ahmedabad University, Commerce, Swastik Cross Rd,<br />
            inside Gate 2, Swastik Society, Navrangpura, Ahmedabad 380009
          </a>
        </Item>
        <Item icon={<Phone />} title="Phone">
          <a href="tel:06357073004" className="hover:text-gold transition">063570 73004</a>
        </Item>
        <Item icon={<Clock />} title="Hours">Open Daily · Until 11 PM</Item>
        <Item icon={<QrCode />} title="QR Ordering">
          Scan the unique QR at your table to open the table-specific menu and order instantly.
        </Item>
      </div>
      <a 
        href="https://www.google.com/maps/place/Noboru+-+Japanese+%26+Korean+Diner/@23.0394718,72.5554182,848m/data=!3m2!1e3!4b1!4m6!3m5!1s0x395e85832df1ad73:0xcd56ebdfe9bd85e3!8m2!3d23.0394718!4d72.5554182!16s%2Fg%2F11x1nrx8s0"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-2xl overflow-hidden border border-border min-h-[360px] group relative block"
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10 pointer-events-none" />
        <iframe
          title="Noboru Location"
          src="https://www.google.com/maps?q=Noboru+Japanese+Korean+Diner+Ahmedabad&output=embed"
          className="w-full h-full min-h-[360px] grayscale-[0.2] contrast-[1.1]"
          loading="lazy"
        />
        <div className="absolute bottom-4 right-4 z-20 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-medium uppercase tracking-wider border shadow-sm group-hover:bg-gold group-hover:text-gold-foreground transition-colors">
          Open in Google Maps
        </div>
      </a>
    </div>
  </section>
);

const Item = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4">
    <span className="h-10 w-10 rounded-lg bg-primary/10 text-gold flex items-center justify-center shrink-0">{icon}</span>
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{title}</p>
      <p className="text-sm">{children}</p>
    </div>
  </div>
);
