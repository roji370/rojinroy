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
import moment from "moment";
import BackgroundGlow from "@/components/BackgroundGlow";

interface CommentData {
  _id?: string;
  username: string;
  comment: string;
  createdAt?: string;
}

const projectImages = [
  "/assets/project-6.png",
  "/assets/project-6-2.png",
];

export default function Project6() {
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

            <span className="text-xs tracking-widest text-primary font-bold uppercase mb-2 block text-left">Mobile Application (iOS & Android)</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight text-left">Briffini Student App</h1>

            <div className="flex gap-2 mb-12 flex-wrap justify-start">
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Flutter</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Dart</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Firebase</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Firestore Sync</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Cloud Functions</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">FCM</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Awesome Notifications</span>
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
                Briffini Student App is a modern, feature-rich mobile learning application designed to provide students with a seamless, interactive, and highly secure educational experience. The app acts as the primary interface for learners to access assigned courses, interact with instructors, and prepare for academic evaluations.
              </p>
              <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                Designed with a heavy focus on content integrity and student accountability, the application integrates advanced anti-piracy mechanisms alongside interactive communication portals. The mobile app synchronizes in real time with the Briffini Admin Portal, ensuring that course assignments, class announcements, and chat supports are immediately available to active students.
              </p>
              
              <h3 className="text-lg font-bold text-white mt-4">Key Features</h3>
              <ul className="flex flex-col gap-3 text-xs sm:text-sm text-text-muted list-disc list-inside pl-1">
                <li><strong>Course & Syllabus Hub:</strong> Access assigned courses, track module progress, and open multi-format content including premium video lectures, PDF notes, and text announcements.</li>
                <li><strong>Learner Presence Verification:</strong> Enforce active learning through a floating, draggable front-camera selfie preview overlay. Video lectures require the camera to be active, automatically pausing playback if the feed is blocked or disabled.</li>
                <li><strong>Screenshot & Recording Protection:</strong> Block screenshots and screen capture utilities natively (using secure window flags on Android/iOS). The system logs violations in Firestore, warns students on the first offense, and locks the account on the second.</li>
                <li><strong>Interactive Support Chat:</strong> Message course administrators directly in a real-time support chat, with support for attachment uploads (images, PDFs, documents) and custom emoji selectors.</li>
                <li><strong>Module Discussion Boards:</strong> Participate in course-specific community forums to collaborate, discuss topics, and review questions with peers and trainers.</li>
                <li><strong>Course Update & &quot;NEW&quot; Badges:</strong> Instantly identify fresh material with granular, item-level notification badges (PDFs, videos, modules) that clear dynamically once viewed.</li>
                <li><strong>Notification & Deep Linking:</strong> Receive instant push notifications (via FCM and APNs) for newly assigned courses or class updates, complete with direct deep links to the lesson screens.</li>
                <li><strong>Offline Persistence & Resilient Storage:</strong> Keep user settings, authentication states, and locally cached course materials safe via secure hardware-backed storage (<code>flutter_secure_storage</code>).</li>
              </ul>

              <h3 className="text-lg font-bold text-white mt-4">Technical Execution</h3>
              <p className="text-text-muted leading-relaxed text-sm">
                Briffini Student App was built using the Flutter SDK (Dart) to deliver a single, high-performance codebase optimized for iOS and Android. State management is orchestrated through the Provider pattern, ensuring reactive UI updates when chat messages arrive, or when video state changes are requested.
              </p>
              <p className="text-text-muted leading-relaxed text-sm">
                The application leverages deep platform integration via Flutter Method Channels to invoke native system guards (such as toggling the iOS/Android secure screens and monitoring native screenshot events). Integration with Firebase (Authentication, Firestore, Cloud Functions, and Cloud Messaging) facilitates reliable data sync, secure user registration, and low-latency push notifications.
              </p>
            </motion.div>

            {/* Right Column: Image Slider + Spec Card */}
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
                          alt={`Briffini Student App screenshot ${i + 1}`}
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
                      <td className="py-2.5 text-text-muted">Development Role</td>
                      <td className="py-2.5 text-white font-semibold text-right">Full Stack Developer</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Target Platforms</td>
                      <td className="py-2.5 text-white font-semibold text-right">Mobile (iOS & Android)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Sync Mechanism</td>
                      <td className="py-2.5 text-white font-semibold text-right">Firestore Real-Time Sync</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Video Capabilities</td>
                      <td className="py-2.5 text-white font-semibold text-right">Better Player with Presence</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Anti-Piracy</td>
                      <td className="py-2.5 text-white font-semibold text-right">Native Screenshot Blocking</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Offline Support</td>
                      <td className="py-2.5 text-white font-semibold text-right">Secure Local Caching</td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-6 flex flex-col gap-2">
                  <span className="w-full py-2.5 rounded-xl font-bold text-xs inline-flex items-center justify-center gap-1.5 bg-white/5 border border-white/5 text-text-muted select-none cursor-default text-center">
                    Published App on App Store (Private Repository)
                  </span>
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
                    <label htmlFor="p6-username" className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-1.5">Your Name</label>
                    <input
                      type="text"
                      id="p6-username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. Jane Doe"
                      required
                      className="w-full bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-2.5 text-base lg:text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="p6-comment" className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-1.5">Message</label>
                    <textarea
                      id="p6-comment"
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
                className="w-full max-h-[80vh] object-contain rounded-xl border border-white/10 shadow-2xl"
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
