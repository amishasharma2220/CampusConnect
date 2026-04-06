import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Calendar, ClipboardList, Shield, BarChart3, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { clubs, faculties } from "@/data/clubsData";

// Mock admin data
type RegStatus = "pending" | "approved" | "rejected";

const pendingRegistrations: { id: string; studentName: string; regNo: string; club: string; appliedOn: string; status: RegStatus }[] = [
  { id: "pr1", studentName: "Aarav Sharma", regNo: "220301120045", club: "acm", appliedOn: "2026-02-10", status: "pending" },
  { id: "pr2", studentName: "Priya Patel", regNo: "220302110032", club: "e-cell", appliedOn: "2026-02-12", status: "pending" },
  { id: "pr3", studentName: "Rohan Gupta", regNo: "220301130078", club: "gdsc", appliedOn: "2026-02-13", status: "pending" },
  { id: "pr4", studentName: "Neha Singh", regNo: "220305120019", club: "drama-club", appliedOn: "2026-02-14", status: "pending" },
  { id: "pr5", studentName: "Aditya Jain", regNo: "220301120091", club: "ieee-muj", appliedOn: "2026-02-15", status: "pending" },
];

const pendingClubs = [
  { id: "pc1", name: "AI Ethics Society", applicant: "Dr. Rekha Mehra", faculty: "FoSTA", date: "2026-02-08" },
  { id: "pc2", name: "Film Making Club", applicant: "Karan Verma", faculty: "DSW", date: "2026-02-11" },
];

const stats = [
  { label: "Total Clubs", value: clubs.length, icon: <Users className="w-5 h-5" />, color: "text-primary" },
  { label: "Faculties", value: faculties.length, icon: <BarChart3 className="w-5 h-5" />, color: "text-accent" },
  { label: "Pending Registrations", value: pendingRegistrations.length, icon: <Clock className="w-5 h-5" />, color: "text-amber-500" },
  { label: "Pending Club Approvals", value: pendingClubs.length, icon: <ClipboardList className="w-5 h-5" />, color: "text-violet-500" },
];



const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState(
    pendingRegistrations.map((r) => ({ ...r }))
  );
  const [search, setSearch] = useState("");

  const updateStatus = (id: string, status: RegStatus) => {
    setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const filteredRegs = registrations.filter(
    (r) =>
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.regNo.includes(search) ||
      clubs.find((c) => c.id === r.club)?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary-foreground/60 hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="font-display text-3xl lg:text-4xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" /> Admin Dashboard
          </h1>
          <p className="text-secondary-foreground/60 mt-2">Manage clubs, student registrations, and approvals</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${s.color}`}>{s.icon}</div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Student Club Registrations */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Student Club Registrations
            </h2>
            <Input placeholder="Search by name, reg no, or club..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs rounded-xl" />
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
                  {filteredRegs.map((reg) => {
                    const club = clubs.find((c) => c.id === reg.club);
                    return (
                      <tr key={reg.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium text-foreground">{reg.studentName}</td>
                        <td className="p-3 text-muted-foreground font-mono text-xs">{reg.regNo}</td>
                        <td className="p-3 text-foreground">{club?.name || reg.club}</td>
                        <td className="p-3 text-muted-foreground">{reg.appliedOn}</td>
                        <td className="p-3">
                          <Badge
                            variant="outline"
                            className={
                              reg.status === "approved"
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                : reg.status === "rejected"
                                ? "bg-destructive/10 text-destructive border-destructive/20"
                                : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                            }
                          >
                            {reg.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          {reg.status === "pending" ? (
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="rounded-lg h-7 text-xs text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/10" onClick={() => updateStatus(reg.id, "approved")}>
                                <CheckCircle className="w-3 h-3 mr-1" /> Approve
                              </Button>
                              <Button size="sm" variant="outline" className="rounded-lg h-7 text-xs text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => updateStatus(reg.id, "rejected")}>
                                <XCircle className="w-3 h-3 mr-1" /> Reject
                              </Button>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pending Club Approvals */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" /> Pending Club Proposals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingClubs.map((pc) => (
              <div key={pc.id} className="rounded-xl border border-border bg-card p-5 space-y-3">
                <div>
                  <h3 className="font-display font-bold text-foreground">{pc.name}</h3>
                  <p className="text-sm text-muted-foreground">Proposed by {pc.applicant} · {pc.faculty}</p>
                  <p className="text-xs text-muted-foreground mt-1">Submitted: {pc.date}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-hero-gradient text-primary-foreground rounded-lg text-xs">Approve</Button>
                  <Button size="sm" variant="outline" className="rounded-lg text-xs">Request Info</Button>
                  <Button size="sm" variant="outline" className="rounded-lg text-xs text-destructive border-destructive/30">Reject</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/clubs" className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-card transition-all text-center">
            <Users className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="font-display font-bold text-foreground text-sm">View All Clubs</p>
          </Link>
          <Link to="/calendar" className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-card transition-all text-center">
            <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="font-display font-bold text-foreground text-sm">Academic Calendar</p>
          </Link>
          <Link to="/event-guidelines" className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 hover:shadow-card transition-all text-center">
            <ClipboardList className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="font-display font-bold text-foreground text-sm">Event Guidelines</p>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
