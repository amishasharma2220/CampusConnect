import { LayoutDashboard, PlusCircle, Settings, Users, Eye, Trophy, BarChart3, Calendar } from "lucide-react";
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

const ClubCompletedEvents = () => {
  const clubEvents = mockEvents.filter((e) => e.organizerClub === "ACM MUJ" || e.organizerClub === "E-Cell MUJ");
  const completedEvents = clubEvents.filter((e) => e.status === "completed");
  const totalParticipants = completedEvents.reduce((sum, e) => sum + e.registrations, 0);

  return (
    <DashboardLayout sidebarLinks={sidebarLinks} roleLabel="Club Admin" userName={mockClubProfile.name}>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
            <Trophy className="w-7 h-7 text-primary" /> Completed Events & Results
          </h1>
          <p className="text-muted-foreground mt-1">Event history with winners and certificates</p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="font-display text-2xl font-bold text-foreground">{completedEvents.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Completed Events</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="font-display text-2xl font-bold text-foreground">{totalParticipants}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Participants</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="font-display text-2xl font-bold text-foreground">
              {completedEvents.filter((e) => e.certificateUploaded).length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Certificates Issued</p>
          </div>
        </div>

        {/* Events list */}
        {completedEvents.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <Calendar className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground text-lg">No completed events yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {completedEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <img src={event.banner} alt={event.title} className="w-full sm:w-28 h-20 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} · {event.venue}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Badge variant="outline" className="text-xs">
                          {event.registrations} participants
                        </Badge>
                        {event.certificateUploaded ? (
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 border text-xs">
                            Certificates Issued
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-700 border-amber-200 border text-xs">
                            Certificates Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{event.description}</p>
                  </div>
                </div>

                {/* Winners */}
                {event.winners && event.winners.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Winners</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {event.winners.map((w, i) => (
                        <div key={i} className="flex items-center gap-3 bg-muted/50 rounded-xl p-3">
                          <Trophy className={`w-5 h-5 shrink-0 ${
                            w.position === "1st" ? "text-amber-500" :
                            w.position === "2nd" ? "text-gray-400" :
                            w.position === "3rd" ? "text-amber-700" : "text-primary"
                          }`} />
                          <div>
                            <p className="text-sm font-semibold text-foreground">{w.position} — {w.name}</p>
                            <p className="text-xs text-muted-foreground">{w.regNo}</p>
                            {w.teamName && <p className="text-xs text-muted-foreground">{w.teamName}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClubCompletedEvents;
