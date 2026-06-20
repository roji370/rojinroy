"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Send, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2
} from "lucide-react";

// Local SVG component for Github icon missing in installed lucide-react package version
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
import moment from "moment";
import BackgroundGlow from "@/components/BackgroundGlow";

interface CommentData {
  _id?: string;
  username: string;
  comment: string;
  createdAt?: string;
}

const projectImages = [
  "/assets/project-1.png",
  "/assets/project-1-2.png",
  "/assets/project-1-3.png",
  "/assets/project-1-4.png",
];

export default function Project1() {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

  // Image slider state
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const target = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      sliderRef.current.scrollTo({ left: target, behavior: 'smooth' });
    }
  };

  const handleSliderScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      if (clientWidth > 0) {
        const idx = Math.round(scrollLeft / clientWidth);
        if (idx !== activeSlide && idx >= 0 && idx < projectImages.length) {
          setActiveSlide(idx);
        }
      }
    }
  };

  // Keyboard listener for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      else if (e.key === "ArrowLeft") setLightboxIndex((p) => (p === 0 ? projectImages.length - 1 : p - 1));
      else if (e.key === "ArrowRight") setLightboxIndex((p) => (p === projectImages.length - 1 ? 0 : p + 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchComments();
  }, []);

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
        await fetchComments();
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <BackgroundGlow />
      
      <main className="min-h-screen py-24 relative">
        <div className="container max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/#projects" className="inline-flex items-center gap-2 text-xs font-bold text-text-muted hover:text-white mb-8 group transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
            </Link>

            <span className="text-xs tracking-widest text-primary font-bold uppercase mb-2 block text-left">Full Stack Web Application</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight text-left">Travollo – Travel Discovery & Booking Platform</h1>

            <div className="flex gap-2 mb-12 flex-wrap justify-start">
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Next.js</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">TypeScript</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Tailwind CSS</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Node.js</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">MongoDB</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">REST API</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
            {/* Left Column: Description */}
            <motion.div 
              className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold text-white">Project Overview</h3>
              <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                Travollo is a modern travel discovery and trip-planning platform designed to help users explore destinations, compare vacation packages, and plan memorable travel experiences. The application provides an intuitive interface for discovering popular destinations, curated travel packages, and personalized travel recommendations while delivering a seamless booking experience.
              </p>
              <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                Built with a responsive and scalable architecture, Travollo focuses on performance, usability, and modern UI/UX principles to create an engaging travel planning ecosystem.
              </p>
              
              <h3 className="text-lg font-bold text-white mt-4">Key Features</h3>
              <ul className="flex flex-col gap-3 text-xs sm:text-sm text-text-muted list-disc list-inside pl-1">
                <li><strong>Destination Discovery:</strong> Browse and explore trending destinations, vacation spots, and travel experiences worldwide.</li>
                <li><strong>Curated Travel Packages:</strong> View professionally crafted travel itineraries with pricing, duration, and package details.</li>
                <li><strong>Responsive User Experience:</strong> Optimized for desktop, tablet, and mobile devices with smooth navigation.</li>
                <li><strong>Interactive Search & Filtering:</strong> Quickly discover destinations based on user preferences and travel interests.</li>
                <li><strong>Modern Booking Workflow:</strong> Streamlined trip inquiry and booking process for improved user engagement.</li>
                <li><strong>Scalable Architecture:</strong> Built using reusable components and API-driven data management for future expansion.</li>
              </ul>

              <h3 className="text-lg font-bold text-white mt-4">Technical Execution</h3>
              <p className="text-text-muted leading-relaxed text-sm">
                Travollo was developed using <strong>Next.js</strong> and <strong>TypeScript</strong> to provide a performant and scalable frontend architecture. The user interface was designed with <strong>Tailwind CSS</strong>, enabling responsive layouts and consistent styling across devices.
              </p>
              <p className="text-text-muted leading-relaxed text-sm">
                The backend leverages <strong>Node.js</strong> and RESTful APIs for handling application data and business logic, while <strong>MongoDB</strong> provides flexible storage for destinations, packages, and user-related information. The application follows modern component-based development practices, ensuring maintainability, scalability, and optimal performance.
              </p>
            </motion.div>

            {/* Right Column: Spec Card */}
            <motion.div 
              className="lg:col-span-5 flex flex-col gap-6 order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Image Slider */}
              <div className="relative rounded-3xl p-1.5 bg-white/5 border border-white/10 overflow-hidden shadow-xl group/slider">
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  <div
                    ref={sliderRef}
                    onScroll={handleSliderScroll}
                    className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {projectImages.map((img, i) => (
                      <div
                        key={i}
                        className="w-full h-full flex-shrink-0 snap-start relative cursor-zoom-in"
                        onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                      >
                        <NextImage
                          src={img}
                          alt={`Travollo screenshot ${i + 1}`}
                          fill
                          quality={100}
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Nav Arrows */}
                  {activeSlide > 0 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); scrollSlider('left'); }}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover/slider:opacity-100 shadow-md z-20 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  )}
                  {activeSlide < projectImages.length - 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); scrollSlider('right'); }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover/slider:opacity-100 shadow-md z-20 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}

                  {/* Dots */}
                  {projectImages.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/5 pointer-events-none z-20">
                      {projectImages.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === activeSlide ? "bg-white w-3" : "bg-white/40 w-1.5"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Enlarge */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(activeSlide); setLightboxOpen(true); }}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80 border border-white/10 hover:bg-black/80 hover:text-white transition-colors z-20 cursor-pointer"
                    title="Enlarge Image"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Spec specifications */}
              <div className="glass-panel p-6 rounded-3xl">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 pb-2 border-b border-white/5">Project Metrics</h4>
                <table className="w-full text-xs sm:text-sm">
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Project Timeline</td>
                      <td className="py-2.5 text-white font-semibold text-right">Personal Project</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">UI Components</td>
                      <td className="py-2.5 text-white font-semibold text-right">20+ Reusable</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Lighthouse Score</td>
                      <td className="py-2.5 text-emerald-500 font-bold text-right">&gt;90</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Responsiveness</td>
                      <td className="py-2.5 text-white font-semibold text-right">100% Mobile-First</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Optimization</td>
                      <td className="py-2.5 text-white font-semibold text-right">SEO Optimized</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Architecture</td>
                      <td className="py-2.5 text-white font-semibold text-right">API-Driven</td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-6 flex flex-col gap-2">
                  <a href="https://travollo.netlify.app" target="_blank" className="w-full py-2.5 rounded-xl font-bold text-xs inline-flex items-center justify-center gap-1.5 bg-white text-bg-primary hover:bg-white/95 transition-all shadow-md">
                    Visit Live Website
                  </a>
                  <a href="https://github.com/roji370/travolo.git" target="_blank" className="w-full glass-button py-2.5 rounded-xl font-bold text-xs inline-flex items-center justify-center gap-1.5 text-white">
                    <Github className="w-4 h-4" /> View GitHub Repository
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project-Specific Comments widget */}
          <div className="mt-20 pt-16 border-t border-white/5">
            <div className="flex flex-col items-center text-center mb-10">
              <span className="text-xs tracking-widest text-primary font-bold uppercase mb-2">Feedback Loop</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Project Feedback</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
              <div className="lg:col-span-5 glass-panel rounded-3xl p-6">
                <h3 className="text-lg font-bold text-white mb-1">Leave a Comment</h3>
                <p className="text-xs text-text-muted mb-6">Have questions or review suggestions? Send a live note.</p>

                <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="p1-username" className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-1.5">Your Name</label>
                    <input
                      type="text"
                      id="p1-username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. Jane Doe"
                      required
                      className="w-full bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-2.5 text-base lg:text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="p1-comment" className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-1.5">Message</label>
                    <textarea
                      id="p1-comment"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write your feedback..."
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

              <div className="lg:col-span-7 flex flex-col gap-4 max-h-none lg:max-h-[380px] overflow-y-visible lg:overflow-y-auto pr-2">
                <AnimatePresence mode="popLayout">
                  {isCommentsLoading && comments.length === 0 ? (
                    <div className="text-center py-12 text-text-muted text-xs">Loading guestbook comments...</div>
                  ) : comments.length === 0 ? (
                    <div className="glass-panel p-8 text-center text-text-muted text-xs rounded-2xl font-medium">No comments yet. Be the first to leave one!</div>
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
                          className="glass-panel p-4 rounded-2xl flex flex-col gap-2 hover:border-white/15 transition-all"
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
        </div>
      </main>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl select-none"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all z-[110] cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Nav */}
            {projectImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((p) => (p === 0 ? projectImages.length - 1 : p - 1));
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all z-[110] cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((p) => (p === projectImages.length - 1 ? 0 : p + 1));
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all z-[110] cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={projectImages[lightboxIndex]}
                alt="Enlarged screenshot"
                className="max-w-full max-h-[80vh] object-contain rounded-xl border border-white/10 shadow-2xl"
              />

              {projectImages.length > 1 && (
                <div className="text-xs font-semibold text-text-muted bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  {lightboxIndex + 1} / {projectImages.length}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
