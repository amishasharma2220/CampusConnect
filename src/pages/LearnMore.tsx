import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users, Award, Shield, Search, Megaphone, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Explore Events",
    description: "Browse upcoming hackathons, cultural fests, sports tournaments, and academic workshops. Filter by category, date, or club and register in one click.",
    link: "/explore-events",
    cta: "Browse Events",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Join Student Clubs",
    description: "Discover 50+ student clubs across all faculties — Technical, Cultural, Sports, Literary, and more. Apply to join directly from the platform.",
    link: "/clubs",
    cta: "View Clubs",
  },
  {
    icon: <Megaphone className="w-6 h-6" />,
    title: "Host Your Own Events",
    description: "Club admins can propose events for university approval. Set capacity, venue, date and manage registrations — all from one dashboard.",
    link: "/host-event",
    cta: "Host an Event",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Earn Digital Certificates",
    description: "Automatically receive verifiable digital certificates for every event you attend. Build your co-curricular portfolio effortlessly.",
    link: "/student/certificates",
    cta: "View Certificates",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Academic Calendar",
    description: "Stay on top of key academic dates, exam schedules, club recruitment drives, and university holidays — all in one interactive calendar.",
    link: "/calendar",
    cta: "View Calendar",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Event Guidelines",
    description: "Understand the rules for organizing events at MUJ — advance notice requirements, faculty sponsorship, venue booking, and approval workflows.",
    link: "/event-guidelines",
    cta: "Read Guidelines",
  },
];

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 py-12">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary-foreground/60 hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-display text-3xl lg:text-5xl font-bold mb-4">
              Everything <span className="text-gradient">CampusConnect</span> Offers
            </h1>
            <p className="text-secondary-foreground/60 text-lg max-w-2xl">
              From discovering events to earning certificates — here's everything you can do on MUJ's all-in-one campus platform.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 space-y-8">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-6 space-y-4 hover:shadow-warm hover:border-primary/20 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {f.icon}
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              <Link to={f.link}>
                <Button variant="outline" size="sm" className="rounded-xl mt-2">
                  {f.cta} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-xl bg-secondary text-secondary-foreground p-10 text-center space-y-4">
          <h2 className="font-display text-2xl lg:text-3xl font-bold">Ready to get started?</h2>
          <p className="text-secondary-foreground/60 max-w-lg mx-auto">
            Create your free account and start exploring everything MUJ campus has to offer.
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <Link to="/join">
              <Button className="bg-hero-gradient text-primary-foreground rounded-xl h-11 px-6">
                Join CampusConnect <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/explore-events">
              <Button variant="outline" className="rounded-xl h-11 px-6 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10">
                Explore Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;

