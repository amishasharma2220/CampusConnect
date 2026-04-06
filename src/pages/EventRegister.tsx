import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const eventsData: Record<string, { title: string; tagline: string; displayDate: string; time: string; venue: string; category: string; attendees: number; maxCapacity: number; club: string; color: string }> = {
  technova: {
    title: "TechNova Hackathon 2026",
    tagline: "48-hour innovation sprint",
    displayDate: "Mar 22, 2026",
    time: "9:00 AM",
    venue: "Innovation Hub, Block A",
    category: "Tech",
    attendees: 320,
    maxCapacity: 400,
    club: "ACM Student Chapter",
    color: "from-primary to-accent",
  },
  rang: {
    title: "Rang – Cultural Night",
    tagline: "A celebration of art & music",
    displayDate: "Apr 5, 2026",
    time: "6:00 PM",
    venue: "Open Air Theatre",
    category: "Cultural",
    attendees: 1200,
    maxCapacity: 1500,
    club: "Cultural Committee",
    color: "from-accent to-primary",
  },
  mun: {
    title: "MUJ Model United Nations",
    tagline: "Debate, diplomacy & leadership",
    displayDate: "Apr 15, 2026",
    time: "10:00 AM",
    venue: "Seminar Hall, Block B",
    category: "Academic",
    attendees: 180,
    maxCapacity: 250,
    club: "MUN Society",
    color: "from-secondary to-foreground",
  },
  oneiros: {
    title: "Sports Carnival – Oneiros",
    tagline: "Compete. Conquer. Celebrate.",
    displayDate: "May 2, 2026",
    time: "8:00 AM",
    venue: "University Stadium",
    category: "Sports",
    attendees: 2500,
    maxCapacity: 3000,
    club: "Sports Council",
    color: "from-primary to-accent",
  },
};

const eventIdMap: Record<string, string> = {
  technova: "69bbd3b2d949e619fb45753e",
  rang: "PUT_REAL_ID",
  mun: "PUT_REAL_ID",
  oneiros: "PUT_REAL_ID"
};

const EventRegister = () => {
  const { id } = useParams<{ id: string }>();
  const event = id ? eventsData[id] : null;
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", year: "", branch: "" });

  // Auto-fill user data if logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.name && user?.email) {
      setForm((prev) => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, []);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold text-foreground mb-4">Event not found</h1>
          <Button variant="hero" asChild><Link to="/">Go Home</Link></Button>
        </div>
      </div>
    );
  }

  const fillPercent = Math.round((event.attendees / event.maxCapacity) * 100);
  const spotsLeft = event.maxCapacity - event.attendees;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.year || !form.branch) {
      toast({ title: "Missing fields", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const mongoId = id ? eventIdMap[id] : null;

      if (!mongoId) {
        toast({
          title: "Error",
          description: "Invalid event ID",
          variant: "destructive"
        });
        return;
      }

      const res = await fetch(`http://localhost:5001/api/events/register/${mongoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSubmitted(true);

      toast({
        title: "Registration successful!",
        description: `You're registered for ${event.title}`
      });

    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Registration failed",
        variant: "destructive"
      });
    }
  };

  const update = (key: string, val: string) => setForm((p) => ({ ...p, [key]: val }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className={`relative bg-gradient-to-r ${event.color} py-16`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-semibold mb-3">
              {event.category}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-2">{event.title}</h1>
            <p className="text-primary-foreground/80 text-lg italic">{event.tagline}</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-foreground">Event Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{event.displayDate}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  <span>{event.attendees.toLocaleString()} registered</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-card border border-border p-6">
              <h3 className="font-display text-lg font-bold text-foreground mb-3">Registration Status</h3>
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Capacity</span>
                <span className="font-semibold text-foreground">{fillPercent}% filled</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden mb-2">
                <motion.div className={`h-full rounded-full bg-gradient-to-r ${event.color}`} initial={{ width: 0 }} animate={{ width: `${fillPercent}%` }} transition={{ duration: 1, ease: "easeOut" }} />
              </div>
              <p className="text-sm text-muted-foreground">{spotsLeft.toLocaleString()} spots remaining</p>
              <p className="text-xs text-muted-foreground mt-2">Organized by <span className="font-medium text-foreground">{event.club}</span></p>
            </div>
          </motion.div>

          {/* Registration Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-2">
            {submitted ? (
              <div className="rounded-2xl bg-card border border-border p-12 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }}>
                  <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
                </motion.div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-3">You're In!</h2>
                <p className="text-muted-foreground text-lg mb-2">Registration confirmed for <span className="font-semibold text-foreground">{event.title}</span></p>
                <p className="text-sm text-muted-foreground mb-8">A confirmation email will be sent to {form.email}</p>
                <div className="flex gap-4 justify-center">
                  <Button variant="hero" asChild><Link to="/">Back to Home</Link></Button>
                  <Button variant="heroOutline" asChild><Link to="/explore-events">Explore More Events</Link></Button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-card border border-border p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Register for this Event</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter your full name" value={form.name} onChange={(e) => update("name", e.target.value)} className="rounded-xl h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} className="rounded-xl h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="rounded-xl h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year of Study</Label>
                      <Input id="year" placeholder="e.g. 2nd Year" value={form.year} onChange={(e) => update("year", e.target.value)} className="rounded-xl h-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch / Department</Label>
                    <Input id="branch" placeholder="e.g. Computer Science" value={form.branch} onChange={(e) => update("branch", e.target.value)} className="rounded-xl h-11" />
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full rounded-xl mt-2">
                    Confirm Registration
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">By registering, you agree to the event guidelines and code of conduct.</p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EventRegister;
