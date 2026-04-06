import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertTriangle, FileText, Clock, Users, Shield } from "lucide-react";

const guidelines = [
  {
    icon: <FileText className="w-5 h-5 text-primary" />,
    title: "Event Proposal Submission",
    items: [
      "Submit event proposal at least 15 days before the planned date.",
      "Include event title, description, date, time, venue, expected attendance.",
      "Attach a budget estimate if sponsorship or funding is required.",
      "Mention the organizing club and faculty advisor details.",
    ],
  },
  {
    icon: <Shield className="w-5 h-5 text-primary" />,
    title: "Approval Process",
    items: [
      "All events must be approved by the Faculty Advisor and Dean of Student Affairs.",
      "Events with external speakers require additional approval from the Registrar.",
      "Approval status is tracked in real-time on CampusConnect.",
      "Rejected events will receive feedback for resubmission.",
    ],
  },
  {
    icon: <Users className="w-5 h-5 text-primary" />,
    title: "Registration & Attendance",
    items: [
      "All student registrations must go through CampusConnect.",
      "Walk-in registrations are not permitted for capacity-limited events.",
      "Attendance must be marked digitally using QR code or CampusConnect check-in.",
      "Certificates are auto-generated only for verified attendees.",
    ],
  },
  {
    icon: <Clock className="w-5 h-5 text-primary" />,
    title: "Event Day Rules",
    items: [
      "Events must start and end at the declared timings.",
      "The organizing club is responsible for venue setup and cleanup.",
      "Emergency contacts must be shared with campus security.",
      "Any violations will result in the club being flagged for the semester.",
    ],
  },
  {
    icon: <AlertTriangle className="w-5 h-5 text-accent" />,
    title: "Prohibited Activities",
    items: [
      "No events promoting discrimination, violence, or illegal activities.",
      "No unauthorized collection of money from students.",
      "No use of campus resources without prior written permission.",
      "No events during examination periods without special exemption.",
    ],
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-primary" />,
    title: "Post-Event Requirements",
    items: [
      "Submit an event report within 7 days of completion.",
      "Upload event photos and attendance records to CampusConnect.",
      "Financial reports must be submitted if any funds were used.",
      "Feedback forms must be shared with all attendees.",
    ],
  },
];

const EventGuidelines = () => (
  <div className="min-h-screen bg-background">
    <div className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-secondary-foreground/60 hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="font-display text-3xl lg:text-4xl font-bold">Event Guidelines</h1>
        <p className="text-secondary-foreground/60 mt-2">Rules and procedures for organizing events at Manipal University Jaipur</p>
      </div>
    </div>
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {guidelines.map((section, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              {section.icon}
              <h2 className="font-display text-lg font-bold text-foreground">{section.title}</h2>
            </div>
            <ul className="space-y-2">
              {section.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default EventGuidelines;
