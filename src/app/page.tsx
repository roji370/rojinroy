"use client";

import { useState, useEffect, useRef } from "react";
import NextImage from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  FileText, 
  Code, 
  Sparkles, 
  Terminal, 
  ArrowRight, 
  ArrowUpRight,
  Smartphone, 
  Layers, 
  Send, 
  Tv, 
  Calendar, 
  MessageSquare,
  Award,
  BookOpen,
  ArrowUp,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

// Local SVG components for brand icons that are missing in the installed lucide-react package version
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
import moment from "moment";
import BackgroundGlow from "@/components/BackgroundGlow";
import DynamicIslandNav from "@/components/DynamicIslandNav";

// Types
interface CommentData {
  _id?: string;
  username: string;
  comment: string;
  createdAt?: string;
}

// Sub-component for smooth horizontal image slider on project cards
const ProjectImageSlider = ({ imgs, title, onEnlarge }: { imgs: string[], title: string, onEnlarge: (index: number) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      containerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      if (clientWidth > 0) {
        const newIndex = Math.round(scrollLeft / clientWidth);
        if (newIndex !== activeIndex && newIndex >= 0 && newIndex < imgs.length) {
          setActiveIndex(newIndex);
        }
      }
    }
  };

  return (
    <div className="relative w-full h-full group/slider">
      {/* Scrollable Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {imgs.map((img, i) => (
          <div key={i} className="w-full h-full flex-shrink-0 snap-start relative cursor-zoom-in" onClick={() => onEnlarge(i)}>
            <NextImage
              src={`/${img}`}
              alt={`${title} screenshot ${i + 1}`}
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {activeIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); scroll('left'); }}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover/slider:opacity-100 shadow-md z-20 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}
      {activeIndex < imgs.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); scroll('right'); }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover/slider:opacity-100 shadow-md z-20 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/5 pointer-events-none z-20">
        {imgs.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "bg-white w-3" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Enlarge Button (Top Right, slightly left of the number) */}
      <button
        onClick={(e) => { e.stopPropagation(); onEnlarge(activeIndex); }}
        className="absolute top-3 right-12 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80 border border-white/10 hover:bg-black/80 hover:text-white transition-colors z-20 cursor-pointer"
        title="Enlarge Image"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default function Home() {
  // Comments state
  const [comments, setComments] = useState<CommentData[]>([]);
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Skills filter state
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("all");

  // Scroll to top button state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Lightbox state
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Keyboard listener for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImages) return;
      if (e.key === "Escape") {
        setLightboxImages(null);
      } else if (e.key === "ArrowLeft" && lightboxImages.length > 1) {
        setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight" && lightboxImages.length > 1) {
        setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImages]);

  // Fetch comments from MongoDB database
  const fetchComments = async () => {
    try {
      setIsCommentsLoading(true);
      const res = await fetch("/api/comments");
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    
    // Scroll listener for top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle comment submit
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !commentText.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          comment: commentText.trim(),
        }),
      });

      if (res.ok) {
        setCommentText("");
        // Reload list
        await fetchComments();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact form submit handler
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;
    setIsContactSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/xrgnqqov", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ Name: contactName.trim(), Email: contactEmail.trim(), Message: contactMessage.trim() }),
      });
      if (res.ok) {
        setContactName("");
        setContactEmail("");
        setContactMessage("");
        setContactSuccess(true);
        setTimeout(() => setContactSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Contact form error:", err);
    } finally {
      setIsContactSubmitting(false);
    }
  };

  // Simulating live guestbook typing notifications
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
    
    if (username.trim()) {
      setTypingUser(username.trim());
      setIsTyping(true);
      
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  };

  // Tech items data
  const skills = [
    { name: "HTML5", category: "web", icon: <Layers className="w-4 h-4" />, level: "Intermediate" },
    { name: "CSS3", category: "web", icon: <Layers className="w-4 h-4" />, level: "Intermediate" },
    { name: "JavaScript", category: "web", icon: <Code className="w-4 h-4" />, level: "Proficient" },
    { name: "C Programming", category: "other", icon: <Terminal className="w-4 h-4" />, level: "Intermediate" },
    { name: "Python", category: "backend", icon: <Code className="w-4 h-4" />, level: "Proficient" },
    { name: "MongoDB", category: "backend", icon: <Layers className="w-4 h-4" />, level: "Basic" },
    { name: "Flutter / Dart", category: "mobile", icon: <Smartphone className="w-4 h-4" />, level: "Intermediate" },
    { name: "React Native", category: "mobile", icon: <Smartphone className="w-4 h-4" />, level: "Intermediate" },
    { name: "AI / ML models", category: "other", icon: <Sparkles className="w-4 h-4" />, level: "Basic" },
    { name: "AR / VR systems", category: "other", icon: <Layers className="w-4 h-4" />, level: "Basic" }
  ];

  const filteredSkills = selectedSkillCategory === "all" 
    ? skills 
    : skills.filter(s => s.category === selectedSkillCategory);

  interface Project {
    title: string;
    desc: string;
    tags: string[];
    github?: string;
    discover: string;
    img: string;
    imgs?: string[];
    badge: string;
    live?: string;
  }

  // Projects data
  const projects: Project[] = [
    {
      title: "Travollo – Travel Platform",
      desc: "A modern travel discovery and trip-planning web application designed to help users explore destinations, compare packages, and plan travel experiences.",
      tags: ["Next.js", "TypeScript", "Tailwind", "Node.js", "MongoDB"],
      github: "https://github.com/roji370/travolo.git",
      discover: "/project1",
      img: "assets/project-1.png",
      imgs: ["assets/project-1.png", "assets/project-1-2.png", "assets/project-1-3.png", "assets/project-1-4.png"],
      badge: "Full Stack Web App",
      live: "https://travollo.netlify.app"
    },
    {
      title: "Auditorium Booking System",
      desc: "A venue scheduling and event booking platform featuring real-time availability tracking, calendar management, and approval workflows.",
      tags: ["Next.js", "TypeScript", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/roji370/hall-management.git",
      discover: "/project2",
      img: "assets/project-2.png",
      badge: "Full Stack Web App",
      live: "https://hallmgmt.netlify.app"
    },
    {
      title: "Xfini Academy",
      desc: "A modern educational institution website designed to showcase programs, courses, and faculty, featuring an active enquiry system and 10+ responsive pages.",
      tags: ["Next.js", "TypeScript", "Tailwind", "Node.js", "MongoDB"],
      github: "https://github.com/roji370/briffini-Academy.git",
      discover: "/project3",
      img: "assets/project-3.png",
      badge: "Educational Website",
      live: "https://xfiniacademy.netlify.app"
    },
    {
      title: "Nebula E-Commerce",
      desc: "A modern full-stack online shopping platform featuring dynamic catalog management, advanced filtering, a custom cart system, and an administrative dashboard.",
      tags: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/roji370/nebula.git",
      discover: "/project4",
      img: "assets/project-4.png",
      badge: "E-Commerce Platform",
      live: "https://nebulaecom.netlify.app/"
    },
    {
      title: "Briffini Admin Portal",
      desc: "A secure, high-performance administrative platform and CMS designed to centralize course CMS, student profiles, subscription access, and device anti-piracy.",
      tags: ["React", "TypeScript", "MUI", "Firebase", "Cloud Functions", "FCM"],
      discover: "/project5",
      img: "assets/project-5.png",
      badge: "Admin Console & CMS"
    },
    {
      title: "Briffini Student App",
      desc: "A secure, high-performance mobile learning application designed for student presence verification, native screenshot blocking, and real-time support chat.",
      tags: ["Flutter", "Dart", "Firebase", "Firestore", "Cloud Functions", "FCM"],
      discover: "/project6",
      img: "assets/project-6.png",
      imgs: ["assets/project-6.png", "assets/project-6-2.png"],
      badge: "Mobile Application"
    }
  ];

  // Timeline Experience data
  const milestones = [
    {
      year: "2025",
      title: "Freelance App Developer",
      location: "Briffini Academy (Ireland / Remote)",
      desc: "Building and maintaining scalable educational applications and admin systems using Flutter and Firebase for an international learning platform."
    },
    {
      year: "2025",
      title: "reviveLAB – AR Learning Platform",
      location: "Flagship Project",
      desc: "Developed an augmented reality experience using Unity and C# to teach computer hardware assembly through interactive 3D learning."
    },
    {
      year: "2024",
      title: "App Developer",
      location: "Cygnus IT Solutions",
      desc: "Delivered mobile applications from concept to deployment, integrating authentication, cloud services, and real-time data systems."
    }
  ];

  return (
    <>
      {/* Background and Header */}
      <BackgroundGlow />
      <DynamicIslandNav />

      {/* 1. HERO SECTION */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-24 relative">
        <div className="container max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-primary mb-6 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Freelance Mobile & Web Projects
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Software Engineer <br />
              <span className="text-gradient-accent">& AI Developer</span>
            </h1>
            
            <p className="text-base sm:text-lg text-text-muted mb-8 max-w-xl">
              Hi, I&apos;m <span className="text-white font-semibold">Rojin Roy</span>. I build products from concept to deployment, crafting seamless mobile and web experiences backed by scalable architectures and modern technologies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#projects" className="px-6 py-3 rounded-full bg-white text-bg-primary hover:bg-white/95 text-sm font-bold shadow-[0_8px_30px_rgb(255,255,255,0.15)] flex items-center justify-center gap-2 hover:scale-105 active:scale-100 transition-all duration-300">
                Explore Work <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="px-6 py-3 rounded-full border border-white/10 hover:border-white/20 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-white/5 hover:scale-105 active:scale-100 transition-all duration-300">
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-5 flex justify-center relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Liquid Glass Profile Frame */}
            <div className="relative w-[260px] h-[260px] min-[380px]:w-72 min-[380px]:h-72 sm:w-80 sm:h-80 rounded-full p-2.5 bg-gradient-to-tr from-white/10 to-white/5 border border-white/15 shadow-2xl flex items-center justify-center backdrop-blur-xl">
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/5 bg-bg-secondary">
                  <NextImage
                    src="/assets/profile-pic.jpg"
                    alt="Rojin Roy Portfolio"
                    fill
                    quality={100}
                    sizes="320px"
                    className="object-cover"
                    priority
                  />
                </div>
              
              {/* Floating orbital badges */}
              <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full glass-panel flex items-center justify-center shadow-lg animate-float-slow border border-white/10">
                <Code className="w-5 h-5 text-[#61dbfb]" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full glass-panel flex items-center justify-center shadow-lg animate-float-medium border border-white/10">
                <Smartphone className="w-5 h-5 text-[#a855f7]" />
              </div>
              <div className="absolute top-1/2 -right-6 w-12 h-12 rounded-full glass-panel flex items-center justify-center shadow-lg animate-float-fast border border-white/10">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>      {/* 2. ABOUT ME SECTION */}
      <section id="about" className="py-24 relative">
        <div className="container max-w-6xl px-6">
          <div className="flex flex-col mb-12">
            <span className="text-xs tracking-widest text-primary font-bold uppercase mb-2">About Me</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Engineering digital products<br className="hidden sm:block" /> at the intersection of software<br className="hidden sm:block" /> development and AI.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: description + resume */}
            <motion.div
              className="lg:col-span-7 flex flex-col gap-5 text-left"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                I am a freelance Software Engineer specializing in full-stack application development, mobile technologies, and AI-powered solutions. My work focuses on architecting scalable systems, building intuitive user experiences, and delivering production-ready software for startups, businesses, and educational institutions.
              </p>
              <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                With experience across frontend development, backend services, databases, APIs, and cloud technologies, I build end-to-end solutions that prioritize performance, maintainability, and business value. I am particularly interested in artificial intelligence, machine learning, and LLM-based applications, where I leverage emerging technologies to develop smarter and more adaptive software systems.
              </p>
              <div className="mt-1">
                <a href="assets/RojinCV.pdf" target="_blank" className="glass-button px-5 py-2.5 rounded-full text-xs font-bold inline-flex items-center gap-2 text-white">
                  Download Resume <FileText className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Right: stats + expertise chips */}
            <motion.div
              className="lg:col-span-5 flex flex-col gap-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="glass-panel rounded-2xl p-4 text-center">
                  <span className="text-gradient font-extrabold text-2xl sm:text-3xl block">10+</span>
                  <span className="text-xxs sm:text-xs text-text-muted uppercase tracking-wider font-semibold leading-tight mt-1 block">Client Projects</span>
                </div>
                <div className="glass-panel rounded-2xl p-4 text-center flex flex-col items-center justify-center">
                  <span className="text-gradient font-extrabold text-lg sm:text-xl block leading-tight">Web &amp;<br/>Mobile</span>
                  <span className="text-xxs sm:text-xs text-text-muted uppercase tracking-wider font-semibold leading-tight mt-1 block">Applications</span>
                </div>
                <div className="glass-panel rounded-2xl p-4 text-center flex flex-col items-center justify-center">
                  <span className="text-gradient font-extrabold text-lg sm:text-xl block leading-tight">AI &amp;<br/>LLMs</span>
                  <span className="text-xxs sm:text-xs text-text-muted uppercase tracking-wider font-semibold leading-tight mt-1 block">Automation</span>
                </div>
              </div>

              {/* Technical Expertise Chips */}
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">Technical Expertise</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Full-Stack Development", icon: <Layers className="w-3.5 h-3.5 text-primary" /> },
                    { label: "Artificial Intelligence", icon: <Sparkles className="w-3.5 h-3.5 text-primary" /> },
                    { label: "LLM Applications",       icon: <Terminal className="w-3.5 h-3.5 text-primary" /> },
                    { label: "Mobile Development",     icon: <Smartphone className="w-3.5 h-3.5 text-primary" /> },
                    { label: "Backend Architecture",   icon: <Code className="w-3.5 h-3.5 text-primary" /> },
                    { label: "Database Systems",       icon: <Layers className="w-3.5 h-3.5 text-primary" /> },
                    { label: "Cloud Computing",        icon: <ArrowRight className="w-3.5 h-3.5 text-primary" /> },
                    { label: "AI Automation",          icon: <Sparkles className="w-3.5 h-3.5 text-primary" /> },
                  ].map(({ label, icon }) => (
                    <span key={label} className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/[0.08] text-xs text-text-muted hover:text-white hover:border-primary/30 flex items-center gap-1.5 transition-all duration-200 cursor-default">
                      {icon} {label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS SECTION */}
      <section id="skills" className="py-24 relative bg-white/[0.01]">
        <div className="container max-w-6xl px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs tracking-widest text-primary font-bold uppercase mb-2">Toolkit</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Skills & Technologies</h2>
          </div>

          {/* Interactive Skill Category Filters */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {["all", "mobile", "web", "backend", "other"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedSkillCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  selectedSkillCategory === cat
                    ? "bg-white text-bg-primary shadow-[0_4px_12px_rgba(255,255,255,0.15)]"
                    : "bg-white/5 border border-white/5 text-text-muted hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat === "all" ? "All" : cat === "web" ? "Front-End" : cat === "backend" ? "Backend & DB" : cat}
              </button>
            ))}
          </div>

          {/* Skill Capsules Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  className="glass-panel p-4 rounded-2xl flex items-center gap-3 hover:border-primary/50 transition-colors cursor-default"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                    {skill.icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-white">{skill.name}</span>
                    <span className="text-xxs text-text-muted uppercase font-semibold">{skill.level}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 4. PROJECTS SECTION */}
      <section id="projects" className="py-24 relative">
        <div className="container max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs tracking-widest text-primary font-bold uppercase mb-2 block">Showcase</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Featured Projects</h2>
            </div>
            <p className="text-xs text-text-muted max-w-xs text-left sm:text-right leading-relaxed">
              Production-ready applications built for real clients and real users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((proj, idx) => (
              <motion.div
                key={proj.title}
                className="group glass-panel rounded-2xl overflow-hidden flex flex-col hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Image area with hover overlay */}
                <div className="relative aspect-video overflow-hidden bg-bg-secondary group/media">
                  {proj.imgs && proj.imgs.length > 1 ? (
                    <ProjectImageSlider 
                      imgs={proj.imgs} 
                      title={proj.title} 
                      onEnlarge={(imgIndex) => {
                        setLightboxImages(proj.imgs!);
                        setLightboxIndex(imgIndex);
                      }} 
                    />
                  ) : (
                    <>
                      <NextImage
                        src={`/${proj.img}`}
                        alt={proj.title}
                        fill
                        quality={100}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        onClick={() => {
                          setLightboxImages([proj.img]);
                          setLightboxIndex(0);
                        }}
                        className="object-cover transition-transform duration-500 group-hover/media:scale-105 cursor-zoom-in"
                      />
                      {/* Enlarge Button (Top Right) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxImages([proj.img]);
                          setLightboxIndex(0);
                        }}
                        className="absolute top-3 right-12 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80 border border-white/10 hover:bg-black/80 hover:text-white transition-colors z-20 cursor-pointer"
                        title="Enlarge Image"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}

                  {/* Dark gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover/media:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Hover action buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover/media:opacity-100 transition-all duration-300 translate-y-2 group-hover/media:translate-y-0 z-20 pointer-events-none">
                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        className="px-4 py-2 rounded-full bg-white text-bg-primary text-xs font-bold flex items-center gap-1.5 shadow-xl hover:bg-white/90 transition-colors pointer-events-auto"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 border border-white/30 hover:bg-black/60 transition-colors shadow-lg pointer-events-auto"
                      >
                        <Github className="w-3.5 h-3.5" /> Source
                      </a>
                    )}
                  </div>

                  {/* Badge top-left */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xxs font-bold uppercase tracking-wider text-accent border border-white/10 transition-opacity duration-300 group-hover/media:opacity-0 z-20">
                    {proj.badge}
                  </div>

                  {/* Card number top-right */}
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-xxs font-black text-white/60 border border-white/10 z-20">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-grow text-left">
                  {/* Tags */}
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    {proj.tags.slice(0, 4).map((t) => (
                      <span key={t} className="text-xxs px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-md text-primary/80 font-semibold">
                        {t}
                      </span>
                    ))}
                    {proj.tags.length > 4 && (
                      <span className="text-xxs px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-text-muted font-semibold">
                        +{proj.tags.length - 4}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-tight">{proj.title}</h3>
                  <p className="text-xs text-text-muted mb-5 flex-grow leading-relaxed line-clamp-3">{proj.desc}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    {/* Repo status */}
                    {proj.github ? (
                      <a href={proj.github} target="_blank" className="text-xs font-semibold text-text-muted hover:text-white flex items-center gap-1.5 transition-colors duration-200">
                        <Github className="w-3.5 h-3.5" /> Repository
                      </a>
                    ) : (
                      <span className="text-xs font-semibold text-text-muted/30 flex items-center gap-1.5 select-none">
                        <Github className="w-3.5 h-3.5" /> Private
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      {proj.live && (
                        <a 
                          href={proj.live} 
                          target="_blank" 
                          className="text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 text-white hover:bg-white/5 transition-all flex items-center gap-1"
                        >
                          Live
                        </a>
                      )}
                      <a href={proj.discover} className="text-xs font-bold px-4 py-2 rounded-full bg-white/10 text-white hover:bg-primary transition-colors flex items-center gap-1.5">
                        Discover <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXPERIENCE SECTION */}
      <section id="experience" className="py-24 relative bg-white/[0.01]">
        <div className="container max-w-4xl px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs tracking-widest text-primary font-bold uppercase mb-2">History</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Experience & Milestones</h2>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l border-white/10 flex flex-col gap-10 max-w-2xl mx-auto text-left">
            {milestones.map((mile, idx) => (
              <motion.div 
                key={mile.title}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Node dot glow */}
                <div className="absolute -left-8 sm:-left-10 top-1.5 w-4 h-4 rounded-full bg-bg-primary border-2 border-primary flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xxs font-bold text-primary">{mile.year}</span>
                  <span className="text-xxs text-text-muted font-semibold">{mile.location}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{mile.title}</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{mile.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LIVE GUESTBOOK */}
      <section id="guestbook" className="py-24 relative">
        <div className="container max-w-6xl px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs tracking-widest text-primary font-bold uppercase mb-2">Real-Time Reviews</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Live Guestbook</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 glass-panel rounded-3xl p-6 relative">
              <h3 className="text-lg font-bold text-white mb-1 text-left">Leave a Message</h3>
              <p className="text-xs text-text-muted mb-6 text-left">Leave a public comment. Saved in MongoDB and updated instantly.</p>
              
              <AnimatePresence>
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xxs text-accent font-semibold mb-3 flex items-center gap-1.5 text-left"
                  >
                    <span className="flex gap-1">
                      <span className="w-1 h-1 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-1 h-1 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="w-1 h-1 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </span>
                    {typingUser} is typing...
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4 text-left">
                <div>
                  <label htmlFor="username-input" className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-1.5">Your Name</label>
                  <input
                    type="text"
                    id="username-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    required
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-2.5 text-base lg:text-sm text-white focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="comment-textarea" className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-1.5">Message</label>
                  <textarea
                    id="comment-textarea"
                    value={commentText}
                    onChange={handleTextareaChange}
                    placeholder="Type your comment..."
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-2.5 text-base lg:text-sm text-white focus:outline-none transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-xl bg-white text-bg-primary font-bold text-xs hover:bg-white/95 transition-colors shadow-lg flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? "Broadcasting..." : "Broadcast Message"} <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-4 max-h-none lg:max-h-[460px] overflow-y-visible lg:overflow-y-auto pr-2">
              <AnimatePresence mode="popLayout">
                {isCommentsLoading && comments.length === 0 ? (
                  <div className="text-center py-12 text-text-muted text-xs">Loading guestbook comments...</div>
                ) : comments.length === 0 ? (
                  <div className="glass-panel p-8 text-center text-text-muted text-xs rounded-2xl">No comments yet. Be the first to leave one!</div>
                ) : (
                  comments.map((c) => {
                    const initials = c.username
                      ? c.username.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
                      : "??";
                    
                    return (
                      <motion.div
                        key={c._id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="glass-panel p-4 rounded-2xl flex flex-col gap-2 hover:border-white/15 transition-all text-left"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple flex items-center justify-center text-xxs font-bold text-white">
                              {initials}
                            </div>
                            <span className="text-sm font-bold text-white">{c.username}</span>
                          </div>
                          <span className="text-xxs text-text-muted flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" /> {moment(c.createdAt).calendar()}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-text-muted leading-relaxed pl-10 pr-2">{c.comment}</p>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="py-24 relative">
        <div className="container max-w-6xl px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="text-xs tracking-widest text-primary font-bold uppercase mb-2">Collaboration</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Get in Touch</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <a href="mailto:rojinroy370@gmail.com" className="glass-panel p-5 rounded-2xl flex items-center gap-4 hover:border-primary/50 transition-all text-left group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xxs text-text-muted font-bold uppercase">Email Me</span>
                  <div className="text-sm font-bold text-white mt-0.5">rojinroy370@gmail.com</div>
                </div>
              </a>
              
              <a href="https://in.linkedin.com/in/rojin-roy-2028b1251?trk=people-guest_people_search-card" target="_blank" className="glass-panel p-5 rounded-2xl flex items-center gap-4 hover:border-primary/50 transition-all text-left group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xxs text-text-muted font-bold uppercase">LinkedIn</span>
                  <div className="text-sm font-bold text-white mt-0.5">Rojin Roy</div>
                </div>
              </a>

              <a href="https://github.com/roji370" target="_blank" className="glass-panel p-5 rounded-2xl flex items-center gap-4 hover:border-primary/50 transition-all text-left group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xxs text-text-muted font-bold uppercase">GitHub Profile</span>
                  <div className="text-sm font-bold text-white mt-0.5">roji370</div>
                </div>
              </a>

              <a href="https://www.instagram.com/rojin370/" target="_blank" className="glass-panel p-5 rounded-2xl flex items-center gap-4 hover:border-primary/50 transition-all text-left group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xxs text-text-muted font-bold uppercase">Instagram</span>
                  <div className="text-sm font-bold text-white mt-0.5">@rojin370</div>
                </div>
              </a>
            </div>

            <div className="lg:col-span-7 glass-panel rounded-3xl p-6 md:p-8">
              <AnimatePresence>
                {contactSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mb-4 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Message sent! I&apos;ll get back to you soon.
                  </motion.div>
                )}
              </AnimatePresence>
              <form onSubmit={handleContactSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div>
                  <label htmlFor="contact-name-input" className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-1.5">Your Name</label>
                  <input
                    type="text"
                    id="contact-name-input"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-2.5 text-base lg:text-sm text-white focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email-input" className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-1.5">Your Email</label>
                  <input
                    type="email"
                    id="contact-email-input"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-2.5 text-base lg:text-sm text-white focus:outline-none transition-all"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-message-input" className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-1.5">Message</label>
                  <textarea
                    id="contact-message-input"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell me about your mobile or web project requirements..."
                    required
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-2.5 text-base lg:text-sm text-white focus:outline-none transition-all resize-none"
                  />
                </div>
                <div className="sm:col-span-2 mt-2">
                  <button
                    type="submit"
                    disabled={isContactSubmitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-bg-primary font-bold text-xs hover:bg-white/95 transition-colors shadow-lg flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-60"
                  >
                    {isContactSubmitting ? "Sending..." : "Send Message"} <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING BACK TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            id="scrollToTopBtn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-white text-bg-primary shadow-lg flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all border border-white/25 pointer-events-auto cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="container max-w-6xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-xs text-text-muted font-medium">
            &copy; {new Date().getFullYear()} Rojin Roy. All rights reserved.
          </span>
          <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-xs text-text-muted">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#guestbook" className="hover:text-white transition-colors">Guestbook</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl select-none"
            onClick={() => setLightboxImages(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxImages(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all z-[110] cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Lightbox navigation */}
            {lightboxImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all z-[110] cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all z-[110] cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Active Image container with zoom in/out entry animations */}
            <div className="flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                style={{ width: "min(90vw, calc(85vh * 16 / 9))", height: "min(85vh, calc(90vw * 9 / 16))" }}
              >
                <NextImage
                  src={`/${lightboxImages[lightboxIndex]}`}
                  alt="Enlarged screenshot"
                  fill
                  quality={100}
                  sizes="100vw"
                  className="object-contain"
                  unoptimized={false}
                  priority
                />
              </motion.div>

              {/* Caption / Image count */}
              {lightboxImages.length > 1 && (
                <div className="text-xs font-semibold text-text-muted bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  {lightboxIndex + 1} / {lightboxImages.length}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
