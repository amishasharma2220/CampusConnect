// Mock data for CampusConnect frontend

export type EventCategory = "Tech" | "Cultural" | "Sports" | "Academic";
export type EventStatus = "upcoming" | "completed";
export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: EventCategory;
  organizer: string;
  organizerClub: string;
  banner: string;
  status: EventStatus;
  registrations: number;
  maxCapacity: number;
  approvalStatus: ApprovalStatus;
  isRegistered?: boolean;
  winners?: EventWinner[];
  certificateUploaded?: boolean;
}

export interface EventWinner {
  position: "1st" | "2nd" | "3rd" | "Special Mention";
  name: string;
  regNo: string;
  teamName?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  year: string;
  avatar?: string;
  email: string;
}

export interface ClubProfile {
  id: string;
  name: string;
  shortName: string;
  faculty: string;
  department: string;
  description: string;
  foundedYear: number;
  memberCount: number;
  logo?: string;
  adminName: string;
  adminEmail: string;
  adminRegNo: string;
}

export interface Certificate {
  id: string;
  eventName: string;
  eventDate: string;
  issuedDate: string;
  category: EventCategory;
}

export interface UserProfile {
  name: string;
  email: string;
  registrationNumber: string;
  role: "student" | "club_admin";
  avatar?: string;
  eventsAttended: number;
  certificatesEarned: number;
}

// Club team hierarchy as used in Manipal University Jaipur clubs
export const mockClubTeam: TeamMember[] = [
  { id: "tm1", name: "Rahul Sharma", role: "President", department: "CSE", year: "4th Year", email: "rahul.sharma@muj.manipal.edu" },
  { id: "tm2", name: "Ananya Verma", role: "Vice President", department: "CSE", year: "3rd Year", email: "ananya.verma@muj.manipal.edu" },
  { id: "tm3", name: "Karthik Nair", role: "General Secretary", department: "IT", year: "3rd Year", email: "karthik.nair@muj.manipal.edu" },
  { id: "tm4", name: "Sneha Joshi", role: "Technical Head", department: "CSE", year: "3rd Year", email: "sneha.joshi@muj.manipal.edu" },
  { id: "tm5", name: "Arjun Reddy", role: "Creative Head", department: "CSE", year: "2nd Year", email: "arjun.reddy@muj.manipal.edu" },
  { id: "tm6", name: "Meera Patel", role: "Marketing Head", department: "MBA", year: "2nd Year", email: "meera.patel@muj.manipal.edu" },
  { id: "tm7", name: "Aditya Kumar", role: "Content Head", department: "CSE", year: "2nd Year", email: "aditya.kumar@muj.manipal.edu" },
  { id: "tm8", name: "Riya Gupta", role: "Event Coordinator", department: "ECE", year: "3rd Year", email: "riya.gupta@muj.manipal.edu" },
  { id: "tm9", name: "Vikram Singh", role: "Core Member", department: "CSE", year: "2nd Year", email: "vikram.singh@muj.manipal.edu" },
  { id: "tm10", name: "Priyanka Das", role: "Core Member", department: "IT", year: "2nd Year", email: "priyanka.das@muj.manipal.edu" },
  { id: "tm11", name: "Rohan Mehta", role: "Core Member", department: "CSE", year: "2nd Year", email: "rohan.mehta@muj.manipal.edu" },
  { id: "tm12", name: "Isha Sharma", role: "Executive Member", department: "CSE", year: "1st Year", email: "isha.sharma@muj.manipal.edu" },
];

