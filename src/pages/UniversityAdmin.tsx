import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Shield, Users, Calendar, ClipboardList, BarChart3,
  CheckCircle, XCircle, Clock, Building2, GraduationCap, Search,
  AlertCircle, ChevronDown, ChevronUp, Activity, TrendingUp, Eye, Trophy, Upload, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { clubs, faculties } from "@/data/clubsData";
import { mockEvents } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

type Tab = "overview" | "events" | "clubs" | "students";

const pendingEvents = mockEvents.filter((e) => e.approvalStatus === "pending");

const studentRegistrations = [
  { id: "sr1", studentName: "Aarav Sharma", regNo: "220301120045", club: "acm", appliedOn: "2026-02-10", status: "pending" as const },
  { id: "sr2", studentName: "Priya Patel", regNo: "220302110032", club: "e-cell", appliedOn: "2026-02-12", status: "pending" as const },
  { id: "sr3", studentName: "Rohan Gupta", regNo: "220301130078", club: "gdsc", appliedOn: "2026-02-13", status: "approved" as const },
  { id: "sr4", studentName: "Neha Singh", regNo: "220305120019", club: "drama-club", appliedOn: "2026-02-14", status: "pending" as const },
  { id: "sr5", studentName: "Aditya Jain", regNo: "220301120091", club: "ieee-muj", appliedOn: "2026-02-15", status: "rejected" as const },
  { id: "sr6", studentName: "Kavya Reddy", regNo: "220301120110", club: "iot-lab", appliedOn: "2026-02-18", status: "pending" as const },
  { id: "sr7", studentName: "Vikram Desai", regNo: "220301120055", club: "cce-innovators", appliedOn: "2026-02-19", status: "pending" as const },
];

const clubProposals = [
  { id: "cp1", name: "AI Ethics Society", applicant: "Dr. Rekha Mehra", faculty: "FoSTA", department: "CSE", date: "2026-02-08", status: "pending" as const },
  { id: "cp2", name: "Film Making Club", applicant: "Karan Verma", faculty: "DSW", department: "Cultural", date: "2026-02-11", status: "pending" as const },
  { id: "cp3", name: "Quantum Computing Club", applicant: "Dr. Amit Roy", faculty: "FoSTA", department: "CSE", date: "2026-02-16", status: "pending" as const },
];

const activityFeed = [
  { action: "approved", target: "TechNova Hackathon", actor: "Dean FoSTA", time: "2 hours ago", type: "event" },
  { action: "registered", target: "ACM Student Chapter", actor: "Aarav Sharma", time: "3 hours ago", type: "student" },
  { action: "rejected", target: "Overnight Rave Party", actor: "Admin", time: "5 hours ago", type: "event" },
  { action: "proposed", target: "AI Ethics Society", actor: "Dr. Rekha Mehra", time: "1 day ago", type: "club" },
  { action: "approved", target: "GDSC MUJ", actor: "Dean FoSTA", time: "1 day ago", type: "student" },
  { action: "registered", target: "Drama Club", actor: "Neha Singh", time: "2 days ago", type: "student" },
];

const categoryData = [
  { name: "Tech", count: 12, color: "bg-primary" },
  { name: "Cultural", count: 8, color: "bg-accent" },
  { name: "Sports", count: 6, color: "bg-emerald-500" },
  { name: "Academic", count: 5, color: "bg-violet-500" },
];

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame: number;
    const duration = 1200;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return <span ref={ref}>{count}</span>;
}

