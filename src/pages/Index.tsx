import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { Reservation } from "@/components/Reservation";
import { SelfOrder } from "@/components/SelfOrder";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Noboru — Japanese & Korean Diner",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ahmedabad University, Commerce, Swastik Cross Rd, inside Gate 2, Swastik Society",
      addressLocality: "Navrangpura, Ahmedabad, Gujarat 380009",
      addressCountry: "IN",
    },
    telephone: "+91-6357073004",
    servesCuisine: ["Japanese", "Korean"],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "234" },
    openingHours: "Mo-Su 12:00-23:00",
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
      <Navbar />
      <Hero />
      <MenuSection />
      <Reservation />
      <SelfOrder />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
