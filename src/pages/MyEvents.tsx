import { useState, useEffect } from "react";
import { LayoutDashboard, Search, CalendarCheck, Award, UserCircle } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EventCard from "@/components/dashboard/EventCard";
import { Button } from "@/components/ui/button";
import { mockStudentProfile } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const sidebarLinks = [
  { label: "Dashboard", href: "/student/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Browse Events", href: "/events", icon: <Search className="w-5 h-5" /> },
  { label: "My Events", href: "/student/my-events", icon: <CalendarCheck className="w-5 h-5" /> },
  { label: "Certificates", href: "/student/certificates", icon: <Award className="w-5 h-5" /> },
  { label: "Profile", href: "/student/profile", icon: <UserCircle className="w-5 h-5" /> },
];

const MyEvents = () => {
  const [tab, setTab] = useState<"upcoming" | "completed">("upcoming");
  const { toast } = useToast();

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/events/my-events", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (res.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
          return;
        }

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const completedEvents = events.filter((e) => e.status === "completed");
  const displayedEvents = tab === "upcoming" ? upcomingEvents : completedEvents;

  if (loading) {
    return (
      <DashboardLayout sidebarLinks={sidebarLinks} roleLabel="Student" userName={JSON.parse(localStorage.getItem("user") || "{}")?.name || "User"}>
        <div className="p-6">Loading events...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sidebarLinks={sidebarLinks} roleLabel="Student" userName={JSON.parse(localStorage.getItem("user") || "{}")?.name || "User"}>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">My Events</h1>
          <p className="text-muted-foreground mt-1">Track your registered and past events</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            variant={tab === "upcoming" ? "hero" : "outline"}
            size="sm"
            className="rounded-xl"
            onClick={() => setTab("upcoming")}
          >
            Upcoming ({upcomingEvents.length})
          </Button>
          <Button
            variant={tab === "completed" ? "hero" : "outline"}
            size="sm"
            className="rounded-xl"
            onClick={() => setTab("completed")}
          >
            Completed ({completedEvents.length})
          </Button>
        </div>

        {displayedEvents.length === 0 ? (
          <div className="text-center py-16">
            <CalendarCheck className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground">
              No {tab} events
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              {tab === "upcoming" ? "Browse events and register to see them here" : "Events you've attended will appear here"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {displayedEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onUnregister={(id) => toast({ title: "Unregistered", description: `Removed from ${event.title}` })}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyEvents;
