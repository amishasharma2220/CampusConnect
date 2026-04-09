import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, Sparkles, GraduationCap, Users, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type Role = "student" | "club-admin" | "university-admin";

const roles: { key: Role; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: "student", label: "Student", icon: <GraduationCap className="w-5 h-5" />, desc: "Access events & clubs" },
  { key: "club-admin", label: "Club Admin", icon: <Users className="w-5 h-5" />, desc: "Manage your club" },
  { key: "university-admin", label: "University Admin", icon: <Shield className="w-5 h-5" />, desc: "Oversee campus" },
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<Role>("student");
  const { toast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // 🌿 STORE TOKEN + USER
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // optional: store role
      localStorage.setItem("role", role);

      toast({
        title: "Login successful ✅",
        description: `Welcome back, ${data.user?.name || "User"}!`,
      });

      // 🌸 Redirect based on role
      if (role === "university-admin") {
        navigate("/university-admin");
      } else if (role === "club-admin") {
        navigate("/club/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      toast({
        title: "Login failed ❌",
        description: err?.message || "Invalid credentials or server error",
        variant: "destructive",
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
                Welcome Back to <span className="text-gradient">Campus</span>
              </h1>
              <p className="text-secondary-foreground/60 text-lg leading-relaxed">
                Sign in to access your events, certificates, and campus community.
              </p>
            </motion.div>
          </div>
          <p className="text-sm text-secondary-foreground/40">© 2026 CampusConnect · Made for MUJ</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
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

          <h2 className="font-display text-3xl font-bold text-foreground mb-2">Sign In</h2>
          <p className="text-muted-foreground mb-6">Select your role and enter your credentials</p>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setRole(r.key)}
                className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${
                  role === r.key
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30"
                }`}
              >
                {r.icon}
                <span className="text-xs font-semibold">{r.label}</span>
                <span className="text-[10px] opacity-70 leading-tight">{r.desc}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                {role === "university-admin" ? "Admin Email" : "Email / Registration Number"}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  placeholder={role === "university-admin" ? "admin@muj.manipal.edu" : "you@muj.manipal.edu or 2203XXXXXXXX"}
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="pl-10 h-12 rounded-xl border-border bg-card"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                <a href="#" className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="pl-10 pr-10 h-12 rounded-xl border-border bg-card"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full h-12 rounded-xl text-base" disabled={isLoading}>
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
              ) : (
                `Sign In as ${roles.find((r) => r.key === role)?.label}`
              )}
            </Button>
          </form>

          {role !== "university-admin" && (
            <>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-background px-3 text-muted-foreground">or continue with</span></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" className="h-12 rounded-xl font-medium" type="button">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </Button>
                <Button variant="outline" size="lg" className="h-12 rounded-xl font-medium" type="button">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-8">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                  Create one
                </Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
