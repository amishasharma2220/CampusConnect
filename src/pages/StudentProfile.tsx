import { useState, useEffect } from "react";
import { LayoutDashboard, Search, CalendarCheck, Award, UserCircle, Lock, Save } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "../context/UserContext";
const sidebarLinks = [
  { label: "Dashboard", href: "/student/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Browse Events", href: "/events", icon: <Search className="w-5 h-5" /> },
  { label: "My Events", href: "/student/my-events", icon: <CalendarCheck className="w-5 h-5" /> },
  { label: "Certificates", href: "/student/certificates", icon: <Award className="w-5 h-5" /> },
  { label: "Profile", href: "/student/profile", icon: <UserCircle className="w-5 h-5" /> },
];
const StudentProfile = () => {
  const { toast } = useToast();
  const { userName, setUserName } = useUser();
  const [form, setForm] = useState({
    name: "",
    email: "",
    registrationNumber: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/student/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        setForm({
          name: data.name || "",
          email: data.email || "",
          registrationNumber: data.registration_number || "",
        });

        setUserName(data.name || "Student");
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/student/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: form.name,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // update global context
      setUserName(form.name);

      toast({
        title: "Profile Updated",
        description: "Your changes have been saved",
      });

    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast({ title: "Password too short", description: "Min 6 characters.", variant: "destructive" });
      return;
    }
    toast({ title: "Password Changed", description: "Your password has been updated." });
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <DashboardLayout sidebarLinks={sidebarLinks} roleLabel="Student" userName={userName}>
      <div className="space-y-8 max-w-2xl">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings</p>
        </div>

        {/* Avatar & Info */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-hero-gradient flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-xl">
                {(userName || "S").split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">{userName}</h2>
              <p className="text-sm text-muted-foreground capitalize">Student</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={form.email} disabled className="h-11 rounded-xl opacity-60" />
            </div>
            <div className="space-y-2">
              <Label>Registration Number</Label>
              <Input value={form.registrationNumber} disabled className="h-11 rounded-xl opacity-60" />
            </div>
            <Button variant="hero" className="rounded-xl" onClick={handleSaveProfile}>
              <Save className="w-4 h-4 mr-1" /> Save Changes
            </Button>
          </div>
        </div>

        {/* Change password */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" /> Change Password
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} className="h-11 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} className="h-11 rounded-xl" />
            </div>
            <Button variant="outline" className="rounded-xl" onClick={handleChangePassword}>
              Update Password
            </Button>
          </div>
        </div>

        {/* Logout */}
        <Button variant="destructive" className="rounded-xl" asChild>
          <a href="/" onClick={() => localStorage.removeItem("token")}>Logout</a>
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
