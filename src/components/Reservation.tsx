import { useState } from "react";
import { Calendar, Clock, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "./MenuSection";
import { toast } from "sonner";

const seatings = ["Indoor", "Outdoor", "Window", "Private"] as const;
const times = ["12:30", "13:30", "18:30", "19:30", "20:30", "21:30"];

type Table = { id: string; seats: number; type: typeof seatings[number]; available: boolean };
const tables: Table[] = [
  { id: "T1", seats: 2, type: "Window", available: true },
  { id: "T2", seats: 2, type: "Window", available: false },
  { id: "T3", seats: 4, type: "Indoor", available: true },
  { id: "T4", seats: 4, type: "Indoor", available: true },
  { id: "T5", seats: 6, type: "Indoor", available: false },
  { id: "T6", seats: 4, type: "Outdoor", available: true },
  { id: "T7", seats: 2, type: "Outdoor", available: true },
  { id: "T8", seats: 8, type: "Private", available: true },
];

export const Reservation = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(times[2]);
  const [guests, setGuests] = useState(2);
  const [seat, setSeat] = useState<typeof seatings[number]>("Indoor");
  const [tableId, setTableId] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const filtered = tables.filter((t) => t.type === seat);

  const confirm = () => {
    if (!tableId) return toast.error("Please select a table");
    const id = "NB-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setBookingId(id);
    toast.success(`Reservation confirmed · ${id}`);
  };

  return (
    <section id="reserve" className="py-16 md:py-24 container">
      <SectionHeader kicker="ご予約 · Reservation" title="Smart Table Reservation" subtitle="Pick your perfect seat in seconds." />
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-5 md:p-8 space-y-5">
          <Field icon={<Calendar className="h-4 w-4 text-gold" />} label="Date">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field icon={<Clock className="h-4 w-4 text-gold" />} label="Time">
            <div className="flex flex-wrap gap-2">
              {times.map((t) => (
                <button key={t} onClick={() => setTime(t)} className={`px-3 py-1.5 rounded-md text-sm border transition ${time === t ? "bg-primary border-primary text-primary-foreground" : "border-border hover:border-gold/50"}`}>{t}</button>
              ))}
            </div>
          </Field>
          <Field icon={<Users className="h-4 w-4 text-gold" />} label="Guests">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setGuests(Math.max(1, guests - 1))}>−</Button>
              <span className="w-10 text-center text-lg">{guests}</span>
              <Button variant="outline" size="sm" onClick={() => setGuests(Math.min(12, guests + 1))}>+</Button>
            </div>
          </Field>
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">Seating Preference</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {seatings.map((s) => (
                <button key={s} onClick={() => { setSeat(s); setTableId(null); }} className={`px-3 py-2.5 rounded-md text-sm border transition ${seat === s ? "bg-gold border-gold text-gold-foreground" : "border-border hover:border-gold/50"}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 md:p-8">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">Floor Layout · {seat}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 min-h-[260px]">
            {filtered.map((t) => (
              <button
                key={t.id}
                disabled={!t.available}
                onClick={() => setTableId(t.id)}
                className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center text-sm transition relative ${
                  !t.available ? "border-border/50 bg-muted/30 text-muted-foreground/50 cursor-not-allowed" :
                  tableId === t.id ? "border-gold bg-gold/10 text-gold shadow-glow" :
                  "border-border hover:border-primary/60"
                }`}
              >
                <span className="font-display text-lg">{t.id}</span>
                <span className="text-xs">{t.seats} seats</span>
                {!t.available && <span className="absolute inset-x-0 bottom-1 text-[10px]">Booked</span>}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-6">
            <Legend color="border-border" label="Available" />
            <Legend color="border-gold bg-gold/10" label="Selected" />
            <Legend color="border-border/50 bg-muted/30" label="Booked" />
          </div>
          <Button onClick={confirm} size="lg" className="w-full shadow-glow">
            Confirm Reservation
          </Button>
          {bookingId && (
            <div className="mt-5 p-4 rounded-lg border border-gold/40 bg-gold/5 animate-fade-in">
              <div className="flex items-center gap-2 text-gold mb-1"><Check className="h-4 w-4" /> Booking Confirmed</div>
              <p className="text-sm">ID <span className="font-mono text-gold">{bookingId}</span> · {date} · {time} · {guests} guests · Table {tableId}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Field = ({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">{icon}{label}</Label>
    {children}
  </div>
);
const Legend = ({ color, label }: { color: string; label: string }) => (
  <span className="flex items-center gap-2"><span className={`inline-block w-4 h-4 rounded border-2 ${color}`} />{label}</span>
);
