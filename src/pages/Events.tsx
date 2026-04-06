import { useState, useEffect } from "react";
import { LayoutDashboard, Search, CalendarCheck, Award, UserCircle } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EventCard from "@/components/dashboard/EventCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const sidebarLinks = [
  { label: "Dashboard", href: "/student/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Browse Events", href: "/events", icon: <Search className="w-5 h-5" /> },
  { label: "My Events", href: "/student/my-events", icon: <CalendarCheck className="w-5 h-5" /> },
  { label: "Certificates", href: "/student/certificates", icon: <Award className="w-5 h-5" /> },
  { label: "Profile", href: "/student/profile", icon: <UserCircle className="w-5 h-5" /> },
];

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"tech" | "cultural" | "sports" | "All">("All");
  const [events, setEvents] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/events", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchEvents();
  }, []);

  const approvedEvents = events.filter((e) => e.approvalStatus === "approved");
  const filteredEvents = approvedEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.organizer?.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout sidebarLinks={sidebarLinks} roleLabel="Student" userName={JSON.parse(localStorage.getItem("user") || "{}")?.name || "Student"}>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Browse Events</h1>
          <p className="text-muted-foreground mt-1">Discover and register for campus events</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search events, clubs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={activeCategory === "All" ? "hero" : "outline"}
              size="sm"
              className="rounded-xl"
              onClick={() => setActiveCategory("All")}
            >
              All
            </Button>
            {["tech", "cultural", "sports"].map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "hero" : "outline"}
                size="sm"
                className="rounded-xl"
                onClick={() => setActiveCategory(cat as "tech" | "cultural" | "sports")}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground">No events found</h3>
            <p className="text-muted-foreground text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onRegister={(id) => toast({ title: "Registered!", description: `You've signed up for ${event.title}` })}
                onUnregister={(id) => toast({ title: "Unregistered", description: `Removed from ${event.title}` })}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Events;