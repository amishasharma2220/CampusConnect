import { useState } from "react";
import { LayoutDashboard, PlusCircle, Settings, Users, Crown, Shield, GraduationCap, Eye, Trophy, BarChart3, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockClubProfile, mockClubTeam } from "@/data/mockData";

const sidebarLinks = [
  { label: "Dashboard", href: "/club/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Team Structure", href: "/club/team", icon: <Users className="w-5 h-5" /> },
  { label: "Completed Events", href: "/club/completed", icon: <Trophy className="w-5 h-5" /> },
  { label: "Create Event", href: "/club/create-event", icon: <PlusCircle className="w-5 h-5" /> },
  { label: "Manage Events", href: "/club/manage-events", icon: <Settings className="w-5 h-5" /> },
  { label: "Analytics", href: "/club/analytics", icon: <BarChart3 className="w-5 h-5" /> },
  { label: "Venue Finder", href: "/venues", icon: <Eye className="w-5 h-5" /> },
];

const roleColors: Record<string, string> = {
  "President": "bg-amber-100 text-amber-800 border-amber-300",
  "Vice President": "bg-violet-100 text-violet-800 border-violet-300",
  "General Secretary": "bg-blue-100 text-blue-800 border-blue-300",
  "Technical Head": "bg-emerald-100 text-emerald-800 border-emerald-300",
  "Creative Head": "bg-pink-100 text-pink-800 border-pink-300",
  "Marketing Head": "bg-orange-100 text-orange-800 border-orange-300",
  "Content Head": "bg-cyan-100 text-cyan-800 border-cyan-300",
  "Event Coordinator": "bg-rose-100 text-rose-800 border-rose-300",
  "Core Member": "bg-indigo-100 text-indigo-800 border-indigo-300",
  "Executive Member": "bg-gray-100 text-gray-700 border-gray-300",
};

const getRoleIcon = (role: string) => {
  if (role === "President") return <Crown className="w-4 h-4" />;
  if (role === "Vice President") return <Shield className="w-4 h-4" />;
  if (role === "General Secretary") return <GraduationCap className="w-4 h-4" />;
  return null;
};

const ClubTeam = () => {
  const leadership = mockClubTeam.filter((m) => ["President", "Vice President", "General Secretary"].includes(m.role));
  const heads = mockClubTeam.filter((m) => m.role.includes("Head") || m.role === "Event Coordinator");
  const coreMembers = mockClubTeam.filter((m) => m.role === "Core Member" || m.role === "Executive Member");

  return (
    <DashboardLayout sidebarLinks={sidebarLinks} roleLabel="Club Admin" userName={mockClubProfile.name}>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
            <Users className="w-7 h-7 text-primary" /> Team Structure
          </h1>
          <p className="text-muted-foreground mt-1">Full hierarchy of ACM MUJ Student Chapter</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="font-display text-2xl font-bold text-foreground">{mockClubTeam.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Members</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="font-display text-2xl font-bold text-foreground">{leadership.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Leadership</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="font-display text-2xl font-bold text-foreground">{heads.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Department Heads</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="font-display text-2xl font-bold text-foreground">{coreMembers.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Core & Executive</p>
          </div>
        </div>

        {/* Leadership */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Leadership</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leadership.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -2 }}
                className="bg-card border border-border rounded-xl p-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-hero-gradient flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground truncate">{member.name}</p>
                  <Badge className={`${roleColors[member.role] || "bg-muted text-muted-foreground"} border text-[10px] mt-1`}>
                    {getRoleIcon(member.role)} {member.role}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{member.department} · {member.year}</p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Department Heads */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Department Heads</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {heads.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                whileHover={{ y: -2 }}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground font-bold text-xs shrink-0">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{member.name}</p>
                  <Badge className={`${roleColors[member.role] || "bg-muted text-muted-foreground"} border text-[10px]`}>
                    {member.role}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{member.department} · {member.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core & Executive Members */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Core & Executive Members</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {coreMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{ y: -2 }}
                className="bg-card border border-border rounded-xl p-4 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground font-bold text-xs mx-auto mb-2">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <p className="font-medium text-foreground text-sm truncate">{member.name}</p>
                <Badge className={`${roleColors[member.role] || "bg-muted text-muted-foreground"} border text-[10px] mt-1`}>
                  {member.role}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">{member.department} · {member.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClubTeam;
