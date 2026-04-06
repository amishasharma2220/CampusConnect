import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MapPin, Users, User, Building2, CheckCircle2, AlertCircle, Trophy, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockEvents, categoryColors, approvalStatusColors } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const EventDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const event = mockEvents.find((e) => e.id === id);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Event Not Found</h1>
          <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist.</p>
          <Button variant="hero" asChild>
            <Link to="/events">Browse Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  const fillPercentage = Math.round((event.registrations / event.maxCapacity) * 100);

  const handleCertificateUpload = () => {
    if (certificateFile) {
      toast({ title: "Certificate Uploaded ✅", description: `Certificate "${certificateFile.name}" uploaded for ${event.title}` });
      setCertificateFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute top-4 left-4">
          <Button variant="outline" size="sm" className="rounded-xl bg-background/80 backdrop-blur-sm" asChild>
            <Link to="/events">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-10 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          {/* Header card */}
          <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 shadow-card">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={`${categoryColors[event.category]} border text-xs font-medium`}>{event.category}</Badge>
              <Badge className={`${approvalStatusColors[event.approvalStatus]} border text-xs font-medium capitalize`}>
                {event.approvalStatus === "approved" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                {event.approvalStatus === "pending" && <AlertCircle className="w-3 h-3 mr-1" />}
                {event.approvalStatus}
              </Badge>
              {event.status === "completed" && (
                <Badge className="bg-muted text-muted-foreground border border-border text-xs">Completed</Badge>
              )}
            </div>

            <h1 className="font-display text-2xl lg:text-4xl font-bold text-foreground mb-4">{event.title}</h1>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-8">{event.description}</p>

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(event.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-sm font-medium text-foreground">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Venue</p>
                  <p className="text-sm font-medium text-foreground">{event.venue}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                <Building2 className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Organized by</p>
                  <p className="text-sm font-medium text-foreground">{event.organizerClub}</p>
                </div>
              </div>
            </div>

            {/* Capacity */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {event.registrations} / {event.maxCapacity} registered
                </span>
                <span>{fillPercentage}% filled</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-hero-gradient h-2.5 rounded-full transition-all" style={{ width: `${Math.min(fillPercentage, 100)}%` }} />
              </div>
            </div>

            {/* Organizer */}
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl mb-8">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{event.organizer}</p>
                <p className="text-xs text-muted-foreground">Event Organizer · {event.organizerClub}</p>
              </div>
            </div>

            {/* Winners Section for completed events */}
            {event.status === "completed" && event.winners && event.winners.length > 0 && (
              <div className="mb-8">
                <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" /> Event Results
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.winners.map((w, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 bg-muted/50 rounded-xl p-4"
                    >
                      <Trophy className={`w-6 h-6 shrink-0 ${w.position === "1st" ? "text-amber-500" : w.position === "2nd" ? "text-gray-400" : w.position === "3rd" ? "text-amber-700" : "text-primary"}`} />
                      <div>
                        <p className="font-semibold text-foreground text-sm">{w.position} Place — {w.name}</p>
                        <p className="text-xs text-muted-foreground">Reg: {w.regNo}</p>
                        {w.teamName && <p className="text-xs text-muted-foreground">Team: {w.teamName}</p>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificate Upload Section for completed events */}
            {event.status === "completed" && (
              <div className="mb-8 bg-muted/30 border border-border rounded-xl p-5">
                <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" /> Participation Certificate
                </h3>
                {event.certificateUploaded ? (
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-foreground">Certificate is available for download</span>
                    <Button variant="outline" size="sm" className="rounded-xl ml-auto">
                      Download Certificate
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Upload your participation certificate for this event.</p>
                    <div className="flex items-center gap-3">
                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3 border-2 border-dashed border-border rounded-xl p-4 hover:border-primary/50 transition-colors">
                          <Upload className="w-5 h-5 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {certificateFile ? certificateFile.name : "Click to select certificate (PDF, JPG, PNG)"}
                          </span>
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          onChange={(e) => setCertificateFile(e.target.files?.[0] || null)}
                        />
                      </label>
                      {certificateFile && (
                        <Button variant="hero" size="sm" className="rounded-xl" onClick={handleCertificateUpload}>
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            {event.status === "upcoming" && event.approvalStatus === "approved" && (
              <div className="flex gap-3">
                {event.isRegistered ? (
                  <Button
                    variant="outline"
                    size="xl"
                    className="flex-1 rounded-xl"
                    onClick={() => toast({ title: "Unregistered", description: `You've been removed from ${event.title}` })}
                  >
                    Unregister from Event
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    size="xl"
                    className="flex-1 rounded-xl"
                    onClick={() => toast({ title: "Registered!", description: `You've signed up for ${event.title}` })}
                  >
                    Register for Event
                  </Button>
                )}
              </div>
            )}

            {event.approvalStatus === "pending" && (
              <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>This event is pending approval from the administration. Registration will open once approved.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetails;


