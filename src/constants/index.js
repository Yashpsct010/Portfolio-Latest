import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

export const HERO_CONTENT = {
  name: "Yash Parmar",
  role: "Full Stack Developer (MERN)",
  description: "I build scalable, high-performance web applications with a focus on modern React, Node.js, and seamless API integrations.",
};

export const ABOUT_CONTENT = {
  summary: "Full-Stack Developer (MERN) with 2+ years of experience building scalable, high-performance web applications. Skilled in modern React (v19), Node.js, and API design with expertise in database optimization and CI/CD automation. Improved backend efficiency by 40% through caching and query tuning. Focused on delivering secure, production-ready systems with seamless API integrations and cloud deployments.",
};

export const EXPERIENCES = [
  {
    year: "March 2023 - Present",
    role: "Software Developer",
    company: "Nerds & Geeks Pvt Ltd",
    description: "Spearheaded development for a client-facing MERN platform, increasing API throughput by 35% and ensuring 200ms average response times. Integrated Stripe and third-party APIs. Implemented caching and indexing strategies, cutting recurring DB query execution times from ~1.2s to ~0.7s.",
    technologies: ["MERN Stack", "Stripe API", "Redis", "Node.js"],
  },
  {
    year: "Aug 2022 - Jan 2023",
    role: "Full-stack Developer Intern",
    company: "Institute of Engineering & Science, IPS Academy",
    description: "Re-architected academic portal backend (CodeIgniter + MySQL), improving page load speed by 30% and lowering infrastructure costs by 10%. Automated grading workflows with REST APIs, eliminating 75% of manual work.",
    technologies: ["CodeIgniter", "MySQL", "REST APIs"],
  },
];

export const PROJECTS = [
  {
    title: "TechInsightsAI",
    subtitle: "AI-driven, automated tech blogging",
    description: "Built and deployed an AI-driven blogging platform that generates dynamic blog content using Google Gemini API. Automated workflows with GitHub Actions. Fetches relevant images from Unsplash API. PWA Support.",
    technologies: ["MERN", "Vite", "Gemini API", "Unsplash API", "Vercel"],
    link: "https://techinsightsai.vercel.app/",
  },
  {
    title: "Reveal",
    subtitle: "Journal app with mood tracking & analytics",
    description: "Designed a responsive UI with Tailwind CSS v4 and shadcn/ui. Implemented secure authentication with Clerk. Modeled data with Prisma 6 & PostgreSQL. Improved resilience with Arcjet integration.",
    technologies: ["Next.js", "Tailwind", "shadcn/ui", "Clerk", "Prisma", "PostgreSQL"],
    link: "https://revealmyjournal.vercel.app/",
  },
  {
    title: "EatAnna",
    subtitle: "End-to-End Food Subscription Solution",
    description: "Designed subscription and order management system supporting secure recurring payments via Stripe. Implemented Google OAuth + OTP login. Integrated Cloudinary for efficient cloud-based media management.",
    technologies: ["MERN Stack", "Cloudinary", "Stripe API"],
    link: "https://eatanna.vercel.app/",
  },
];

export const SKILLS = [
  "JavaScript ES6+",
  "TypeScript",
  "Python",
  "React 19",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Git",
  "Docker",
];

export const CONTACT = {
  email: "yashpsct001@gmail.com",
  phone: "+91 9907319464",
  address: "Bengaluru, KA",
  links: [
    { icon: FaLinkedin, url: "https://linkedin.com/in/y-sh/" },
    { icon: FaGithub, url: "https://github.com/yashpsct010" },
    { icon: FaGlobe, url: "https://parmaryash.vercel.app/" },
  ],
};
