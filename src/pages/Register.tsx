import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Hash, Sparkles, GraduationCap, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type Role = "student" | "club_admin";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  const { toast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    registrationNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please check and try again.",
        variant: "destructive"
      });
      return;
    }

    if (form.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          password: form.password,
          registrationNumber: form.registrationNumber,
          role: selectedRole
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast({
        title: "Account created!",
        description: "Welcome to CampusConnect!"
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate(selectedRole === "club_admin"
        ? "/club/dashboard"
        : "/student/dashboard"
      );

    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
   {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-secondary">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--secondary-foreground)) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-hero-gradient flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-base">CC</span>
            </div>
            <span className="font-display font-bold text-2xl text-secondary-foreground">
              Campus<span className="text-gradient">Connect</span>
            </span>
          </Link>
          <div className="max-w-md">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/25 mb-8">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground/80">Manipal University Jaipur</span>
              </div>
              <h1 className="font-display text-4xl xl:text-5xl font-bold text-secondary-foreground leading-tight mb-6">
                Join the <span className="text-gradient">Community</span>
              </h1>
              <p className="text-secondary-foreground/60 text-lg leading-relaxed">
                Create your account and start exploring events, earning certificates, and connecting with clubs.
              </p>
            </motion.div>
          </div>
          <p className="text-sm text-secondary-foreground/40">© 2026 CampusConnect · Made for MUJ</p>
        </div>
      </div>

            {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md py-8">
          <div className="lg:hidden mb-10">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">CC</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Campus<span className="text-gradient">Connect</span>
              </span>
            </Link>
          </div>

          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <h2 className="font-display text-3xl font-bold text-foreground mb-2">Create Account</h2>
          <p className="text-muted-foreground mb-8">Fill in your details to join CampusConnect</p>

          {/* Role selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-foreground mb-3 block">I am a</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole("student")}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  selectedRole === "student"
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <GraduationCap className={`w-5 h-5 ${selectedRole === "student" ? "text-primary" : "text-muted-foreground"}`} />
                <div className="text-left">
                  <p className={`text-sm font-semibold ${selectedRole === "student" ? "text-primary" : "text-foreground"}`}>Student</p>
                  <p className="text-xs text-muted-foreground">Browse & join events</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("club_admin")}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                  selectedRole === "club_admin"
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <Shield className={`w-5 h-5 ${selectedRole === "club_admin" ? "text-primary" : "text-muted-foreground"}`} />
                <div className="text-left">
                  <p className={`text-sm font-semibold ${selectedRole === "club_admin" ? "text-primary" : "text-foreground"}`}>Club Admin</p>
                  <p className="text-xs text-muted-foreground">Organize events</p>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="fullName" name="fullName" placeholder="Your full name" value={form.fullName} onChange={handleChange} required className="pl-10 h-12 rounded-xl border-border bg-card" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">University Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" name="email" type="email" placeholder="you@muj.manipal.edu" value={form.email} onChange={handleChange} required className="pl-10 h-12 rounded-xl border-border bg-card" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="registrationNumber" name="registrationNumber" placeholder="e.g. 220301120045" value={form.registrationNumber} onChange={handleChange} required className="pl-10 h-12 rounded-xl border-border bg-card" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Min 6 characters" value={form.password} onChange={handleChange} required className="pl-10 pr-10 h-12 rounded-xl border-border bg-card" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="confirmPassword" name="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="Re-enter password" value={form.confirmPassword} onChange={handleChange} required className="pl-10 pr-10 h-12 rounded-xl border-border bg-card" />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full h-12 rounded-xl text-base mt-2" disabled={isLoading}>
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;