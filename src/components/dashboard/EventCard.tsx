import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Event, categoryColors, approvalStatusColors } from "@/data/mockData";

interface EventCardProps {
  event: Event;
  showApproval?: boolean;
  showActions?: boolean;
  onRegister?: (id: string) => void;
  onUnregister?: (id: string) => void;
}

const EventCard = ({ event, showApproval = false, showActions = true, onRegister, onUnregister }: EventCardProps) => {
  const fillPercentage = Math.round((event.registrations / event.maxCapacity) * 100);

  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-warm transition-all duration-300 hover:-translate-y-1">
      {/* Banner */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={event.banner}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={`${categoryColors[event.category]} border text-xs font-medium`}>
            {event.category}
          </Badge>
          {showApproval && (
            <Badge className={`${approvalStatusColors[event.approvalStatus]} border text-xs font-medium capitalize`}>
              {event.approvalStatus}
            </Badge>
          )}
        </div>
        {event.status === "completed" && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
            <span className="text-background font-display font-bold text-lg">Completed</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <Link to={`/events/${event.id}`}>
          <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {event.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{event.description}</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary/70" />
            <span>{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary/70" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary/70" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>

        {/* Capacity bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {event.registrations}/{event.maxCapacity}
            </span>
            <span>{fillPercentage}% filled</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div
              className="bg-hero-gradient h-1.5 rounded-full transition-all"
              style={{ width: `${Math.min(fillPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        {showActions && event.status === "upcoming" && (
          <div className="mt-4 flex gap-2">
            {event.isRegistered ? (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 rounded-xl"
                onClick={() => onUnregister?.(event.id)}
              >
                Unregister
              </Button>
            ) : (
              <Button
                variant="hero"
                size="sm"
                className="flex-1 rounded-xl"
                onClick={() => onRegister?.(event.id)}
              >
                Register Now
              </Button>
            )}
            <Button variant="ghost" size="sm" className="rounded-xl" asChild>
              <Link to={`/events/${event.id}`}>Details</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;

