import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ClubRegistration = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({ title: "Application Submitted!", description: "Your club registration will be reviewed by Student Affairs within 7 working days." });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary-foreground/60 hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="font-display text-3xl lg:text-4xl font-bold">Club Registration</h1>
          <p className="text-secondary-foreground/60 mt-2">Register a new student club at Manipal University Jaipur</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border bg-card p-6">
          <div className="space-y-2">
            <Label htmlFor="clubName">Club Name *</Label>
            <Input id="clubName" placeholder="e.g. Blockchain Club MUJ" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select required>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Cultural">Cultural</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Literary">Literary</SelectItem>
                  <SelectItem value="Social">Social Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Parent Department *</Label>
              <Select required>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Select department" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="focit">Faculty of Computing & IT</SelectItem>
                  <SelectItem value="foe">Faculty of Engineering</SelectItem>
                  <SelectItem value="fomc">Faculty of Management & Commerce</SelectItem>
                  <SelectItem value="foah">Faculty of Arts & Humanities</SelectItem>
                  <SelectItem value="fos">Faculty of Science</SelectItem>
                  <SelectItem value="sa">Student Affairs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Club Description & Objectives *</Label>
            <Textarea id="description" placeholder="Describe the club's mission, activities, and goals..." rows={4} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="presidentName">President / Lead Name *</Label>
              <Input id="presidentName" placeholder="Full name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="presidentReg">Registration Number *</Label>
              <Input id="presidentReg" placeholder="e.g. 220301120045" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="presidentEmail">Email *</Label>
              <Input id="presidentEmail" type="email" placeholder="name@muj.manipal.edu" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="presidentPhone">Phone *</Label>
              <Input id="presidentPhone" type="tel" placeholder="+91 XXXXX XXXXX" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="facultyName">Faculty Advisor Name *</Label>
              <Input id="facultyName" placeholder="Dr. / Prof. Full Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facultyDept">Faculty Department *</Label>
              <Input id="facultyDept" placeholder="e.g. CSE, ECE, FoMC" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="memberCount">Expected Initial Members</Label>
            <Input id="memberCount" type="number" placeholder="e.g. 30" min={10} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activities">Planned Activities (first semester)</Label>
            <Textarea id="activities" placeholder="List your planned events, workshops, or activities..." rows={3} />
          </div>

          <Button type="submit" className="w-full bg-hero-gradient text-primary-foreground rounded-xl h-11" disabled={loading}>
            {loading ? "Submitting..." : "Submit Registration"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Applications are reviewed by the Dean of Student Affairs. You will be notified via email within 7 working days.
          </p>
        </form>
      </div>
    </div>
  );
};

export default ClubRegistration;


