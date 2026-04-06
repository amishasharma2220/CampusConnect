import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar as CalIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { academicCalendarEvents, type CalendarEvent } from "@/data/clubsData";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";

const typeColors: Record<CalendarEvent["type"], string> = {
  academic: "bg-primary/10 text-primary border-primary/20",
  event: "bg-accent/10 text-accent border-accent/20",
  holiday: "bg-muted text-muted-foreground border-border",
  exam: "bg-destructive/10 text-destructive border-destructive/20",
};

const typeDots: Record<CalendarEvent["type"], string> = {
  academic: "bg-primary",
  event: "bg-accent",
  holiday: "bg-muted-foreground",
  exam: "bg-destructive",
};

const AcademicCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filterType, setFilterType] = useState<string>("All");

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);

  const days: Date[] = [];
  let day = calStart;
  while (day <= calEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  const getEventsForDate = (date: Date) =>
    academicCalendarEvents.filter((e) => {
      const start = new Date(e.date);
      const end = e.endDate ? new Date(e.endDate) : start;
      return date >= new Date(start.toDateString()) && date <= new Date(end.toDateString());
    });

  const filteredEvents = useMemo(() => {
    const monthEvents = academicCalendarEvents.filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear();
    });
    if (filterType === "All") return monthEvents;
    return monthEvents.filter((e) => e.type === filterType);
  }, [currentMonth, filterType]);

  const selectedDayEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary-foreground/60 hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="font-display text-3xl lg:text-4xl font-bold flex items-center gap-3">
            <CalIcon className="w-8 h-8 text-primary" /> Academic Calendar 2025–26
          </h1>
          <p className="text-secondary-foreground/60 mt-2">All events, exams, holidays & activities at Manipal University Jaipur</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <Button variant="outline" size="icon" className="rounded-xl" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h2 className="font-display text-xl font-bold text-foreground">{format(currentMonth, "MMMM yyyy")}</h2>
                <Button variant="outline" size="icon" className="rounded-xl" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-7 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((d, i) => {
                  const dayEvents = getEventsForDate(d);
                  const isCurrentMonth = isSameMonth(d, currentMonth);
                  const isSelected = selectedDate && isSameDay(d, selectedDate);
                  const isToday = isSameDay(d, new Date());

                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(d)}
                      className={`relative p-1.5 sm:p-2 rounded-lg text-sm transition-colors min-h-[3rem] sm:min-h-[4rem]
                        ${!isCurrentMonth ? "text-muted-foreground/30" : "text-foreground"}
                        ${isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted/50"}
                        ${isToday && !isSelected ? "ring-1 ring-primary" : ""}
                      `}
                    >
                      <span className="font-medium">{format(d, "d")}</span>
                      {dayEvents.length > 0 && (
                        <div className="flex gap-0.5 justify-center mt-0.5 flex-wrap">
                          {dayEvents.slice(0, 3).map((e) => (
                            <span key={e.id} className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-primary-foreground" : typeDots[e.type]}`} />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-border text-xs">
                {(["academic", "event", "holiday", "exam"] as const).map((t) => (
                  <div key={t} className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${typeDots[t]}`} />
                    <span className="text-muted-foreground capitalize">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {selectedDate && (
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="font-display font-bold text-foreground mb-3">{format(selectedDate, "EEEE, MMMM d, yyyy")}</h3>
                {selectedDayEvents.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No events on this day.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedDayEvents.map((e) => (
                      <div key={e.id} className="p-3 rounded-lg bg-muted/30 border border-border">
                        <p className="font-semibold text-foreground text-sm">{e.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={`text-xs ${typeColors[e.type]}`}>{e.type}</Badge>
                          {e.club && <span className="text-xs text-muted-foreground">{e.club}</span>}
                        </div>
                        {e.endDate && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(e.date), "MMM d")} — {format(new Date(e.endDate), "MMM d")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display font-bold text-foreground">This Month</h3>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="text-xs bg-muted border border-border rounded-lg px-2 py-1 text-foreground">
                  <option value="All">All</option>
                  <option value="academic">Academic</option>
                  <option value="event">Events</option>
                  <option value="holiday">Holidays</option>
                  <option value="exam">Exams</option>
                </select>
              </div>
              {filteredEvents.length === 0 ? (
                <p className="text-muted-foreground text-sm">No events this month.</p>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {filteredEvents.map((e) => (
                    <div key={e.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => setSelectedDate(new Date(e.date))}>
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${typeDots[e.type]}`} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{e.title}</p>
                        <p className="text-xs text-muted-foreground">{format(new Date(e.date), "MMM d")}{e.endDate && ` – ${format(new Date(e.endDate), "MMM d")}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;

