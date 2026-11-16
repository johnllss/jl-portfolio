import type { Profile, Project, Reference, Testimonial, WorkSample } from "./types";

export const profile: Profile = {
  name: "John Lloyd Suñga",
  role: "Full-Stack Developer (MERN) · Software Engineer",
  tagline: "I build full-stack web apps and I'm exploring where automation and AI fit in.",
  location: "San Fernando, Pampanga, Philippines",
  email: "john.lloyd.sunga1@gmail.com",
  linkedin: "https://www.linkedin.com/in/john-lloyd-suñga",
  github: "https://github.com/johnllss",
  resumeUrl: "/resume.pdf",
  photoUrl: "/me.png",
  summary:
    "BS Computer Science student (Software Technology) at De La Salle University, building full-stack web applications with the MERN stack and database applications with MySQL and MongoDB. Experienced in developing features and testing software in team projects. Interested in automation and AI. Collaborative problem solver seeking an internship or entry-level job in software development.",
  intro: [
    "I am John Lloyd Suñga, an ever-curious aspiring software developer with a passion for exploring all things technology and devices. My journey into software development started with a simple HTML, CSS and basic JavaScript subject back in my high school years. I want to build innovative web applications that make a difference and provide A.I. automations that improve user experiences.",
    "The kind of team I want to join is one that values collaboration, continuous learning, and individual growth. I would bring to this team my curiosity for learning technological things, my ability to work well in a team, and my commitment to delivering high-quality code.",
  ],
  facts: [
    { label: "Program", value: "BS CS · Software Technology" },
    { label: "University", value: "De La Salle University" },
    { label: "CGPA", value: "3.127" },
    { label: "Expected grad.", value: "2028" },
  ],
  skills: [
    {
      group: "Web Development",
      items: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "Mongoose", "MySQL", "Flask", "Handlebars", "Jinja2", "REST APIs", "HTML", "CSS"],
    },
    { group: "AI", items: ["Claude", "Claude Code", "Claude Cowork", "ChatGPT", "Gemini", "Prompt Design"] },
    { group: "Programming Languages", items: ["Java", "Python", "C", "Assembly Language (x86-64 NASM)"] },
    { group: "Software Testing", items: ["QA testing", "Bug reporting", "Session-based auth testing"] },
    { group: "Tools", items: ["Git", "GitHub", "VS Code"] },
    { group: "Core Skills", items: ["Problem-solving", "Teamwork", "Communication", "Time management", "Attention to detail", "Organization"] },
  ],
  education: [
    {
      school: "De La Salle University, Manila",
      program: "BS Computer Science, Major in Software Technology",
      years: "2022 – 2028 (expected)",
      notes: [
        "CGPA 3.127",
        "Coursework: Web Application Development (CCAPDEV), Information Management (CCINFOM), Data Structures and Algorithms (CCDSALG), Object Oriented Programming (CCPROG3), Algorithms and Complexity (CSALGCM)",
      ],
    },
    {
      school: "O.B. Montessori Center, Inc., Angeles",
      program: "Senior High School, General Academic Strand",
      years: "2009 – 2022",
      notes: ["Graduated as Valedictorian"],
    },
  ],
  certifications: [
    { title: "The Fullstack Developer Path", provider: "Scrimba", year: "2026", status: "In progress" },
    { title: "Learn JavaScript", provider: "Scrimba", year: "2025" },
    { title: "Learn HTML and CSS", provider: "Scrimba", year: "2024" },
  ],
  hobbies: [
    { title: "Building & upgrading PCs and peripheral devices", detail: "Researched and built my own gaming PC with parts I picked myself." },
    { title: "Gaming", detail: "Casual Steam games and competitive Valorant." },
    { title: "Automation", detail: "Exploring n8n and Zapier workflows. I'm currently still learning." },
    { title: "AI & LLMs", detail: "Using Claude, ChatGPT and Gemini day to day, and learning prompt design." },
  ],
};

export const projects: Project[] = [
  {
    slug: "duck-forum",
    title: "Duck-Themed Community Forum",
    period: "Jan 2026 – Apr 2026",
    role: "Full-Stack Developer and QA Tester",
    team: "Team project, 4 members (CCAPDEV MCO)",
    summary:
      "A server-rendered forum where users register, log in, create posts, vote and comment.",
    stack: ["Node.js", "Express 5", "MongoDB", "Mongoose", "Handlebars", "express-session"],
    highlights: [
      "Built the forum with Express, Handlebars and MongoDB.",
      "Implemented session-based authentication with a MongoDB-backed session store.",
      "Added profile editing and image uploads using express-fileupload.",
      "Developed post search and filtering by keyword, author, date range and sort order, plus nested, editable comments.",
      "Manually tested the login, posting, commenting and search flows.",
    ],
    repoUrl: "https://github.com/johnllss/CCAPDEV-MCO",
    liveUrl: "https://therubberduckforums.onrender.com/",
    images: ["/duck_forums_home.png", "/duck_forums_search-filter.png", "/duck_forums_comments.png"],
    reflection:
      "The most difficult part I did for this group project was definitely coding the APIs reliably. I slowly progressed through this by really just taking in all the research and lessons I learned. When we finished the website forums, deployed it on Render, and have my friends test it, I learned that focusing on edge cases and thorough testing is crucial for a reliable API and overall user experience of the website.",
  },
  {
    slug: "golf-club-system",
    title: "Golf Club Management System",
    period: "Sep 2025 – Nov 2025",
    role: "Database Application Developer",
    team: "Team project, 4 members (CCINFOM)",
    summary:
      "A Flask and MySQL application that manages golf club members, session bookings, staff, inventory and payments in one platform.",
    stack: ["Python", "Flask", "MySQL 8.0", "Jinja2", "HTML", "CSS", "JavaScript"],
    highlights: [
      "Built user record management and membership tiers from Bronze to Diamond: registration, renewal, upgrades and tier-based booking discounts.",
      "Implemented the session booking transaction: verify the account, check availability, record a pending payment, update session status.",
      "Created the Customer Analytics Report: sessions attended, amount spent, loyalty points and membership tier per user.",
    ],
    repoUrl: "https://github.com/johnllss/INFOM_DB-App_Gr3",
    liveUrl: "[No live URL available]",
    images: ["/golf_booking-1.png", "/golf_booking-2.png", "/golf_booking-3.png", "/golf_er.png"],
    reflection:
      "Although not particularly the MERN stack that I desire to master, this group project taught me a lot about database schema and API design. I learned the importance of proper transaction handling and normalization to ensure data integrity. If I could change anything, I would implement a separate admin dashboard just as suggested by our professor.",
  },
];

// use >>> { id, title, type, period, organization, description, skills: [], image }
export const workSamples: WorkSample[] = [];

// use >>> { name, title, organization, relationship, email, phone } (ask permission first)
export const references: Reference[] = [];

// use >>> { quote, author, role }
export const testimonials: Testimonial[] = [];
