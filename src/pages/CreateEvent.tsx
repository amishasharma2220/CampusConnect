import { useState } from "react";
import { LayoutDashboard, PlusCircle, Settings, Calendar, Clock, MapPin, AlignLeft, Tag, Send } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { mockClubProfile, eventCategories } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const sidebarLinks = [
  { label: "Dashboard", href: "/club/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Create Event", href: "/club/create-event", icon: <PlusCircle className="w-5 h-5" /> },
  { label: "Manage Events", href: "/club/manage-events", icon: <Settings className="w-5 h-5" /> },
];

const CreateEvent = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "",
    maxCapacity: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Event Submitted!",
        description: "Your event has been submitted for admin approval. You'll be notified once it's reviewed.",
      });
      setForm({ title: "", description: "", date: "", time: "", venue: "", category: "", maxCapacity: "" });
    }, 1200);
  };

  return (
    <DashboardLayout sidebarLinks={sidebarLinks} roleLabel="Club Admin" userName={mockClubProfile.name}>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Create Event</h1>
          <p className="text-muted-foreground mt-1">Submit a new event for admin approval</p>
        </div>

        {/* Info banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-start gap-3">
          <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Admin Approval Required</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              All events must be approved by a university administrator before they go live and become visible to students.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-primary" /> Event Title
            </Label>
            <Input id="title" name="title" placeholder="e.g. HackMUJ 4.0" value={form.title} onChange={handleChange} required className="h-11 rounded-xl" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Describe your event..." value={form.description} onChange={handleChange} required className="min-h-[120px] rounded-xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Date
              </Label>
              <Input id="date" name="date" type="date" value={form.date} onChange={handleChange} required className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> Time
              </Label>
              <Input id="time" name="time" type="time" value={form.time} onChange={handleChange} required className="h-11 rounded-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="venue" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Venue
            </Label>
            <Input id="venue" name="venue" placeholder="e.g. AB-5 Auditorium" value={form.venue} onChange={handleChange} required className="h-11 rounded-xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" /> Category
              </Label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select category</option>
                {eventCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxCapacity">Max Capacity</Label>
              <Input id="maxCapacity" name="maxCapacity" type="number" placeholder="e.g. 200" value={form.maxCapacity} onChange={handleChange} required className="h-11 rounded-xl" />
            </div>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full rounded-xl" disabled={isLoading}>
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit for Approval
              </>
            )}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateEvent;


