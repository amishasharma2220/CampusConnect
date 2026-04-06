import { useState } from "react";
import { MapPin, Navigation, Clock, Users, Search, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Venue {
  id: string;
  name: string;
  type: "auditorium" | "lab" | "ground" | "hall" | "classroom";
  capacity: number;
  location: string;
  block: string;
  floor: string;
  facilities: string[];
  available: boolean;
  image: string;
  directions: string;
  coordinates: { x: number; y: number };
}

const venues: Venue[] = [
  {
    id: "v1", name: "Shaarda Pai Auditorium", type: "auditorium", capacity: 500,
    location: "Academic Block 3, Ground Floor", block: "AB-3", floor: "Ground",
    facilities: ["Projector", "Sound System", "AC", "Stage", "Green Room"],
    available: true, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
    directions: "Enter from Main Gate → Turn right at Old Mess→ AB-3 is the 3rd building on your left",
    coordinates: { x: 35, y: 25 }
  },
  {
    id: "v2", name: "Vasanti Pai Auditorium ", type: "hall", capacity: 800,
    location: "Academic Block 2, Ground Floor", block: "AB-2", floor: "Ground",
    facilities: ["Projector", "Sound System", "AC", "Stage", "VIP Seating", "Backstage"],
    available: true, image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop",
    directions: "Enter from Main Gate → Straight ahead past the library → AB-2 is on the front",
    coordinates: { x: 50, y: 40 }
  },
  {
    id: "v3", name: "CS Lab 3", type: "lab", capacity: 100,
    location: "Academic Block 4, 2nd Floor", block: "AB-4", floor: "2nd",
    facilities: ["Computers", "Projector", "AC", "Whiteboard"],
    available: false, image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop",
    directions: "Enter from Main Gate → Turn left → AB-4 is the 2nd building → Take stairs to 2nd floor, Room 203",
    coordinates: { x: 25, y: 55 }
  },
  {
    id: "v4", name: "Cricket Ground", type: "ground", capacity: 5000,
    location: "Behind LHC ", block: "Sports", floor: "Open",
    facilities: ["Floodlights", "Seating Gallery", "PA System", "First Aid"],
    available: true, image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=250&fit=crop",
    directions: "Enter from Main Gate → Go straight past OLD Mess → Ground is behind LHC",
    coordinates: { x: 70, y: 70 }
  },
  {
    id: "v5", name: "Football Ground", type: "hall", capacity: 200,
    location: "Sports Complex, Ground Floor", block: "Sports", floor: "Ground",
    facilities: ["Badminton Courts", "Table Tennis", "AC", "Scoreboard"],
    available: true, image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=250&fit=crop",
    directions: "Enter from Side Gate → Sports Complex is directly ahead → Hall is on the ground floor",
    coordinates: { x: 75, y: 55 }
  },
  {
    id: "v6", name: "Confrence Hall-1", type: "classroom", capacity: 60,
    location: "Confrence Hall, 1st Floor", block: "LHC", floor: "1st",
    facilities: ["Projector", "AC", "Whiteboard", "High-speed WiFi", "Breakout Rooms"],
    available: true, image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop",
    directions: "Enter from Main Gate → Turn right after library → Innovation Block, 1st floor",
    coordinates: { x: 55, y: 20 }
  },
  {
    id: "v7", name: "Seminar Hall AB-3", type: "hall", capacity: 150,
    location: "Academic Block 3, 1st Floor", block: "AB-3", floor: "1st",
    facilities: ["Projector", "Sound System", "AC", "Podium"],
    available: true, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop",
    directions: "Enter from Main Gate → Left at fountain → AB-3 is 1st building → 1st floor, Room 101",
    coordinates: { x: 20, y: 35 }
  },
];

const typeColors: Record<string, string> = {
  auditorium: "bg-primary/10 text-primary border-primary/20",
  lab: "bg-accent/10 text-accent border-accent/20",
  ground: "bg-emerald-100 text-emerald-700 border-emerald-200",
  hall: "bg-violet-100 text-violet-700 border-violet-200",
  classroom: "bg-cyan-100 text-cyan-700 border-cyan-200",
};

const VenueFinder = () => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [showDirections, setShowDirections] = useState<string | null>(null);

  const types = ["all", "auditorium", "lab", "ground", "hall", "classroom"];

  const filtered = venues.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedType === "all" || v.type === selectedType;
    return matchSearch && matchType;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary mb-2 inline-flex items-center gap-1">
            ← Back to Home
          </Link>
          <h1 className="font-display text-3xl font-bold text-foreground mt-2">
            <MapPin className="w-8 h-8 inline text-primary mr-2" />
            Campus Venue Finder
          </h1>
          <p className="text-muted-foreground mt-1">Find event venues across MUJ campus with interactive maps and directions.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search venues by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {types.map((t) => (
              <Button
                key={t}
                variant={selectedType === t ? "default" : "outline"}
                size="sm"
                className="rounded-full capitalize"
                onClick={() => setSelectedType(t)}
              >
                {t === "all" ? "All Venues" : t}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interactive Campus Map */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-4 sticky top-4">
              <h3 className="font-display font-bold text-foreground mb-3">Campus Map</h3>
              <div className="relative bg-muted rounded-xl aspect-square overflow-hidden">
                {/* Simplified campus map */}
                <div className="absolute inset-0 p-4">
                  {/* Campus boundary */}
                  <div className="absolute inset-4 border-2 border-dashed border-border rounded-2xl" />
                  
                  {/* Gate */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-muted-foreground bg-card px-2 py-0.5 rounded">
                    Main Gate
                  </div>

                  {/* Road lines */}
                  <div className="absolute top-[40%] left-[10%] right-[10%] h-0.5 bg-border" />
                  <div className="absolute top-[10%] bottom-[10%] left-1/2 w-0.5 bg-border" />

                  {/* Venue dots */}
                  {venues.map((v) => (
                    <motion.button
                      key={v.id}
                      className={`absolute w-4 h-4 rounded-full border-2 transition-all z-10 ${
                        selectedVenue?.id === v.id
                          ? "bg-primary border-primary scale-150 glow-primary"
                          : "bg-accent/60 border-accent hover:scale-125"
                      }`}
                      style={{ left: `${v.coordinates.x}%`, top: `${v.coordinates.y}%`, transform: "translate(-50%, -50%)" }}
                      onClick={() => setSelectedVenue(v)}
                      whileHover={{ scale: 1.4 }}
                      title={v.name}
                    />
                  ))}

                  {/* Selected venue label */}
                  {selectedVenue && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bg-card border border-border rounded-lg px-2 py-1 text-[10px] font-semibold text-foreground shadow-card z-20 whitespace-nowrap"
                      style={{
                        left: `${selectedVenue.coordinates.x}%`,
                        top: `${selectedVenue.coordinates.y - 8}%`,
                        transform: "translate(-50%, -100%)",
                      }}
                    >
                      {selectedVenue.name}
                    </motion.div>
                  )}
                </div>

                {/* Legend */}
                <div className="absolute bottom-2 left-2 bg-card/90 rounded-lg px-2 py-1 text-[9px] text-muted-foreground">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mr-1" /> Selected
                  <span className="inline-block w-2 h-2 rounded-full bg-accent/60 ml-2 mr-1" /> Venue
                </div>
              </div>
            </div>
          </div>

          {/* Venue Cards */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-sm text-muted-foreground">{filtered.length} venue(s) found</p>
            <AnimatePresence mode="popLayout">
              {filtered.map((venue, i) => (
                <motion.div
                  key={venue.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-card border rounded-2xl overflow-hidden transition-all ${
                    selectedVenue?.id === venue.id ? "border-primary shadow-warm" : "border-border shadow-card"
                  }`}
                  onClick={() => setSelectedVenue(venue)}
                >
                  <div className="flex flex-col sm:flex-row">
                    <img src={venue.image} alt={venue.name} className="w-full sm:w-48 h-36 sm:h-auto object-cover" />
                    <div className="p-5 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-display font-bold text-foreground text-lg">{venue.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" /> {venue.location}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={`${typeColors[venue.type]} border text-xs capitalize`}>{venue.type}</Badge>
                          <Badge className={venue.available ? "bg-emerald-100 text-emerald-700 border-emerald-200 border text-xs" : "bg-destructive/10 text-destructive border-destructive/20 border text-xs"}>
                            {venue.available ? "Available" : "Booked"}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {venue.capacity} capacity</span>
                        <span className="flex items-center gap-1"><Navigation className="w-3 h-3" /> Block {venue.block}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Floor: {venue.floor}</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {venue.facilities.map((f) => (
                          <span key={f} className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{f}</span>
                        ))}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-3 text-primary"
                        onClick={(e) => { e.stopPropagation(); setShowDirections(showDirections === venue.id ? null : venue.id); }}
                      >
                        <Navigation className="w-3 h-3 mr-1" />
                        {showDirections === venue.id ? "Hide Directions" : "Get Directions"}
                        <ChevronRight className={`w-3 h-3 ml-1 transition-transform ${showDirections === venue.id ? "rotate-90" : ""}`} />
                      </Button>

                      <AnimatePresence>
                        {showDirections === venue.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 bg-muted/50 rounded-xl p-3 text-sm text-foreground">
                              <p className="font-semibold text-xs text-muted-foreground uppercase mb-1">Directions from Main Gate</p>
                              <p>{venue.directions}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueFinder;
