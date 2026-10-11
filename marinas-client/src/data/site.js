// Site-wide facts. Source of truth: PORTFOLIO_PLAN.md §B2. Don't add anything that isn't there or confirmed by Rafael.

export const contact = {
  name: "Rafael Marinas",
  email: "work.rafael22@gmail.com",
  github: "https://github.com/rafae8080",
  linkedin: "https://www.linkedin.com/in/rafael-marinas-53703038b",
  sourceRepo: "https://github.com/rafae8080/marinas-webprog",
};

export const coords = {
  label: "14.65°N 121.10°E",
  lat: 14.65,
  lng: 121.1,
  place: "Marikina City, PH",
  short: "MARIKINA",
  timeZone: "Asia/Manila",
};

export const role = "Full-stack developer (MERN, Next.js, PHP) + Flutter mobile";

export const metrics = [
  {
    id: "etelly-residents",
    value: 122,
    label: "residents evaluated E-Telly",
    detail: "plus 6 CDRRMO personnel and 5 IT professionals",
  },
  {
    id: "etelly-usability",
    value: 4.05,
    decimals: 2,
    suffix: "/5",
    label: "E-Telly usability mean (High)",
  },
  { id: "client-projects", value: 10, suffix: "+", label: "client projects as a freelancer (2024–present)" },
  { id: "rental-units", value: 17, label: "rental units managed since 2017 (14 residential, 3 commercial)" },
  { id: "deans-list", value: 8, suffix: "×", label: "Dean's Lister (trimester)" },
];

export const education = {
  degree: "BS Information Technology, specialization in Mobile & Web Applications",
  school: "National University Manila",
  expected: "June 2027",
  gwa: "3.68/4.00",
  deansList: "8 terms (trimester)",
  coursework: ["Web Programming", "Mobile Programming", "Database Systems", "Information Assurance & Security"],
};

export const certifications = [
  { name: "ITS Cybersecurity", issuer: "Certiport", date: "May 2026", url: null }, // TODO(rafael): Credly URL
  { name: "Project Management Ready", issuer: "PMI", date: "Oct 2026", url: null }, // TODO(rafael): Credly URL
  { name: "Computer Hardware Basics", issuer: "Cisco", date: "Oct 2026", url: null }, // TODO(rafael): Credly URL
  { name: "Lean Six Sigma Yellow Belt", issuer: "MF OpEx/CSSC", date: "Oct 2025", url: null }, // TODO(rafael): Credly URL
];

export const skills = [
  { group: "Languages", items: ["JavaScript", "Java", "Dart", "PHP", "VB.NET", "HTML", "CSS"] },
  {
    group: "Frameworks & libraries",
    items: ["React", "Next.js", "Node.js", "Express.js", "Flutter", "Tailwind CSS"],
  },
  {
    group: "Data & backend services",
    items: ["MongoDB", "MySQL", "Microsoft SQL Server", "Supabase", "Firebase"],
  },
  { group: "Tools", items: ["Git", "GitHub", "VS Code", "NetBeans", "Eclipse", "Figma"] },
  {
    group: "Networking & security",
    items: ["OPNsense", "Linux", "Wireshark", "NetworkMiner", "Cisco Packet Tracer"],
  },
  { group: "Spoken", items: ["English", "Filipino"] },
];

// Newest first
export const timeline = [
  {
    period: "2025–present",
    title: "E-Telly (capstone, team of 5)",
    org: "National University Manila",
    detail:
      "Built the entire web app and backend (MERN), designed the database, the live disaster reporting module, the multi-hazard map and hazard-aware route navigation in the Flutter app.",
  },
  {
    period: "2024–present",
    title: "Freelance Web & Software Developer",
    org: "Self-employed",
    detail: "10+ client projects, from Android Studio storybook apps to full management systems.",
  },
  {
    period: "Expected June 2027",
    title: "BS Information Technology (Mobile & Web Applications)",
    org: "National University Manila",
    detail: "Dean's Lister for 8 terms · GWA 3.68/4.00",
  },
  {
    period: "2017–present",
    title: "Property Management Assistant",
    org: "Family-owned apartment rental",
    detail: "Tenants, lease contracts and monthly statements of account for 17 units.",
  },
];
