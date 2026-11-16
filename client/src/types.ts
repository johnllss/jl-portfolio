export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
  photoUrl: string;
  summary: string;
  intro: string[];
  facts: { label: string; value: string }[];
  skills: { group: string; items: string[] }[];
  education: { school: string; program: string; years: string; notes: string[] }[];
  certifications: { title: string; provider: string; year: string; status?: string }[];
  hobbies: { title: string; detail: string }[];
}

export interface Project {
  slug: string;
  title: string;
  period: string;
  role: string;
  team: string;
  summary: string;
  stack: string[];
  highlights: string[];
  repoUrl: string;
  liveUrl: string;
  images: string[]; // screenshot placeholders; swap for real image paths in client/public
  reflection: string; // "what I learned" — your voice goes here
}

export interface WorkSample {
  id: string;
  title: string;
  type: string; // Business | Volunteer | Part-time | Formal work
  period: string;
  organization: string;
  description: string;
  skills: string[];
  image: string;
}

export interface Reference {
  name: string;
  title: string;
  organization: string;
  relationship: string;
  email: string;
  phone: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface ContactBody {
  name: string;
  email: string;
  message: string;
  website?: string; // honeypot: real people leave this empty
}
