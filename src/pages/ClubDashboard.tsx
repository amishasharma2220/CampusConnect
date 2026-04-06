import { useState } from "react";
import { LayoutDashboard, PlusCircle, Settings, Calendar, Users, CheckCircle2, Clock, AlertTriangle, Mail, GraduationCap, Trophy, BarChart3, Eye, UserPlus, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import EventCard from "@/components/dashboard/EventCard";
import { Badge } from "@/components/ui/badge";
import { mockEvents, mockClubProfile, mockClubDetails, mockClubTeam, approvalStatusColors } from "@/data/mockData";

const sidebarLinks = [
  { label: "Dashboard", href: "/club/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Team Structure", href: "/club/team", icon: <Users className="w-5 h-5" /> },
  { label: "Completed Events", href: "/club/completed", icon: <Trophy className="w-5 h-5" /> },
  { label: "Create Event", href: "/club/create-event", icon: <PlusCircle className="w-5 h-5" /> },
  { label: "Manage Events", href: "/club/manage-events", icon: <Settings className="w-5 h-5" /> },
  { label: "Analytics", href: "/club/analytics", icon: <BarChart3 className="w-5 h-5" /> },
  { label: "Venue Finder", href: "/venues", icon: <Eye className="w-5 h-5" /> },
];

const ClubDashboard = () => {
  const clubEvents = mockEvents.filter((e) => e.organizerClub === "ACM MUJ" || e.organizerClub === "E-Cell MUJ");
  const totalRegistrations = clubEvents.reduce((sum, e) => sum + e.registrations, 0);
  const clubMemberRegistrations = mockClubDetails.memberCount;
  const eventRegistrations = totalRegistrations;
  const pendingEvents = clubEvents.filter((e) => e.approvalStatus === "pending");
  const approvedEvents = clubEvents.filter((e) => e.approvalStatus === "approved");
  const upcomingEvents = clubEvents.filter((e) => e.status === "upcoming");

  return (
    <DashboardLayout sidebarLinks={sidebarLinks} roleLabel="Club Admin" userName={mockClubProfile.name}>
      <div className="space-y-8">
        {/* Club Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-6 lg:p-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-hero-gradient flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-display font-bold text-xl lg:text-2xl">ACM</span>
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">{mockClubDetails.name}</h1>
              <p className="text-muted-foreground mt-1">{mockClubDetails.description}</p>
              <div className="flex flex-wrap gap-3 mt-3">
                <Badge variant="outline" className="text-xs">
                  <GraduationCap className="w-3 h-3 mr-1" /> {mockClubDetails.faculty} · {mockClubDetails.department}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Calendar className="w-3 h-3 mr-1" /> Est. {mockClubDetails.foundedYear}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Users className="w-3 h-3 mr-1" /> {mockClubDetails.memberCount} members
                </Badge>
              </div>
            </div>
            <div className="bg-muted/50 rounded-xl p-4 text-sm shrink-0">
              <p className="text-muted-foreground text-xs">Admin</p>
              <p className="font-semibold text-foreground">{mockClubDetails.adminName}</p>
              <p className="text-muted-foreground text-xs flex items-center gap-1 mt-1">
                <Mail className="w-3 h-3" /> {mockClubDetails.adminEmail}
              </p>
              <p className="text-muted-foreground text-xs mt-1">Reg: {mockClubDetails.adminRegNo}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats — all clickable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Events"
            value={clubEvents.length}
            icon={<Calendar className="w-6 h-6" />}
            href="/club/manage-events"
            description="Click to manage →"
          />

          <StatsCard
            title="Total Registrations"
            value={clubMemberRegistrations + eventRegistrations}
            icon={<Users className="w-6 h-6" />}
            href="/club/analytics"
            trend="+48 this week"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <UserPlus className="w-3 h-3" /> Club Members
                </span>
                <span className="font-semibold text-foreground">{clubMemberRegistrations}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Ticket className="w-3 h-3" /> Event Registrations
                </span>
                <span className="font-semibold text-foreground">{eventRegistrations}</span>
              </div>
            </div>
          </StatsCard>

          <StatsCard
            title="Approved Events"
            value={approvedEvents.length}
            icon={<CheckCircle2 className="w-6 h-6" />}
            href="/club/manage-events"
            description="Click to view →"
          />

          <StatsCard
            title="Pending Approval"
            value={pendingEvents.length}
            icon={<Clock className="w-6 h-6" />}
            href="/club/manage-events"
            description="Click to view →"
          />
        </div>

        {/* Pending Approval Alert */}
        {pendingEvents.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display font-semibold text-yellow-800">Events Pending Approval</h3>
              <p className="text-sm text-yellow-700 mt-1">
                {pendingEvents.length} event(s) are waiting for admin approval before they go live.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {pendingEvents.map((e) => (
                  <Badge key={e.id} className={`${approvalStatusColors.pending} border text-xs`}>
                    {e.title}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Approved Events */}
        <div>
          <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" /> Approved Events
          </h2>
          {approvedEvents.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-2xl">
              <Calendar className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">No approved events yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {approvedEvents.map((event) => (
                <EventCard key={event.id} event={event} showApproval showActions={false} />
              ))}
            </div>
          )}
        </div>

        {/* Upcoming events */}
        <div>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Your Upcoming Events</h2>
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-2xl">
              <Calendar className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">No upcoming events. Create one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} showApproval showActions={false} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClubDashboard;


