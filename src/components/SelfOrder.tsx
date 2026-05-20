import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "./MenuSection";
import { menu, categories, type MenuItem } from "@/lib/menu";
import { useCart } from "@/lib/cart";
import { Plus, Minus, Trash2, ChefHat, ArrowRight, ArrowLeft, ScanLine } from "lucide-react";
import { toast } from "sonner";

type Step = "table" | "browse" | "cart" | "pay" | "tracking";
const trackStages = ["Order Received", "Preparing", "Chef Cooking", "Ready to Serve", "Delivered to Table"];

export const SelfOrder = () => {
  const [step, setStep] = useState<Step>("table");
  const [tableInput, setTableInput] = useState("");
  const [activeCat, setActiveCat] = useState<typeof categories[number]>("Sushi");
  const [customizing, setCustomizing] = useState<MenuItem | null>(null);
  const [spice, setSpice] = useState("Medium");
  const [extras, setExtras] = useState<string[]>([]);
  const [payMethod, setPayMethod] = useState("UPI");
  const [stage, setStage] = useState(0);
  const cart = useCart();

  const startSession = () => {
    if (!tableInput) return toast.error("Enter your table number");
    cart.setTable(tableInput);
    setStep("browse");
  };

  const placeOrder = () => {
    setStep("tracking");
    setStage(0);
    const id = setInterval(() => {
      setStage((s) => {
        if (s >= trackStages.length - 1) { clearInterval(id); return s; }
        return s + 1;
      });
    }, 2200);
  };

  const toggleExtra = (e: string) =>
    setExtras((arr) => (arr.includes(e) ? arr.filter((x) => x !== e) : [...arr, e]));

  return (
    <section id="order" className="py-16 md:py-24 container">
      <SectionHeader kicker="お注文 · Self Order" title="Order from Your Table" subtitle="Tap, customize, and send straight to the kitchen." />

      <div className="max-w-4xl mx-auto glass rounded-3xl p-4 md:p-10">
        {step === "table" && (
          <div className="text-center max-w-md mx-auto py-8 animate-fade-in">
            <ScanLine className="h-12 w-12 text-gold mx-auto mb-4" />
            <h3 className="font-display text-2xl mb-2">Enter Your Table Number</h3>
            <p className="text-muted-foreground text-sm mb-6">Or scan the QR code at your table to begin.</p>
            <div className="flex gap-2">
              <Input placeholder="e.g. 12" value={tableInput} onChange={(e) => setTableInput(e.target.value)} />
              <Button onClick={startSession}>Start <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </div>
          </div>
        )}

        {step === "browse" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <p className="text-sm text-muted-foreground">Table <span className="text-gold font-semibold">#{cart.tableNumber}</span></p>
              <Button variant="outline" size="sm" onClick={() => setStep("cart")}>
                Cart ({cart.items.reduce((a, i) => a + i.qty, 0)}) · ₹{cart.total()}
              </Button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-3 mb-5">
              {categories.map((c) => (
                <button key={c} onClick={() => setActiveCat(c)} className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap border ${activeCat === c ? "bg-primary border-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>{c}</button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {menu.filter((m) => m.category === activeCat).map((item) => (
                <div key={item.id} className="flex gap-3 p-3 rounded-xl border border-border hover:border-gold/40 transition">
                  <img src={item.image} alt={item.name} loading="lazy" width={120} height={120} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2"><h4 className="font-medium truncate">{item.name}</h4><span className="text-gold text-sm">₹{item.price}</span></div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                    <Button size="sm" variant="ghost" className="mt-1 h-7 px-2 text-gold" onClick={() => { setCustomizing(item); setExtras([]); setSpice("Medium"); }}>
                      <Plus className="h-3 w-3 mr-1" /> Customize
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === "cart" && (
          <div className="animate-fade-in">
            <Button variant="ghost" size="sm" onClick={() => setStep("browse")} className="mb-4"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
            <h3 className="font-display text-2xl mb-4">Review Order</h3>
            {cart.items.length === 0 ? (
              <p className="text-muted-foreground">Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  {cart.items.map((i) => (
                    <div key={i.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                      <img src={i.image} alt={i.name} loading="lazy" width={80} height={80} className="w-14 h-14 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{i.name}</p>
                        <p className="text-xs text-muted-foreground">₹{i.price} · {i.prepMins} min</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => cart.dec(i.id)}><Minus className="h-3 w-3" /></Button>
                        <span className="w-6 text-center text-sm">{i.qty}</span>
                        <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => cart.inc(i.id)}><Plus className="h-3 w-3" /></Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => cart.remove(i.id)}><Trash2 className="h-3 w-3" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-lg mb-2"><span>Total</span><span className="text-gold font-semibold">₹{cart.total()}</span></div>
                <p className="text-xs text-muted-foreground mb-5 flex items-center gap-1"><ChefHat className="h-3 w-3" /> Estimated prep time: ~{cart.estMins()} min</p>
                <Button className="w-full shadow-glow" size="lg" onClick={() => setStep("pay")}>Proceed to Payment <ArrowRight className="h-4 w-4 ml-1" /></Button>
              </>
            )}
          </div>
        )}

        {step === "pay" && (
          <div className="animate-fade-in max-w-md mx-auto">
            <Button variant="ghost" size="sm" onClick={() => setStep("cart")} className="mb-4"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
            <h3 className="font-display text-2xl mb-4">Choose Payment</h3>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {["UPI", "Google Pay", "PhonePe", "Paytm", "Card", "Net Banking", "Cash at Restaurant"].map((m) => (
                <button key={m} onClick={() => setPayMethod(m)} className={`px-3 py-3 rounded-lg text-sm border transition ${payMethod === m ? "border-gold bg-gold/10 text-gold" : "border-border hover:border-gold/40"}`}>{m}</button>
              ))}
            </div>
            <div className="p-4 rounded-lg bg-muted/40 border border-border mb-5">
              <div className="flex justify-between text-sm mb-1"><span>Subtotal</span><span>₹{cart.total()}</span></div>
              <div className="flex justify-between text-sm mb-1 text-muted-foreground"><span>Taxes (5%)</span><span>₹{Math.round(cart.total() * 0.05)}</span></div>
              <div className="flex justify-between text-base font-semibold mt-2 pt-2 border-t border-border"><span>Total</span><span className="text-gold">₹{Math.round(cart.total() * 1.05)}</span></div>
            </div>
            <Button size="lg" className="w-full shadow-glow" onClick={placeOrder}>Pay & Place Order</Button>
          </div>
        )}

        {step === "tracking" && (
          <div id="track" className="animate-fade-in max-w-xl mx-auto">
            <h3 className="font-display text-2xl mb-2 text-center">Live Order Tracking</h3>
            <p className="text-center text-muted-foreground text-sm mb-8">Order #{Math.floor(1000 + Math.random() * 9000)} · Table {cart.tableNumber}</p>
            <div className="space-y-4">
              {trackStages.map((s, i) => {
                const done = i <= stage;
                const current = i === stage;
                return (
                  <div key={s} className="flex items-center gap-4">
                    <div className={`relative h-10 w-10 rounded-full flex items-center justify-center border-2 transition ${done ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground"} ${current ? "shadow-glow" : ""}`}>
                      {done ? "✓" : i + 1}
                      {current && <span className="absolute inset-0 rounded-full border-2 border-gold animate-ping opacity-30" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${done ? "text-foreground" : "text-muted-foreground"}`}>{s}</p>
                      {current && <p className="text-xs text-gold">In progress…</p>}
                    </div>
                  </div>
                );
              })}
            </div>
            {stage === trackStages.length - 1 && (
              <Button className="w-full mt-8" variant="outline" onClick={() => { cart.clear(); setStep("table"); setTableInput(""); }}>Start New Order</Button>
            )}
          </div>
        )}
      </div>

      {customizing && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in" onClick={() => setCustomizing(null)}>
          <div className="glass rounded-2xl p-6 max-w-md w-full animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img src={customizing.image} alt={customizing.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="font-display text-xl mb-1">{customizing.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{customizing.description}</p>
            <div className="mb-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Spice Level</p>
              <div className="flex gap-2">
                {["Mild", "Medium", "Hot", "Korean Fire"].map((s) => (
                  <button key={s} onClick={() => setSpice(s)} className={`px-3 py-1.5 rounded-md text-xs border ${spice === s ? "bg-primary border-primary text-primary-foreground" : "border-border"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div className="mb-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Add-ons</p>
              <div className="flex flex-wrap gap-2">
                {["Extra Egg +₹40", "Add Chicken +₹120", "Extra Noodles +₹60", "Extra Sauce +₹30"].map((e) => (
                  <button key={e} onClick={() => toggleExtra(e)} className={`px-3 py-1.5 rounded-md text-xs border ${extras.includes(e) ? "bg-gold border-gold text-gold-foreground" : "border-border"}`}>{e}</button>
                ))}
              </div>
            </div>
            <Button className="w-full" onClick={() => { cart.add(customizing); toast.success(`${customizing.name} added`); setCustomizing(null); }}>
              Add to Cart · ₹{customizing.price}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};
