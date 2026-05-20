import sushi from "@/assets/sushi.jpg";
import ramen from "@/assets/ramen.jpg";
import korean from "@/assets/korean.jpg";
import dessert from "@/assets/dessert.jpg";
import teriyaki from "@/assets/teriyaki.jpg";
import bbq from "@/assets/bbq.jpg";
import cheesecake from "@/assets/cheesecake.jpg";

export type MenuItem = {
  id: string;
  name: string;
  jp?: string;
  description: string;
  price: number;
  image: string;
  category: "Sushi" | "Ramen" | "Korean Bowls" | "Desserts" | "Drinks";
  veg: boolean;
  prepMins: number;
};

export const menu: MenuItem[] = [
  { id: "sushi-1", name: "Salmon Nigiri Platter", jp: "鮭握り", description: "Six-piece premium salmon nigiri with wasabi & pickled ginger.", price: 680, image: sushi, category: "Sushi", veg: false, prepMins: 12 },
  { id: "sushi-2", name: "Avocado Maki Roll", jp: "アボカド巻", description: "Eight-piece creamy avocado roll with sesame and nori.", price: 420, image: sushi, category: "Sushi", veg: true, prepMins: 10 },
  { id: "ramen-1", name: "Tonkotsu Ramen", jp: "豚骨ラーメン", description: "12-hour pork bone broth, chashu, ajitama egg, scallions.", price: 540, image: ramen, category: "Ramen", veg: false, prepMins: 15 },
  { id: "ramen-2", name: "Shoyu Veg Ramen", jp: "醤油ラーメン", description: "Soy-based broth with shiitake, tofu, corn and bamboo.", price: 460, image: ramen, category: "Ramen", veg: true, prepMins: 14 },
  { id: "teri-1", name: "Chicken Teriyaki Don", jp: "照り焼き丼", description: "Glazed chicken over jasmine rice with sesame & spring onion.", price: 510, image: teriyaki, category: "Ramen", veg: false, prepMins: 13 },
  { id: "korean-1", name: "Bibimbap Stone Bowl", description: "Sizzling rice with vegetables, gochujang and a sunny egg.", price: 520, image: korean, category: "Korean Bowls", veg: true, prepMins: 14 },
  { id: "korean-2", name: "Bulgogi BBQ Bowl", description: "Marinated beef, kimchi, scallions over steamed rice.", price: 620, image: bbq, category: "Korean Bowls", veg: false, prepMins: 16 },
  { id: "dessert-1", name: "Mochi Trio", jp: "餅", description: "Matcha, strawberry & mango mochi on a slate plate.", price: 320, image: dessert, category: "Desserts", veg: true, prepMins: 5 },
  { id: "dessert-2", name: "Matcha Cheesecake", description: "Silky matcha cheesecake with gold leaf finish.", price: 360, image: cheesecake, category: "Desserts", veg: true, prepMins: 5 },
  { id: "drink-1", name: "Yuzu Lemonade", description: "Sparkling yuzu citrus refresher.", price: 180, image: dessert, category: "Drinks", veg: true, prepMins: 3 },
  { id: "drink-2", name: "Iced Matcha Latte", description: "Ceremonial matcha whisked with chilled milk.", price: 220, image: dessert, category: "Drinks", veg: true, prepMins: 4 },
];

export const categories = ["Sushi", "Ramen", "Korean Bowls", "Desserts", "Drinks"] as const;
