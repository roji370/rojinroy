"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Layers, 
  Code, 
  Sparkles, 
  Send, 
  Calendar,
  Smartphone,
  BookOpen
} from "lucide-react";
import moment from "moment";
import BackgroundGlow from "@/components/BackgroundGlow";

interface CommentData {
  _id?: string;
  username: string;
  comment: string;
  createdAt?: string;
}

export default function Project5() {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

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
            <a href="/#projects" className="inline-flex items-center gap-2 text-xs font-bold text-text-muted hover:text-white mb-8 group transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
            </a>

            <span className="text-xs tracking-widest text-primary font-bold uppercase mb-2 block text-left">Admin Console & CMS</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight text-left">Briffini Admin Portal</h1>

            <div className="flex gap-2 mb-12 flex-wrap justify-start">
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">React</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Vite</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">TypeScript</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Material-UI (MUI)</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Firebase</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Cloud Functions</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">FCM</span>
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
                Briffini Admin Portal (<code>adminbriffini</code>) is a modern, high-performance administrative platform designed to centralize and secure the educational operations of the academy. It serves as the primary control center for course creators, educators, and administrators to deliver digital learning content, handle student communications, and manage subscription access.
              </p>
              <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                The platform provides a secure environment focused on student management, real-time messaging, and content protection. It acts as the backend administrative engine for the Briffini Student App, ensuring seamless content distribution, administrative oversight, and anti-piracy enforcement to protect intellectual property.
              </p>
              
              <h3 className="text-lg font-bold text-white mt-4">Key Features</h3>
              <ul className="flex flex-col gap-3 text-xs sm:text-sm text-text-muted list-disc list-inside pl-1">
                <li><strong>Course & Module CMS:</strong> Structure educational programs into dynamic courses, modules, and lessons, and configure ordering using a drag-and-drop interface (<code>@dnd-kit</code>).</li>
                <li><strong>Student Profile Directory:</strong> View, search, and filter student profiles by status (Complete, Incomplete, Not Started), tracking mobile numbers, joining dates, exam countdowns, and subscription periods.</li>
                <li><strong>One-Time View Protection:</strong> Control access to premium video lectures by enabling a &quot;One-Time View&quot; restriction that limits student playback to a single viewing, with capabilities to toggle back to Multi-View and reset access records.</li>
                <li><strong>Real-Time Interactive Chat:</strong> Engage directly with students via a built-in messaging interface supported by Firestore listeners for instant support and communication.</li>
                <li><strong>FCM Push Notifications:</strong> Broadcast notifications or trigger automated push notifications to students&apos; mobile devices (iOS/Android) with deep links and delivery tracking.</li>
                <li><strong>Subscription & Access Control:</strong> Manage student subscriptions, access expiration, and plan tiers, complete with analytics dashboards to track key performance indicators.</li>
                <li><strong>Anti-Piracy & Device Restrictions:</strong> Prevent account sharing and unauthorized access by binding student logins to registered device fingerprints (SHA256 device hashes) with administrator-override options.</li>
                <li><strong>Responsive Layout:</strong> Tailored with Material-UI (MUI) for optimal responsiveness, allowing administrators to manage operations on desktop, tablet, and mobile devices.</li>
              </ul>

              <h3 className="text-lg font-bold text-white mt-4">Technical Execution</h3>
              <p className="text-text-muted leading-relaxed text-sm">
                Briffini Admin Portal was developed using React, TypeScript, and Vite, leveraging Material-UI (MUI) to create a premium, clean, and highly usable interface. By implementing a reactive data model backed by Firebase Firestore and Firebase Cloud Functions, the system handles real-time updates, security validations, and heavy operations (such as batch-deleting student view records) efficiently.
              </p>
              <p className="text-text-muted leading-relaxed text-sm">
                Performance is optimized through virtualized list rendering (using <code>react-window</code> and <code>react-virtuoso</code>) to support fast scrolling through thousands of student records and chat messages. Security rules are strictly enforced at the database level, ensuring that only authenticated administrators can mutate core course data, reset device fingerprints, or manage billing subscriptions.
              </p>
            </motion.div>

            {/* Right Column: Spec Card */}
            <motion.div 
              className="lg:col-span-5 flex flex-col gap-6 order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Image box mockup */}
              <div className="relative rounded-3xl p-1.5 bg-white/5 border border-white/10 overflow-hidden shadow-xl aspect-video">
                <img src="assets/project-5.png" alt="Briffini Admin Portal System" className="w-full h-full object-cover rounded-2xl" />
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
                      <td className="py-2.5 text-text-muted">Admin Pages/Routes</td>
                      <td className="py-2.5 text-white font-semibold text-right">20+ Responsive Interfaces</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Communications</td>
                      <td className="py-2.5 text-white font-semibold text-right">Interactive Real-Time Chat</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Push Notifications</td>
                      <td className="py-2.5 text-white font-semibold text-right">FCM with Deep Linking</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Content Security</td>
                      <td className="py-2.5 text-white font-semibold text-right">Device Lock & Fingerprinting</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Performance</td>
                      <td className="py-2.5 text-white font-semibold text-right">Virtualized Long-Lists</td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-6 flex flex-col gap-2">
                  <span className="w-full py-2.5 rounded-xl font-bold text-xs inline-flex items-center justify-center gap-1.5 bg-white/5 border border-white/5 text-text-muted select-none cursor-not-allowed">
                    Private Administrative System
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
                    <label htmlFor="p5-username" className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-1.5">Your Name</label>
                    <input
                      type="text"
                      id="p5-username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. Jane Doe"
                      required
                      className="w-full bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-2.5 text-base lg:text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="p5-comment" className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-1.5">Message</label>
                    <textarea
                      id="p5-comment"
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
    </>
  );
}
