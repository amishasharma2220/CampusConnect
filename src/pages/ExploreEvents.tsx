import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Calendar, MapPin, Users, Clock, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockEvents, eventCategories, categoryColors, type EventCategory } from "@/data/mockData";
import { motion } from "framer-motion";

const ExploreEvents = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<EventCategory | "All">("All");
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "completed">("all");

  const filtered = mockEvents.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.organizerClub.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || e.category === activeCategory;
    const matchStatus = statusFilter === "all" || e.status === statusFilter;
    return matchSearch && matchCat && matchStatus && e.approvalStatus === "approved";
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 py-10">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary-foreground/60 hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="font-display text-3xl lg:text-4xl font-bold">Explore Events</h1>
          <p className="text-secondary-foreground/60 mt-2 max-w-2xl">
            Discover workshops, hackathons, cultural fests, and sports tournaments happening at MUJ.
          </p>
          <div className="flex items-center gap-6 mt-6 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{mockEvents.filter((e) => e.approvalStatus === "approved").length}</p>
              <p className="text-secondary-foreground/50">Total Events</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{mockEvents.filter((e) => e.status === "upcoming" && e.approvalStatus === "approved").length}</p>
              <p className="text-secondary-foreground/50">Upcoming</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search events, clubs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-11 rounded-xl" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant={activeCategory === "All" ? "default" : "outline"} size="sm" className="rounded-xl" onClick={() => setActiveCategory("All")}>All</Button>
            {eventCategories.map((cat) => (
              <Button key={cat} variant={activeCategory === cat ? "default" : "outline"} size="sm" className="rounded-xl" onClick={() => setActiveCategory(cat)}>{cat}</Button>
            ))}
          </div>
          <div className="flex gap-2">
            {(["all", "upcoming", "completed"] as const).map((s) => (
              <Button key={s} variant={statusFilter === s ? "default" : "outline"} size="sm" className="rounded-xl capitalize" onClick={() => setStatusFilter(s)}>
                {s === "all" ? "All Status" : s}
              </Button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Filter className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground">No events found</h3>
            <p className="text-muted-foreground text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event, i) => (
              <motion.div key={event.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.05, 0.3) }}>
                <Link to={`/events/${event.id}`} className="block rounded-xl border border-border bg-card overflow-hidden hover:shadow-warm hover:border-primary/20 transition-all">
                  <img src={event.banner} alt={event.title} className="w-full h-44 object-cover" />
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={categoryColors[event.category]}>{event.category}</Badge>
                      <Badge variant="outline" className={event.status === "upcoming" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : "bg-muted text-muted-foreground"}>
                        {event.status}
                      </Badge>
                    </div>
                    <h3 className="font-display font-bold text-foreground leading-tight">{event.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {event.date} · {event.time}</div>
                      <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {event.venue}</div>
                      <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" /> {event.registrations}/{event.maxCapacity} registered</div>
                    </div>
                    <p className="text-xs text-primary font-medium">By {event.organizerClub}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <h3 className="font-display text-xl font-bold text-foreground mb-2">Want to host your own event?</h3>
          <p className="text-muted-foreground text-sm mb-4">Club admins can submit events for university approval.</p>
          <Link to="/host-event">
            <Button className="bg-hero-gradient text-primary-foreground rounded-xl">Host an Event</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreEvents;


