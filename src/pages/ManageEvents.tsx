import { useState } from "react";
import { LayoutDashboard, PlusCircle, Settings, Edit, Trash2, Users, Eye, CheckCircle2, XCircle, Clock } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockEvents, mockClubProfile, categoryColors, approvalStatusColors } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const sidebarLinks = [
  { label: "Dashboard", href: "/club/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Create Event", href: "/club/create-event", icon: <PlusCircle className="w-5 h-5" /> },
  { label: "Manage Events", href: "/club/manage-events", icon: <Settings className="w-5 h-5" /> },
];

const ManageEvents = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState(mockEvents);

  const clubEvents = events.filter(
    (e) => e.organizerClub === "ACM MUJ" || e.organizerClub === "E-Cell MUJ"
  );

  const handleCancel = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast({ title: "Event Cancelled", description: "The event has been removed." });
  };

  const getApprovalIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle2 className="w-4 h-4" />;
      case "rejected": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout sidebarLinks={sidebarLinks} roleLabel="Club Admin" userName={mockClubProfile.name}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Manage Events</h1>
            <p className="text-muted-foreground mt-1">Edit, cancel, or view registrations for your events</p>
          </div>
          <Button variant="hero" className="rounded-xl" asChild>
            <Link to="/club/create-event">
              <PlusCircle className="w-4 h-4 mr-2" /> New Event
            </Link>
          </Button>
        </div>

        {clubEvents.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <Settings className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground">No events to manage</h3>
            <p className="text-muted-foreground text-sm mt-1">Create your first event to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {clubEvents.map((event) => (
              <div
                key={event.id}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-warm transition-shadow"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Thumbnail */}
                  <div className="lg:w-56 h-36 lg:h-auto flex-shrink-0">
                    <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge className={`${categoryColors[event.category]} border text-xs`}>{event.category}</Badge>
                        <Badge className={`${approvalStatusColors[event.approvalStatus]} border text-xs capitalize flex items-center gap-1`}>
                          {getApprovalIcon(event.approvalStatus)}
                          {event.approvalStatus}
                        </Badge>
                        {event.status === "completed" && (
                          <Badge className="bg-muted text-muted-foreground border border-border text-xs">Completed</Badge>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-lg text-foreground">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} · {event.time} · {event.venue}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                        <Users className="w-4 h-4" />
                        <span>{event.registrations} / {event.maxCapacity} registered</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 flex-shrink-0">
                      <Button variant="outline" size="sm" className="rounded-xl" asChild>
                        <Link to={`/events/${event.id}`}>
                          <Eye className="w-4 h-4 mr-1" /> View
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                        onClick={() => toast({ title: "Edit Mode", description: "Edit functionality coming soon!" })}
                      >
                        <Edit className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      {event.status === "upcoming" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl text-destructive hover:text-destructive"
                          onClick={() => handleCancel(event.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageEvents;



