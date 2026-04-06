import { useState } from "react";
import { Trophy, Medal, Star, Flame, TrendingUp, Gift, Crown, ChevronUp, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LeaderboardEntry {
  rank: number;
  name: string;
  regNo: string;
  department: string;
  year: string;
  points: number;
  eventsAttended: number;
  streak: number;
  badges: string[];
  trend: "up" | "down" | "same";
  avatar?: string;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "Aarav Mehta", regNo: "220301120045", department: "CSE", year: "3rd", points: 1250, eventsAttended: 18, streak: 5, badges: ["🏆 Champion", "🔥 Streak Master", "⭐ All-Rounder"], trend: "same" },
  { rank: 2, name: "Priya Patel", regNo: "220302110032", department: "IT", year: "3rd", points: 1100, eventsAttended: 15, streak: 3, badges: ["🎭 Culture King", "⭐ All-Rounder"], trend: "up" },
  { rank: 3, name: "Rohan Gupta", regNo: "220301130078", department: "CSE", year: "2nd", points: 980, eventsAttended: 14, streak: 4, badges: ["💻 Tech Wizard", "🔥 Streak Master"], trend: "up" },
  { rank: 4, name: "Sneha Joshi", regNo: "220301120089", department: "CSE", year: "3rd", points: 920, eventsAttended: 12, streak: 2, badges: ["💻 Tech Wizard"], trend: "down" },
  { rank: 5, name: "Karthik Nair", regNo: "220301120067", department: "IT", year: "3rd", points: 850, eventsAttended: 11, streak: 3, badges: ["🏅 Sports Star"], trend: "same" },
  { rank: 6, name: "Ananya Verma", regNo: "220302120015", department: "CSE", year: "3rd", points: 780, eventsAttended: 10, streak: 1, badges: ["🎭 Culture King"], trend: "up" },
  { rank: 7, name: "Vikram Singh", regNo: "220301120098", department: "CSE", year: "2nd", points: 720, eventsAttended: 9, streak: 2, badges: ["💻 Tech Wizard"], trend: "down" },
  { rank: 8, name: "Meera Patel", regNo: "220401120023", department: "MBA", year: "2nd", points: 680, eventsAttended: 8, streak: 1, badges: [], trend: "up" },
  { rank: 9, name: "Aditya Kumar", regNo: "220301120112", department: "CSE", year: "2nd", points: 620, eventsAttended: 8, streak: 0, badges: [], trend: "same" },
  { rank: 10, name: "Riya Gupta", regNo: "220303120045", department: "ECE", year: "3rd", points: 580, eventsAttended: 7, streak: 2, badges: ["🏅 Sports Star"], trend: "up" },
];

const perks = [
  { tier: "Gold", minPoints: 1000, color: "from-amber-400 to-yellow-500", perks: ["Priority Event Registration", "Campus Merch Kit", "Certificate of Excellence", "Meet & Greet with Speakers"] },
  { tier: "Silver", minPoints: 700, color: "from-gray-300 to-gray-400", perks: ["Early Event Access", "Campus Stickers Pack", "Special Mention on Socials"] },
  { tier: "Bronze", minPoints: 400, color: "from-amber-600 to-amber-700", perks: ["Event Reminders", "Digital Badge", "Leaderboard Visibility"] },
];

const pointRules = [
  { action: "Attend an event", points: 50 },
  { action: "Win 1st place", points: 200 },
  { action: "Win 2nd place", points: 150 },
  { action: "Win 3rd place", points: 100 },
  { action: "Attend 3 events in a row (streak)", points: 75 },
  { action: "Attend events in all categories", points: 100 },
  { action: "Register within first 24 hours", points: 25 },
];

