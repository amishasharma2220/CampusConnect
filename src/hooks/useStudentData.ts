import { useEffect, useState } from "react";

export interface StudentProfile {
  full_name: string;
  email: string;
  registration_number: string | null;
  avatar_url: string | null;
}

export interface StudentEvent {
  id: string;
  title: string;
  tagline: string | null;
  display_date: string | null;
  event_date: string | null;
  time: string | null;
  venue: string | null;
  category: string | null;
  club: string | null;
  color: string | null;
  slug: string;
  max_capacity: number | null;
  created_by: string | null;
  isRegistered: boolean;
  registrationCount: number;
}

const useStudentData = (refresh: number = 0) => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [events, setEvents] = useState<StudentEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        // fetch all events
        const eventsRes = await fetch("http://localhost:5001/api/events", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // fetch my events
        const myEventsRes = await fetch("http://localhost:5001/api/events/my-events", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const eventsData = await eventsRes.json();
        const myEventsData = await myEventsRes.json();

        const myEventIds = new Set(myEventsData.map((e: any) => e._id));

        const mappedEvents: StudentEvent[] = eventsData.map((e: any) => ({
          id: e._id,
          title: e.title,
          tagline: e.description,
          display_date: null,
          event_date: e.date,
          time: null,
          venue: e.location,
          category: e.category,
          club: null,
          color: null,
          slug: e._id,
          max_capacity: e.capacity,
          created_by: e.organizer,
          isRegistered: myEventIds.has(e._id),
          registrationCount: e.registeredStudents?.length || 0,
        }));

        setEvents(mappedEvents);

        setProfile({
          full_name: user?.name || "Student",
          email: user?.email || "",
          registration_number: null,
          avatar_url: null,
        });

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refresh]);

  const registeredEvents = events.filter((e) => e.isRegistered);
  const upcomingEvents = events.filter((e) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    return new Date(e.event_date || "") >= today;
  });

  return {
    profile,
    events,
    registeredEvents,
    upcomingEvents,
    loading,
    userName: profile?.full_name || "Student",
  };
}

export default useStudentData;
