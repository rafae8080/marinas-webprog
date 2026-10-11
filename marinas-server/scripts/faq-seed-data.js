// RMO FAQ seed (the chatbot was called "Radyo" in the plan), from PORTFOLIO_PLAN.md §D1. Edit here, then run `npm run seed:faqs`
// (updates MongoDB and marinas-client/src/data/faqs.json).
// Changes from §D1, based on the Phase 1 audit and Rafael's decisions:
//   #20 / #24  renamed to RMO and now uses a free AI model (Rafael's decision), so "no AI" was removed.
//   #2  "mesh-network resident chat" -> the P2P mesh relays reports; chat runs through the server.
//   #13 StayNest confirmed by the audit and Rafael's screenshots, so its TODO is gone.
// #5 and #18 stay TODO(rafael) until Rafael answers them.
module.exports = [
  {
    question: "What is Rafael's tech stack?",
    keywords: ["stack", "tech", "technologies", "languages", "framework", "mern"],
    answer:
      "Mainly MERN (MongoDB, Express, React, Node), plus Next.js, PHP and Flutter. Databases: MongoDB, MySQL, SQL Server, Supabase, Firebase.",
    links: [{ label: "Field Kit", url: "/#field-kit" }],
  },
  {
    question: "What is E-Telly?",
    keywords: ["etelly", "e-telly", "capstone", "disaster"],
    answer:
      "A disaster preparedness and communication system (capstone, team of 5) with a P2P report relay between phones and real-time community chat. Rafael built the entire web app, backend and database.",
    links: [
      { label: "E-Telly case file", url: "/work/e-telly" },
      { label: "Live site", url: "https://e-tellyph.com" },
    ],
  },
  {
    question: "What did Rafael build in E-Telly?",
    keywords: ["role", "contribution", "etelly", "part"],
    answer:
      "The MERN web app and backend, the database design, live disaster reporting, the multi-hazard map, and hazard-aware route navigation in the Flutter app with Firebase Auth.",
    links: [{ label: "E-Telly case file", url: "/work/e-telly" }],
  },
  {
    question: "How was E-Telly evaluated?",
    keywords: ["evaluation", "usability", "results", "evaluated"],
    answer:
      "By 122 residents, 6 CDRRMO personnel and 5 IT professionals, with an overall usability mean of 4.05/5.00 (High).",
    links: [{ label: "E-Telly case file", url: "/work/e-telly" }],
  },
  {
    question: "Is Rafael available for work?",
    keywords: ["available", "availability", "hire", "hiring", "freelance", "internship", "job"],
    answer: 'TODO(rafael): e.g. "Yes, open to internships and freelance projects. Send a message below."',
    links: [{ label: "Send a message", url: "/#contact" }],
  },
  {
    question: "Does he do freelance work?",
    keywords: ["freelance", "client", "commission", "clients"],
    answer:
      "Yes. Since 2024 he has delivered 10+ client projects, from Android storybook apps to complete management systems.",
    links: [{ label: "Client work", url: "/work?type=client" }],
  },
  {
    question: "Where is Rafael based?",
    keywords: ["location", "where", "city", "based", "live"],
    answer: "Marikina City, Philippines.",
    links: [],
  },
  {
    question: "Where does he study?",
    keywords: ["school", "university", "education", "study", "college", "nu"],
    answer:
      "BS Information Technology (Mobile & Web Applications) at National University Manila, expected to graduate June 2027.",
    links: [{ label: "Education", url: "/about#education" }],
  },
  {
    question: "What are his grades?",
    keywords: ["deans list", "gwa", "grades", "dean"],
    answer: "8-time Dean's Lister with a GWA of 3.68/4.00.",
    links: [],
  },
  {
    question: "What certifications does he have?",
    keywords: ["certification", "certifications", "certified", "credly", "badge"],
    answer:
      "ITS Cybersecurity, PMI Project Management Ready, Cisco Computer Hardware Basics, and Lean Six Sigma Yellow Belt.",
    links: [{ label: "Certifications", url: "/#certifications" }],
  },
  {
    question: "Does he build mobile apps?",
    keywords: ["mobile", "flutter", "android", "app", "dart"],
    answer: "Yes, with Flutter and Dart: an e-commerce app, a Facebook-style clone, and E-Telly's route navigation.",
    links: [{ label: "Mobile projects", url: "/work?type=mobile" }],
  },
  {
    question: "Does he know backend development?",
    keywords: ["backend", "api", "server", "node", "express"],
    answer:
      "Yes. Express/Node REST APIs with JWT auth and MongoDB, plus PHP and VB.NET systems. This site's own API is one example.",
    links: [],
  },
  {
    question: "What is StayNest?",
    keywords: ["staynest", "booking", "airbnb", "vb.net"],
    answer:
      "An Airbnb-style booking system in VB.NET that he's currently building: guests book, hosts list, admins approve, with a MySQL database, an MS Access backup and full documentation.",
    links: [{ label: "StayNest case file", url: "/work/staynest" }],
  },
  {
    question: "Why does he build management systems?",
    keywords: ["why", "story", "apartment", "property", "rental"],
    answer:
      "He has helped manage his family's 17-unit rental since 2017 (tenants, leases, monthly statements), so he knows what these systems need.",
    links: [{ label: "His story", url: "/about" }],
  },
  {
    question: "Does he know cybersecurity?",
    keywords: ["security", "cybersecurity", "network", "networking"],
    answer:
      "He's ITS Cybersecurity certified and has used OPNsense, Linux, Wireshark, NetworkMiner and Cisco Packet Tracer.",
    links: [],
  },
  {
    question: "Can I see his code?",
    keywords: ["github", "code", "repo", "source"],
    answer: "Yes, at github.com/rafae8080. Each case file links to its repo when it's public.",
    links: [{ label: "GitHub", url: "https://github.com/rafae8080" }],
  },
  {
    question: "How do I contact Rafael?",
    keywords: ["contact", "email", "message", "reach"],
    answer: "Use the contact form on this page, or email work.rafael22@gmail.com. LinkedIn works too.",
    links: [
      { label: "Contact form", url: "/#contact" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/rafael-marinas-53703038b" },
    ],
  },
  {
    question: "Can I get his resume?",
    keywords: ["resume", "cv"],
    answer: 'TODO(rafael): "Ask through the contact form" or link a PDF without the phone number.',
    links: [{ label: "Contact form", url: "/#contact" }],
  },
  {
    question: "What languages does he speak?",
    keywords: ["language", "english", "filipino", "tagalog", "speak"],
    answer: "English and Filipino.",
    links: [],
  },
  {
    question: "How was this website built?",
    keywords: ["website", "portfolio", "built", "this site"],
    answer:
      "React + Vite + Tailwind on the front end, Express + MongoDB on the back end, deployed on Vercel. I'm RMO: I answer from Rafael's verified facts using a free AI model, with this FAQ list as a backup.",
    links: [{ label: "Source code", url: "https://github.com/rafae8080/marinas-webprog" }],
  },
  {
    question: "What does he do for fun?",
    keywords: ["hobbies", "hobby", "fun", "free time", "games"],
    answer:
      "Gym, basketball and taekwondo. He also used to play Mobile Legends, LoL, Call of Duty, NBA 2K and Tekken.",
    links: [{ label: "Off the Clock", url: "/about#off-the-clock" }],
  },
  {
    question: "Does he do UI design?",
    keywords: ["design", "figma", "ui", "ux"],
    answer: "Yes. He designs in Figma and builds with Tailwind CSS.",
    links: [],
  },
  {
    question: "Does he have project management skills?",
    keywords: ["project management", "pmi", "lean", "six sigma"],
    answer: "PMI Project Management Ready and Lean Six Sigma Yellow Belt certified.",
    links: [],
  },
  {
    question: "Who are you?",
    keywords: ["rmo", "radyo", "bot", "who are you"],
    answer: "I'm RMO, Rafael's field radio. I answer questions about his work.",
    links: [],
  },
].map((faq, i) => ({ ...faq, order: i + 1, active: true }));