const Leaderboard = () => {
  const [timeFilter, setTimeFilter] = useState<"all" | "month" | "week">("all");

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-amber-400 to-yellow-500 text-foreground";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-400 text-foreground";
    if (rank === 3) return "bg-gradient-to-r from-amber-600 to-amber-700 text-primary-foreground";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-hero-gradient text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Link to="/" className="text-sm text-primary-foreground/70 hover:text-primary-foreground mb-2 inline-flex items-center gap-1">
            ← Back to Home
          </Link>
          <h1 className="font-display text-3xl lg:text-4xl font-bold mt-2 flex items-center gap-3">
            <Trophy className="w-9 h-9" /> Campus Leaderboard
          </h1>
          <p className="text-primary-foreground/80 mt-2 max-w-2xl">
            Earn points for attending events and climb the leaderboard. Top participants get exclusive campus perks!
          </p>
          <div className="flex gap-2 mt-4">
            {(["all", "month", "week"] as const).map((t) => (
              <Button
                key={t}
                variant={timeFilter === t ? "secondary" : "ghost"}
                size="sm"
                className={`rounded-full capitalize ${timeFilter !== t ? "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10" : ""}`}
                onClick={() => setTimeFilter(t)}
              >
                {t === "all" ? "All Time" : t === "month" ? "This Month" : "This Week"}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[leaderboardData[1], leaderboardData[0], leaderboardData[2]].map((entry, i) => {
                const podiumOrder = [2, 1, 3];
                const heights = ["h-28", "h-36", "h-24"];
                const icons = [<Medal key="s" className="w-6 h-6" />, <Crown key="g" className="w-8 h-8" />, <Medal key="b" className="w-5 h-5" />];
                return (
                  <motion.div
                    key={entry.rank}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex flex-col items-center"
                  >
                    <div className={`w-14 h-14 rounded-full ${getRankStyle(podiumOrder[i])} flex items-center justify-center font-bold text-lg mb-2`}>
                      {entry.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <p className="font-display font-bold text-foreground text-sm text-center truncate w-full">{entry.name}</p>
                    <p className="text-xs text-muted-foreground">{entry.department}</p>
                    <p className="font-display font-bold text-primary text-lg mt-1">{entry.points}</p>
                    <p className="text-[10px] text-muted-foreground">points</p>
                    <div className={`${heights[i]} w-full bg-gradient-to-t ${i === 1 ? "from-primary/20 to-primary/5" : "from-muted to-muted/30"} rounded-t-xl mt-2 flex items-end justify-center pb-2`}>
                      <span className="text-2xl font-display font-bold text-muted-foreground/40">#{podiumOrder[i]}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Full Rankings */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-display font-bold text-foreground">Full Rankings</h3>
              </div>
              <div className="divide-y divide-border">
                {leaderboardData.map((entry, i) => (
                  <motion.div
                    key={entry.regNo}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full ${getRankStyle(entry.rank)} flex items-center justify-center font-bold text-sm shrink-0`}>
                      {entry.rank}
                    </div>
                    <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center font-bold text-xs text-foreground shrink-0">
                      {entry.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{entry.name}</p>
                      <p className="text-xs text-muted-foreground">{entry.department} · {entry.year} Year</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {entry.trend === "up" && <ChevronUp className="w-3 h-3 text-emerald-500" />}
                      {entry.trend === "down" && <ChevronDown className="w-3 h-3 text-destructive" />}
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className={`w-3 h-3 ${entry.streak > 0 ? "text-primary" : "text-muted-foreground/30"}`} />
                      <span className="text-xs text-muted-foreground">{entry.streak}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-display font-bold text-primary text-sm">{entry.points}</p>
                      <p className="text-[10px] text-muted-foreground">{entry.eventsAttended} events</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* How Points Work */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" /> How Points Work
              </h3>
              <div className="space-y-2">
                {pointRules.map((rule) => (
                  <div key={rule.action} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{rule.action}</span>
                    <Badge variant="outline" className="text-xs font-mono">+{rule.points}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Perks Tiers */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
                <Gift className="w-5 h-5 text-primary" /> Campus Perks
              </h3>
              <div className="space-y-4">
                {perks.map((tier) => (
                  <div key={tier.tier} className="rounded-xl border border-border p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${tier.color}`} />
                      <span className="font-display font-bold text-foreground text-sm">{tier.tier}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{tier.minPoints}+ pts</span>
                    </div>
                    <ul className="space-y-1">
                      {tier.perks.map((p) => (
                        <li key={p} className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-primary shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Stats (for logged-in student) */}
            <div className="bg-hero-gradient rounded-2xl p-5 text-primary-foreground">
              <h3 className="font-display font-bold mb-2">Your Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-2xl font-display font-bold">1,250</p>
                  <p className="text-xs text-primary-foreground/70">Total Points</p>
                </div>
                <div>
                  <p className="text-2xl font-display font-bold">#1</p>
                  <p className="text-xs text-primary-foreground/70">Campus Rank</p>
                </div>
                <div>
                  <p className="text-2xl font-display font-bold flex items-center gap-1">5 <Flame className="w-4 h-4" /></p>
                  <p className="text-xs text-primary-foreground/70">Event Streak</p>
                </div>
                <div>
                  <p className="text-2xl font-display font-bold">18</p>
                  <p className="text-xs text-primary-foreground/70">Events Attended</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="w-full mt-4 rounded-xl" asChild>
                <Link to="/student/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
