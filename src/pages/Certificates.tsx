import { LayoutDashboard, Search, CalendarCheck, Award, UserCircle, Download, FileText } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockCertificates, mockStudentProfile, categoryColors } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const sidebarLinks = [
  { label: "Dashboard", href: "/student/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Browse Events", href: "/events", icon: <Search className="w-5 h-5" /> },
  { label: "My Events", href: "/student/my-events", icon: <CalendarCheck className="w-5 h-5" /> },
  { label: "Certificates", href: "/student/certificates", icon: <Award className="w-5 h-5" /> },
  { label: "Profile", href: "/student/profile", icon: <UserCircle className="w-5 h-5" /> },
];

const Certificates = () => {
  const { toast } = useToast();

  const handleDownload = (certName: string) => {
    toast({ title: "Downloading Certificate", description: `Preparing ${certName} PDF...` });
  };

  return (
    <DashboardLayout sidebarLinks={sidebarLinks} roleLabel="Student" userName={mockStudentProfile.name}>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">My Certificates</h1>
          <p className="text-muted-foreground mt-1">Download your participation and achievement certificates</p>
        </div>

        {mockCertificates.length === 0 ? (
          <div className="text-center py-16">
            <Award className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground">No certificates yet</h3>
            <p className="text-muted-foreground text-sm mt-1">Attend events to earn certificates</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockCertificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-card border border-border rounded-2xl p-5 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-card hover:shadow-warm transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-foreground text-lg">{cert.eventName}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <Badge className={`${categoryColors[cert.category]} border text-xs`}>{cert.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        Event: {new Date(cert.eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        · Issued: {new Date(cert.issuedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="hero"
                  size="sm"
                  className="rounded-xl flex-shrink-0"
                  onClick={() => handleDownload(cert.eventName)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download PDF
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Certificates;

