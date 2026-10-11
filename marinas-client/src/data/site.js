// Site-wide facts. Source of truth: PORTFOLIO_PLAN.md §B2. Don't add anything that isn't there or confirmed by Rafael.

export const contact = {
  name: "Rafael Marinas",
  email: "work.rafael22@gmail.com",
  github: "https://github.com/rafae8080",
  linkedin: "https://www.linkedin.com/in/rafael-marinas-53703038b",
  sourceRepo: "https://github.com/rafae8080/marinas-webprog",
};

// Public URL for canonical links and sharing tags (also in index.html and scripts/gen-sitemap.mjs)
export const siteUrl = "https://marinas-client.vercel.app";

export const coords = {
  label: "14.65°N 121.10°E",
  lat: 14.65,
  lng: 121.1,
  place: "Marikina City, PH",
  short: "MARIKINA",
  timeZone: "Asia/Manila",
};

export const role =
  "Full-stack developer (MERN, Next.js, PHP) + Flutter mobile";

export const metrics = [
  {
    id: "etelly-residents",
    value: 122,
    label: "residents evaluated E-Telly",
    detail: "plus 6 CDRRMO personnel and 5 IT professionals",
    source: "E-Telly eval",
  },
  {
    id: "etelly-usability",
    value: 4.05,
    decimals: 2,
    suffix: "/5",
    label: "E-Telly usability mean (High)",
    source: "E-Telly eval",
  },
  {
    id: "client-projects",
    value: 10,
    suffix: "+",
    label: "client projects as a freelancer (2024–present)",
    source: "Freelance",
  },
  {
    id: "rental-units",
    value: 17,
    label: "rental units managed since 2017 (14 residential, 3 commercial)",
    source: "Property mgmt",
  },
  {
    id: "deans-list",
    value: 9,
    suffix: "×",
    label: "Dean's Lister (trimester)",
    source: "NU Manila",
  },
];

export const education = {
  degree:
    "BS Information Technology, specialization in Mobile & Web Applications",
  school: "National University Manila",
  expected: "June 2027",
  gwa: "3.68/4.00",
  deansList: "9 terms (trimester)",
  coursework: [
    "Web Programming",
    "Mobile Programming",
    "Database Systems",
    "Information Assurance & Security",
  ],
};

export const certifications = [
  {
    name: "ITS Cybersecurity",
    issuer: "Certiport",
    date: "May 2026",
    url: "https://www.credly.com/badges/616bec7c-ed3c-4638-850e-fe0047bc64ef/public_url",
  },
  {
    name: "Project Management Ready",
    issuer: "PMI",
    date: "Oct 2026",
    url: "https://www.credly.com/badges/f659da75-7c87-4236-8ad6-e38f8cfc3ef9/public_url",
  },
  {
    name: "Computer Hardware Basics",
    issuer: "Cisco",
    date: "Oct 2026",
    url: "https://www.credly.com/badges/e292a918-a21f-4105-a6c1-2262a66497f0/public_url",
  },
  {
    name: "Lean Six Sigma Yellow Belt",
    issuer: "MF OpEx/CSSC",
    date: "Oct 2025",
    url: null,
  }, // no digital badge issued
];

export const skills = [
  {
    group: "Languages",
    items: ["JavaScript", "Java", "Dart", "PHP", "VB.NET", "HTML", "CSS"],
  },
  {
    group: "Frameworks & libraries",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "Flutter",
      "Tailwind CSS",
    ],
  },
  {
    group: "Data & backend services",
    items: ["MongoDB", "MySQL", "Microsoft SQL Server", "Supabase", "Firebase"],
  },
  {
    group: "Tools",
    items: ["Git", "GitHub", "VS Code", "NetBeans", "Eclipse", "Figma"],
  },
  {
    group: "Networking & security",
    items: [
      "OPNsense",
      "Linux",
      "Wireshark",
      "NetworkMiner",
      "Cisco Packet Tracer",
    ],
  },
  { group: "Spoken", items: ["English", "Filipino"] },
];

// Field Log, oldest first (Phase 5 step 7). All facts from §B2.
export const timeline = [
  {
    period: "2017",
    title: "Property Management Assistant",
    detail:
      "Started helping run the family's apartment rental: tenants, lease contracts and monthly statements of account for 17 units.",
  },
  {
    period: "2023",
    title: "BS Information Technology, National University Manila",
    detail: "Specialization in Mobile & Web Applications.",
  },
  {
    period: "2024",
    title: "Freelance Web & Software Developer",
    detail:
      "10+ client projects since, from Android Studio storybook apps to full management systems.",
  },
  {
    period: "2025",
    title: "E-Telly capstone + Lean Six Sigma Yellow Belt",
    detail:
      "Started E-Telly with a team of 5, building the web app, backend and database. Lean Six Sigma Yellow Belt (MF OpEx/CSSC, Oct 2025).",
  },
  {
    period: "2026",
    title: "Certifications, Flutter apps and StayNest",
    detail:
      "ITS Cybersecurity (May), PMI Project Management Ready and Cisco Computer Hardware Basics (Oct). Flutter e-commerce and Facebook-style apps, and StayNest in VB.NET.",
  },
  {
    period: "June 2027",
    title: "Expected graduation",
    detail: "BSIT, 9× Dean's Lister, GWA 3.68/4.00.",
  },
];

// Experience (§B2), newest first
export const experience = [
  {
    period: "2024–present",
    title: "Freelance Web & Software Developer",
    org: "Self-employed",
    detail:
      "10+ client projects, from Android Studio storybook apps to full management systems.",
  },
  {
    period: "2017–present",
    title: "Property Management Assistant",
    org: "Family-owned apartment rental",
    detail:
      "Tenants, lease contracts and monthly statements of account for 17 units (14 residential, 3 commercial).",
  },
];
// Ops map pins. City-level coordinates ONLY (never a home, property or campus street address).
// The E-Telly pilot area (Antipolo City) is left out until Rafael confirms he's allowed to show it.
export const mapPins = [
  {
    code: "BASE",
    label: "Marikina City",
    lat: 14.65,
    lng: 121.1,
    text: "Base of operations: Marikina City, PH.",
    link: { to: "/about", label: "About me" },
  },
  {
    code: "TRAINING GROUND",
    label: "National University Manila",
    lat: 14.6,
    lng: 120.98,
    text: "BSIT, Mobile & Web Applications. 9× Dean's Lister, expected June 2027.",
    link: { to: "/about#education", label: "Education" },
  },
];
