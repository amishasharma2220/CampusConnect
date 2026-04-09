import React from "react";
import { LayoutDashboard, Calendar, CalendarCheck, Award, UserCircle, Search } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import useStudentData from "../hooks/useStudentData";
import { useUser } from "../context/UserContext";

const sidebarLinks = [
  { label: "Dashboard", href: "/student/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Browse Events", href: "/events", icon: <Search className="w-5 h-5" /> },
  { label: "My Events", href: "/student/my-events", icon: <CalendarCheck className="w-5 h-5" /> },
  { label: "Leaderboard", href: "/leaderboard", icon: <Award className="w-5 h-5" /> },
  { label: "Venue Finder", href: "/venues", icon: <CalendarCheck className="w-5 h-5" /> },
  { label: "Certificates", href: "/student/certificates", icon: <Award className="w-5 h-5" /> },
  { label: "Profile", href: "/student/profile", icon: <UserCircle className="w-5 h-5" /> },
];

const StudentDashboard = () => {
  const { toast } = useToast();
  const [refresh, setRefresh] = React.useState(0);
  const [actionLoading, setActionLoading] = React.useState<string | null>(null);
const { userName, setUserName } = useUser();
const { profile, registeredEvents, upcomingEvents, events, loading } = useStudentData(refresh);

  const myUpcoming = registeredEvents.filter((e: any) => {
    if (!e.event_date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(e.event_date) >= today;
  });

  const recommended = upcomingEvents.filter((e: any) => !e.isRegistered).slice(0, 3);

  if (loading) {
    return (
      <DashboardLayout sidebarLinks={sidebarLinks} roleLabel="Student" userName="Loading...">
        <div className="space-y-8">
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28 rounded-2xl" />)}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sidebarLinks={sidebarLinks} roleLabel="Student" userName={userName}>
      <div className="space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">
            Welcome back, <span className="text-gradient">{(userName || "Student").split(" ")[0]}</span> 👋
          </h1>
          <p className="text-muted-foreground mt-1">Here's what's happening on campus today.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Events Registered" value={registeredEvents.length} icon={<Calendar className="w-6 h-6" />} />
          <StatsCard title="Upcoming Events" value={myUpcoming.length} icon={<CalendarCheck className="w-6 h-6" />} description="Registered" />
          <StatsCard title="Total Events" value={events.length} icon={<Search className="w-6 h-6" />} description="Available on campus" />
          <StatsCard title="Profile" value={profile?.registration_number || "—"} icon={<UserCircle className="w-6 h-6" />} description={profile?.email || ""} />
        </div>

        {/* Registered upcoming events */}
        {myUpcoming.length > 0 && (
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Your Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {myUpcoming.map((event: any) => (
                <div key={event._id} className="bg-card rounded-2xl border border-border p-5 shadow-card">
                  <div className="flex items-center gap-2 mb-2">
                    {event.category && (
                      <Badge variant="secondary" className="text-xs">{event.category}</Badge>
                    )}
                  </div>
                  <Link to={`/events/${event._id}`}>
                    <h3 className="font-display font-bold text-lg text-foreground hover:text-primary transition-colors line-clamp-1">{event.title}</h3>
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{event.description}</p>
                  <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {event.event_date && <p>📅 {new Date(event.event_date).toDateString()}</p>}
                    {event.time && <p>🕐 {event.time}</p>}
                    {event.location && <p>📍 {event.location}</p>}
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    {(event.registeredStudents?.length || 0)}/{event.capacity || "∞"} registered
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="rounded-xl"
                      onClick={async () => {
                        try {
                          setActionLoading(event._id);
                          const API = import.meta.env.VITE_API_URL;
                          await fetch(`${API}/api/events/unregister/${event._id}`, {
                            method: "POST",
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                          });

                          toast({ title: "Unregistered", description: "You have been removed from the event" });

                          setRefresh((prev) => prev + 1);
                        } catch (err) {
                          toast({ title: "Error", description: "Failed to unregister" });
                        } finally {
                          setActionLoading(null);
                        }
                      }}
                      disabled={actionLoading === event._id}
                    >
                      Unregister
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {recommended.length > 0 && (
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recommended.map((event: any) => (
                <div key={event._id} className="bg-card rounded-2xl border border-border p-5 shadow-card hover:-translate-y-1 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    {event.category && (
                      <Badge variant="secondary" className="text-xs">{event.category}</Badge>
                    )}
                  </div>
                  <Link to={`/events/${event._id}`}>
                    <h3 className="font-display font-bold text-lg text-foreground hover:text-primary transition-colors line-clamp-1">{event.title}</h3>
                  </Link>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{event.description}</p>
                  <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {event.event_date && <p>📅 {new Date(event.event_date).toDateString()}</p>}
                    {event.location && <p>📍 {event.location}</p>}
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="hero"
                      size="sm"
                      className="rounded-xl"
                      onClick={async () => {
                        try {
                          setActionLoading(event._id);
                          const API = import.meta.env.VITE_API_URL;
                          await fetch(`${API}/api/events/register/${event._id}`, {
                            method: "POST",
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                          });

                          toast({ title: "Registered!", description: "You have joined the event" });

                          setRefresh((prev) => prev + 1);
                        } catch (err) {
                          toast({ title: "Error", description: "Failed to register" });
                        } finally {
                          setActionLoading(null);
                        }
                      }}
                      disabled={actionLoading === event._id}
                    >
                      Register Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {events.length === 0 && (
          <div className="text-center py-16">
            <CalendarCheck className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground">No events yet</h3>
            <p className="text-muted-foreground text-sm mt-1">Events will appear here once they're created.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
