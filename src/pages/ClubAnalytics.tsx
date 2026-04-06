import { LayoutDashboard, PlusCircle, Settings, Users, Eye, Trophy, BarChart3, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { mockEvents, mockClubProfile } from "@/data/mockData";

const sidebarLinks = [
  { label: "Dashboard", href: "/club/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Team Structure", href: "/club/team", icon: <Users className="w-5 h-5" /> },
  { label: "Completed Events", href: "/club/completed", icon: <Trophy className="w-5 h-5" /> },
  { label: "Create Event", href: "/club/create-event", icon: <PlusCircle className="w-5 h-5" /> },
  { label: "Manage Events", href: "/club/manage-events", icon: <Settings className="w-5 h-5" /> },
  { label: "Analytics", href: "/club/analytics", icon: <BarChart3 className="w-5 h-5" /> },
  { label: "Venue Finder", href: "/venues", icon: <Eye className="w-5 h-5" /> },
];

const ClubAnalytics = () => {
  const clubEvents = mockEvents.filter((e) => e.organizerClub === "ACM MUJ" || e.organizerClub === "E-Cell MUJ");

  return (
    <DashboardLayout sidebarLinks={sidebarLinks} roleLabel="Club Admin" userName={mockClubProfile.name}>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-primary" /> Event Analytics & Attendance
          </h1>
          <p className="text-muted-foreground mt-1">Track performance, registrations, and attendance across all events</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Distribution */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h4 className="font-display font-semibold text-foreground text-sm mb-3">Events by Category</h4>
            <div className="space-y-3">
              {(["Tech", "Cultural", "Sports", "Academic"] as const).map((cat) => {
                const count = clubEvents.filter((e) => e.category === cat).length;
                const pct = clubEvents.length > 0 ? Math.round((count / clubEvents.length) * 100) : 0;
                const barColors: Record<string, string> = { Tech: "bg-blue-500", Cultural: "bg-violet-500", Sports: "bg-emerald-500", Academic: "bg-amber-500" };
                return (
                  <div key={cat}>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{cat}</span>
                      <span>{count} events ({pct}%)</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className={`${barColors[cat]} h-2 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Registration Overview */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h4 className="font-display font-semibold text-foreground text-sm mb-3">Registration Overview</h4>
            <div className="space-y-4">
              {clubEvents.filter(e => e.status === "upcoming" || e.status === "completed").slice(0, 5).map((event) => {
                const fillPct = Math.round((event.registrations / event.maxCapacity) * 100);
                return (
                  <div key={event.id}>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-foreground font-medium truncate max-w-[60%]">{event.title}</span>
                      <span className="text-muted-foreground">{event.registrations}/{event.maxCapacity}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <motion.div
                        className="bg-hero-gradient h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(fillPct, 100)}%` }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Attendance Tracking Table */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h4 className="font-display font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-primary" /> Attendance Tracking
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 text-muted-foreground font-medium">Event</th>
                  <th className="pb-2 text-muted-foreground font-medium">Date</th>
                  <th className="pb-2 text-muted-foreground font-medium">Category</th>
                  <th className="pb-2 text-muted-foreground font-medium">Registered</th>
                  <th className="pb-2 text-muted-foreground font-medium">Attended</th>
                  <th className="pb-2 text-muted-foreground font-medium">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {clubEvents.map((event) => {
                  const attended = event.status === "completed" ? Math.round(event.registrations * 0.82) : "—";
                  const rate = event.status === "completed" ? "82%" : "—";
                  return (
                    <tr key={event.id} className="hover:bg-muted/50 transition-colors">
                      <td className="py-2.5 text-foreground font-medium truncate max-w-[200px]">{event.title}</td>
                      <td className="py-2.5 text-muted-foreground">{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
                      <td className="py-2.5">
                        <Badge variant="outline" className="text-xs">{event.category}</Badge>
                      </td>
                      <td className="py-2.5 text-muted-foreground">{event.registrations}</td>
                      <td className="py-2.5 text-foreground font-medium">{attended}</td>
                      <td className="py-2.5">
                        {event.status === "completed" ? (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 border text-xs">{rate}</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">Upcoming</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClubAnalytics;
