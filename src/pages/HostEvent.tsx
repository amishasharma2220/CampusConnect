import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, AlignLeft, Tag, Send, Users, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { eventCategories } from "@/data/mockData";
import { clubs } from "@/data/clubsData";

const HostEvent = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    club: "",
    date: "",
    time: "",
    venue: "",
    category: "",
    capacity: "",
    organizerName: "",
    organizerEmail: "",
    banner: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Login required",
        description: "Please login first",
        variant: "destructive"
      });
      return;
    }

    const eventDateTime = new Date(`${form.date}T${form.time}`);

    try {
      setLoading(true);

      console.log("Submitting event:", form);

      const res = await fetch("http://localhost:5001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          date: eventDateTime,
          location: form.venue,
          category: form.category,
          capacity: Number(form.capacity),
          organizer: form.club,
          organizerName: form.organizerName,
          organizerEmail: form.organizerEmail,
          banner: form.banner
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setSubmitted(true);

      toast({
        title: "Event Created!",
        description: "Your event has been submitted successfully."
      });

    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to create event",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md text-center space-y-4 p-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Send className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Event Submitted!</h1>
          <p className="text-muted-foreground">
            Your event proposal has been submitted for review. The university admin will approve or request changes within 5–7 working days.
          </p>
          <div className="flex gap-3 justify-center pt-4">
            <Link to="/explore-events"><Button variant="outline" className="rounded-xl">Browse Events</Button></Link>
            <Link to="/"><Button className="bg-hero-gradient text-primary-foreground rounded-xl">Go Home</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary-foreground/60 hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="font-display text-3xl lg:text-4xl font-bold">Host an Event</h1>
          <p className="text-secondary-foreground/60 mt-2">Submit your event proposal for university approval</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Guidelines */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Before you submit</p>
            <ul className="text-muted-foreground space-y-1 list-disc list-inside">
              <li>Events must be proposed at least 15 days in advance</li>
              <li>You need a registered club or faculty sponsor</li>
              <li>All events require admin approval before going live</li>
              <li>Read the <Link to="/event-guidelines" className="text-primary hover:underline">full event guidelines</Link></li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border bg-card p-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-primary" /> Event Title *
            </Label>
            <Input id="title" value={form.title} onChange={handleChange} placeholder="e.g. HackMUJ 4.0 — 36-Hour Hackathon" required className="rounded-xl h-11" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Event Description *</Label>
            <Textarea id="description" value={form.description} onChange={handleChange} placeholder="Describe the event, objectives, target audience, and expected outcomes..." rows={4} required className="rounded-xl" />
          </div>

          <div className="space-y-2">
            <Label>Organizing Club *</Label>
            <Select onValueChange={(value) => setForm({ ...form, club: value })}>
              <SelectTrigger className="rounded-xl h-11"><SelectValue placeholder="Select your club" /></SelectTrigger>
              <SelectContent className="max-h-60">
                {clubs.slice(0, 30).map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Date *
              </Label>
              <Input id="date" value={form.date} onChange={handleChange} type="date" required className="rounded-xl h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> Time *
              </Label>
              <Input id="time" value={form.time} onChange={handleChange} type="time" required className="rounded-xl h-11" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Venue *
            </Label>
            <Input id="venue" value={form.venue} onChange={handleChange} placeholder="e.g. AB-5 Auditorium, MUJ Campus" required className="rounded-xl h-11" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" /> Category *
              </Label>
              <Select onValueChange={(value) => setForm({ ...form, category: value })}>
                <SelectTrigger className="rounded-xl h-11"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {eventCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity" className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" /> Max Capacity *
              </Label>
              <Input id="capacity" value={form.capacity} onChange={handleChange} type="number" placeholder="e.g. 200" min={10} required className="rounded-xl h-11" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organizerName">Organizer Name *</Label>
              <Input id="organizerName" value={form.organizerName} onChange={handleChange} placeholder="Your full name" required className="rounded-xl h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organizerEmail">Organizer Email *</Label>
              <Input id="organizerEmail" value={form.organizerEmail} onChange={handleChange} type="email" placeholder="name@muj.manipal.edu" required className="rounded-xl h-11" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="banner">Event Banner URL (optional)</Label>
            <Input id="banner" value={form.banner} onChange={handleChange} type="url" placeholder="https://example.com/banner.jpg" className="rounded-xl h-11" />
          </div>

          <Button type="submit" className="w-full bg-hero-gradient text-primary-foreground rounded-xl h-11" disabled={loading}>
            {loading ? "Submitting..." : "Submit Event Proposal"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Event proposals are reviewed by the Dean of Student Affairs within 5–7 working days.
          </p>
        </form>
      </div>
    </div>
  );
};

export default HostEvent;