const UniversityAdmin = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [search, setSearch] = useState("");
  const [eventSearch, setEventSearch] = useState("");
  const [eventCategoryFilter, setEventCategoryFilter] = useState("all");
  const [regStatuses, setRegStatuses] = useState(studentRegistrations.map((r) => ({ ...r })));
  const [eventStatuses, setEventStatuses] = useState(pendingEvents.map((e) => ({ ...e })));
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const { toast } = useToast();

  const totalDepts = faculties.reduce((sum, f) => sum + f.departments.length, 0);
  const maxCategoryCount = Math.max(...categoryData.map((c) => c.count));

  const stats = [
    { label: "Active Clubs", value: clubs.length, icon: <Users className="w-5 h-5" />, color: "text-primary", bg: "bg-primary/10" },
    { label: "Faculties", value: faculties.length, icon: <Building2 className="w-5 h-5" />, color: "text-accent", bg: "bg-accent/10" },
    { label: "Departments", value: totalDepts, icon: <GraduationCap className="w-5 h-5" />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Pending Events", value: pendingEvents.length, icon: <Clock className="w-5 h-5" />, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Applications", value: regStatuses.filter((r) => r.status === "pending").length, icon: <ClipboardList className="w-5 h-5" />, color: "text-violet-500", bg: "bg-violet-500/10" },
    { label: "Proposals", value: clubProposals.length, icon: <AlertCircle className="w-5 h-5" />, color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "overview", label: "Overview" },
    { key: "events", label: "Event Approvals", count: eventStatuses.filter((e) => e.approvalStatus === "pending").length },
    { key: "students", label: "Student Registrations", count: regStatuses.filter((r) => r.status === "pending").length },
    { key: "clubs", label: "Club Proposals", count: clubProposals.length },
  ];

  const handleApproveEvent = (id: string) => {
    setEventStatuses((prev) => prev.map((e) => e.id === id ? { ...e, approvalStatus: "approved" as const } : e));
    toast({ title: "Event Approved ✅", description: "The event has been approved successfully." });
  };

  const handleRejectEvent = (id: string) => {
    setEventStatuses((prev) => prev.map((e) => e.id === id ? { ...e, approvalStatus: "rejected" as const } : e));
    toast({ title: "Event Rejected", description: "The event has been rejected." });
  };

  const handleApproveStudent = (id: string) => {
    setRegStatuses((prev) => prev.map((r) => r.id === id ? { ...r, status: "approved" as const } : r));
    toast({ title: "Registration Approved ✅", description: "Student registration has been approved." });
  };

  const handleRejectStudent = (id: string) => {
    setRegStatuses((prev) => prev.map((r) => r.id === id ? { ...r, status: "rejected" as const } : r));
    toast({ title: "Registration Rejected", description: "Student registration has been rejected." });
  };

  const handleBulkApproveStudents = () => {
    setRegStatuses((prev) => prev.map((r) => r.status === "pending" ? { ...r, status: "approved" as const } : r));
    toast({ title: "All Approved ✅", description: "All pending registrations have been approved." });
  };

  const handleBulkApproveEvents = () => {
    setEventStatuses((prev) => prev.map((e) => e.approvalStatus === "pending" ? { ...e, approvalStatus: "approved" as const } : e));
    toast({ title: "All Events Approved ✅", description: "All pending events have been approved." });
  };

  const filteredEvents = eventStatuses.filter((e) => {
    const matchesSearch = e.title.toLowerCase().includes(eventSearch.toLowerCase()) || e.organizerClub.toLowerCase().includes(eventSearch.toLowerCase());
    const matchesCategory = eventCategoryFilter === "all" || e.category?.toLowerCase() === eventCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary-foreground/60 hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-xl bg-hero-gradient flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold">University Administration</h1>
              <p className="text-secondary-foreground/60 mt-1">Manage events, clubs, students, and campus activities</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 flex-wrap">
            {tabs.map((tab) => (
              <Button key={tab.key} variant={activeTab === tab.key ? "default" : "outline"} size="sm"
                className={`rounded-xl gap-2 ${activeTab !== tab.key ? "border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10" : ""}`}
                onClick={() => setActiveTab(tab.key)}>
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-xs font-bold">{tab.count}</span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Animated Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="rounded-xl border border-border bg-card p-4 flex items-center gap-3 cursor-default"
            >
              <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center ${s.color}`}>{s.icon}</div>
              <div>
                <p className="text-2xl font-bold text-foreground"><AnimatedCounter target={s.value} /></p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { to: "/clubs", icon: <Users className="w-8 h-8 text-primary" />, title: "Browse All Clubs", desc: `${clubs.length} active clubs across ${faculties.length} faculties` },
                { to: "/explore-events", icon: <Calendar className="w-8 h-8 text-primary" />, title: "All Events", desc: "View and manage all campus events" },
                { to: "/calendar", icon: <BarChart3 className="w-8 h-8 text-primary" />, title: "Academic Calendar", desc: "Semester dates, exams, and holidays" },
              ].map((item, i) => (
                <motion.div key={item.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.1 }} whileHover={{ y: -4 }}>
                  <Link to={item.to} className="block rounded-xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-warm transition-all">
                    {item.icon}
                    <h3 className="font-display font-bold text-foreground mt-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Events by Category Chart */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" /> Events by Category
                </h3>
                <div className="space-y-4">
                  {categoryData.map((cat) => (
                    <div key={cat.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground font-medium">{cat.name}</span>
                        <span className="text-muted-foreground">{cat.count} events</span>
                      </div>
                      <div className="h-3 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${cat.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(cat.count / maxCategoryCount) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Faculty Distribution (donut-like) */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" /> Faculty Distribution
                </h3>
                <div className="space-y-3">
                  {faculties.map((fac, i) => {
                    const clubCount = fac.departments.reduce((s, d) => s + d.clubs.length, 0);
                    const colors = ["bg-primary", "bg-accent", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500"];
                    return (
                      <motion.div
                        key={fac.shortName}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className={`w-3 h-3 rounded-full ${colors[i % colors.length]}`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground text-sm truncate">{fac.shortName}</p>
                          <p className="text-xs text-muted-foreground">{fac.departments.length} depts</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground text-sm">{clubCount}</p>
                          <p className="text-xs text-muted-foreground">clubs</p>
                        </div>
                        <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${colors[i % colors.length]}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((clubCount / 10) * 100, 100)}%` }}
                            transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Activity Feed */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" /> Recent Activity
              </h3>
              <div className="space-y-1">
                {activityFeed.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full shrink-0 ${
                      item.action === "approved" ? "bg-emerald-500" :
                      item.action === "rejected" ? "bg-destructive" :
                      item.action === "proposed" ? "bg-amber-500" : "bg-primary"
                    }`} />
                    <p className="text-sm text-foreground flex-1">
                      <span className="font-medium">{item.actor}</span>
                      <span className="text-muted-foreground"> {item.action} </span>
                      <span className="font-medium">{item.target}</span>
                    </p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Completed Events with Results */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" /> Completed Events & Results
              </h3>
              <div className="space-y-4">
                {mockEvents.filter((e) => e.status === "completed").map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="border border-border rounded-xl p-4 hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <img src={event.banner} alt={event.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-foreground text-sm truncate">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{event.organizerClub} · {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {event.registrations} participants</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {event.certificateUploaded ? (
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">
                            <FileText className="w-3 h-3 mr-1" /> Certs Uploaded
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]">
                            <Upload className="w-3 h-3 mr-1" /> Pending Certs
                          </Badge>
                        )}
                      </div>
                    </div>
                    {event.winners && event.winners.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {event.winners.map((w, j) => (
                          <div key={j} className="flex items-center gap-2 bg-muted/50 rounded-lg p-2">
                            <Trophy className={`w-4 h-4 shrink-0 ${w.position === "1st" ? "text-amber-500" : w.position === "2nd" ? "text-gray-400" : w.position === "3rd" ? "text-amber-700" : "text-primary"}`} />
                            <div>
                              <p className="text-xs font-semibold text-foreground">{w.position} — {w.name}</p>
                              <p className="text-[10px] text-muted-foreground">{w.regNo}{w.teamName ? ` · ${w.teamName}` : ""}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground italic">Results not yet declared</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Pending Event Approvals
              </h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search events..." value={eventSearch} onChange={(e) => setEventSearch(e.target.value)} className="pl-9 rounded-xl max-w-xs" />
                </div>
                <select
                  value={eventCategoryFilter}
                  onChange={(e) => setEventCategoryFilter(e.target.value)}
                  className="h-10 px-3 rounded-xl border border-border bg-card text-sm text-foreground"
                >
                  <option value="all">All Categories</option>
                  <option value="tech">Tech</option>
                  <option value="cultural">Cultural</option>
                  <option value="sports">Sports</option>
                  <option value="academic">Academic</option>
                </select>
                {eventStatuses.some((e) => e.approvalStatus === "pending") && (
                  <Button size="sm" className="bg-hero-gradient text-primary-foreground rounded-xl" onClick={handleBulkApproveEvents}>
                    <CheckCircle className="w-4 h-4 mr-1" /> Approve All
                  </Button>
                )}
              </div>
            </div>

            {filteredEvents.length === 0 ? (
              <p className="text-muted-foreground py-8 text-center">No matching events.</p>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl border border-border bg-card overflow-hidden"
                  >
                    <div
                      className="flex items-center gap-4 p-5 cursor-pointer hover:bg-muted/20 transition-colors"
                      onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                    >
                      <img src={event.banner} alt={event.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-bold text-foreground truncate">{event.title}</h3>
                        <p className="text-xs text-muted-foreground">{event.date} · {event.organizerClub}</p>
                      </div>
                      <Badge variant="outline" className={event.approvalStatus === "approved" ? "bg-emerald-500/10 text-emerald-600" : event.approvalStatus === "rejected" ? "bg-destructive/10 text-destructive" : "bg-amber-500/10 text-amber-600"}>
                        {event.approvalStatus}
                      </Badge>
                      {expandedEvent === event.id ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                    </div>

                    <AnimatePresence>
                      {expandedEvent === event.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-2 border-t border-border/50 space-y-3">
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-muted-foreground">
                              <div><span className="font-semibold text-foreground">Date:</span> {event.date}</div>
                              <div><span className="font-semibold text-foreground">Time:</span> {event.time}</div>
                              <div><span className="font-semibold text-foreground">Venue:</span> {event.venue}</div>
                              <div><span className="font-semibold text-foreground">Club:</span> {event.organizerClub}</div>
                            </div>
                            {event.approvalStatus === "pending" && (
                              <div className="flex gap-2 pt-2">
                                <Button size="sm" className="bg-hero-gradient text-primary-foreground rounded-lg text-xs" onClick={() => handleApproveEvent(event.id)}>
                                  <CheckCircle className="w-3 h-3 mr-1" /> Approve
                                </Button>
                                <Button size="sm" variant="outline" className="rounded-lg text-xs text-destructive border-destructive/30" onClick={() => handleRejectEvent(event.id)}>
                                  <XCircle className="w-3 h-3 mr-1" /> Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" /> Student Club Registrations
              </h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search by name, reg no, or club..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 max-w-xs rounded-xl" />
                </div>
                {regStatuses.some((r) => r.status === "pending") && (
                  <Button size="sm" className="bg-hero-gradient text-primary-foreground rounded-xl" onClick={handleBulkApproveStudents}>
                    <CheckCircle className="w-4 h-4 mr-1" /> Approve All
                  </Button>
                )}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-3 font-semibold text-foreground">Student</th>
                      <th className="text-left p-3 font-semibold text-foreground">Reg No</th>
                      <th className="text-left p-3 font-semibold text-foreground">Club</th>
                      <th className="text-left p-3 font-semibold text-foreground">Applied</th>
                      <th className="text-left p-3 font-semibold text-foreground">Status</th>
                      <th className="text-left p-3 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regStatuses
                      .filter((r) => r.studentName.toLowerCase().includes(search.toLowerCase()) || r.regNo.includes(search) || clubs.find((c) => c.id === r.club)?.name.toLowerCase().includes(search.toLowerCase()))
                      .map((reg, i) => {
                        const club = clubs.find((c) => c.id === reg.club);
                        return (
                          <motion.tr
                            key={reg.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                          >
                            <td className="p-3 font-medium text-foreground">{reg.studentName}</td>
                            <td className="p-3 text-muted-foreground font-mono text-xs">{reg.regNo}</td>
                            <td className="p-3 text-foreground">{club?.name || reg.club}</td>
                            <td className="p-3 text-muted-foreground">{reg.appliedOn}</td>
                            <td className="p-3">
                              <Badge variant="outline" className={reg.status === "approved" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : reg.status === "rejected" ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"}>
                                {reg.status}
                              </Badge>
                            </td>
                            <td className="p-3">
                              {reg.status === "pending" ? (
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" className="rounded-lg h-7 text-xs text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/10" onClick={() => handleApproveStudent(reg.id)}>
                                    <CheckCircle className="w-3 h-3 mr-1" /> Approve
                                  </Button>
                                  <Button size="sm" variant="outline" className="rounded-lg h-7 text-xs text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleRejectStudent(reg.id)}>
                                    <XCircle className="w-3 h-3 mr-1" /> Reject
                                  </Button>
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">—</span>
                              )}
                            </td>
                          </motion.tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Clubs Tab */}
        {activeTab === "clubs" && (
          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" /> Pending Club Proposals
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clubProposals.map((cp, i) => (
                <motion.div
                  key={cp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-border bg-card p-5 space-y-3"
                >
                  <div>
                    <h3 className="font-display font-bold text-foreground">{cp.name}</h3>
                    <p className="text-sm text-muted-foreground">Proposed by {cp.applicant}</p>
                    <p className="text-xs text-muted-foreground mt-1">{cp.faculty} · {cp.department} · Submitted: {cp.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-hero-gradient text-primary-foreground rounded-lg text-xs">Approve</Button>
                    <Button size="sm" variant="outline" className="rounded-lg text-xs">Request Info</Button>
                    <Button size="sm" variant="outline" className="rounded-lg text-xs text-destructive border-destructive/30">Reject</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default UniversityAdmin;