export const mockClubDetails: ClubProfile = {
  id: "acm-muj",
  name: "ACM MUJ Student Chapter",
  shortName: "ACM MUJ",
  faculty: "FoSTA",
  department: "Computer Science & Engineering",
  description: "The ACM Student Chapter at Manipal University Jaipur is dedicated to advancing computing as a science and profession. We organize hackathons, coding contests, workshops, and tech talks throughout the year.",
  foundedYear: 2018,
  memberCount: 180,
  adminName: "Rahul Sharma",
  adminEmail: "rahul.sharma@muj.manipal.edu",
  adminRegNo: "220301120012",
};

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "HackMUJ 3.0 — 36-Hour Hackathon",
    description: "Join the biggest hackathon at MUJ! Build innovative solutions in 36 hours with mentors from top companies. Open to all departments and years. Prizes worth ₹2,00,000+.",
    date: "2026-03-15",
    time: "09:00 AM",
    venue: "AB-5 Auditorium, MUJ Campus",
    category: "Tech",
    organizer: "Rahul Sharma",
    organizerClub: "ACM MUJ",
    banner: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
    status: "upcoming",
    registrations: 284,
    maxCapacity: 500,
    approvalStatus: "approved",
    isRegistered: true,
  },
  {
    id: "2",
    title: "Rang — Annual Cultural Fest",
    description: "MUJ's flagship cultural festival featuring music, dance, drama, art, and fashion. Three days of non-stop entertainment with celebrity performances.",
    date: "2026-03-22",
    time: "10:00 AM",
    venue: "Main Ground, MUJ Campus",
    category: "Cultural",
    organizer: "Priya Singh",
    organizerClub: "Cultural Committee MUJ",
    banner: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop",
    status: "upcoming",
    registrations: 1200,
    maxCapacity: 2000,
    approvalStatus: "approved",
  },
  {
    id: "3",
    title: "Inter-Department Cricket Tournament",
    description: "Annual cricket tournament between all departments. Form your team of 11 and compete for the champion's trophy. Registration per team.",
    date: "2026-04-01",
    time: "07:00 AM",
    venue: "Sports Complex, MUJ",
    category: "Sports",
    organizer: "Arjun Patel",
    organizerClub: "Sports Club MUJ",
    banner: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=400&fit=crop",
    status: "upcoming",
    registrations: 120,
    maxCapacity: 220,
    approvalStatus: "approved",
  },
  {
    id: "4",
    title: "AI/ML Workshop — Hands-On Deep Learning",
    description: "A two-day intensive workshop on deep learning frameworks (TensorFlow, PyTorch). Build real-world models with expert guidance.",
    date: "2026-03-10",
    time: "02:00 PM",
    venue: "CS Lab 3, Academic Block 4",
    category: "Academic",
    organizer: "Dr. Neha Gupta",
    organizerClub: "GDSC MUJ",
    banner: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    status: "upcoming",
    registrations: 78,
    maxCapacity: 100,
    approvalStatus: "approved",
    isRegistered: true,
  },
  {
    id: "5",
    title: "TEDxMUJ 2026",
    description: "An independently organized TEDx event at Manipal University Jaipur. Hear from inspiring speakers across tech, art, science, and social impact.",
    date: "2026-02-20",
    time: "10:00 AM",
    venue: "Convocation Hall, MUJ",
    category: "Academic",
    organizer: "Sneha Jain",
    organizerClub: "TEDxMUJ",
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    status: "completed",
    registrations: 350,
    maxCapacity: 400,
    approvalStatus: "approved",
    isRegistered: true,
    winners: [
      { position: "1st", name: "Aarav Mehta", regNo: "220301120045", teamName: "Team Innovate" },
      { position: "2nd", name: "Priya Patel", regNo: "220302110032" },
      { position: "3rd", name: "Rohan Gupta", regNo: "220301130078" },
    ],
    certificateUploaded: true,
  },
  {
    id: "6",
    title: "Startup Weekend MUJ",
    description: "54-hour event where aspiring entrepreneurs pitch ideas, form teams, and build startups. Mentored by industry leaders and investors.",
    date: "2026-02-05",
    time: "06:00 PM",
    venue: "Incubation Centre, MUJ",
    category: "Tech",
    organizer: "Vikram Desai",
    organizerClub: "E-Cell MUJ",
    banner: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
    status: "completed",
    registrations: 150,
    maxCapacity: 200,
    approvalStatus: "approved",
    winners: [
      { position: "1st", name: "Karthik Nair", regNo: "220301120067", teamName: "StartupX" },
      { position: "2nd", name: "Sneha Joshi", regNo: "220301120089", teamName: "InnoVenture" },
      { position: "3rd", name: "Aditya Kumar", regNo: "220301120112", teamName: "TechPioneers" },
      { position: "Special Mention", name: "Meera Patel", regNo: "220401120023", teamName: "GreenTech" },
    ],
    certificateUploaded: false,
  },
  {
    id: "7",
    title: "Photography Walk — Jaipur Heritage",
    description: "Explore Jaipur's stunning architecture and heritage sites with fellow photographers. Learn composition, lighting, and street photography techniques.",
    date: "2026-04-10",
    time: "06:00 AM",
    venue: "Hawa Mahal, Jaipur (Bus from MUJ)",
    category: "Cultural",
    organizer: "Aisha Khan",
    organizerClub: "Photography Club MUJ",
    banner: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=400&fit=crop",
    status: "upcoming",
    registrations: 40,
    maxCapacity: 60,
    approvalStatus: "pending",
  },
  {
    id: "8",
    title: "Badminton Championship 2026",
    description: "Singles and doubles badminton championship. Open to all MUJ students. Winners represent MUJ at inter-university level.",
    date: "2026-04-15",
    time: "08:00 AM",
    venue: "Indoor Sports Hall, MUJ",
    category: "Sports",
    organizer: "Ravi Kumar",
    organizerClub: "Sports Club MUJ",
    banner: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=400&fit=crop",
    status: "upcoming",
    registrations: 64,
    maxCapacity: 128,
    approvalStatus: "pending",
  },
];

export const mockCertificates: Certificate[] = [
  {
    id: "c1",
    eventName: "TEDxMUJ 2026",
    eventDate: "2026-02-20",
    issuedDate: "2026-02-22",
    category: "Academic",
  },
  {
    id: "c2",
    eventName: "Startup Weekend MUJ",
    eventDate: "2026-02-05",
    issuedDate: "2026-02-08",
    category: "Tech",
  },
  {
    id: "c3",
    eventName: "National Science Symposium",
    eventDate: "2026-01-15",
    issuedDate: "2026-01-18",
    category: "Academic",
  },
];

export const mockStudentProfile: UserProfile = {
  name: "Aarav Mehta",
  email: "aarav.mehta@muj.manipal.edu",
  registrationNumber: "220301120045",
  role: "student",
  eventsAttended: 12,
  certificatesEarned: 3,
};

export const mockClubProfile: UserProfile = {
  name: "Rahul Sharma",
  email: "rahul.sharma@muj.manipal.edu",
  registrationNumber: "220301120012",
  role: "club_admin",
  eventsAttended: 0,
  certificatesEarned: 0,
};

export const eventCategories: EventCategory[] = ["Tech", "Cultural", "Sports", "Academic"];

export const categoryColors: Record<EventCategory, string> = {
  Tech: "bg-blue-100 text-blue-700 border-blue-200",
  Cultural: "bg-purple-100 text-purple-700 border-purple-200",
  Sports: "bg-green-100 text-green-700 border-green-200",
  Academic: "bg-amber-100 text-amber-700 border-amber-200",
};

export const approvalStatusColors: Record<ApprovalStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  approved: "bg-green-100 text-green-700 border-green-200",
  rejected: "bg-red-100 text-red-700 border-red-200",
};

