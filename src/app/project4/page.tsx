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

// Local SVG component for Github icon missing in installed lucide-react package version
const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Project4() {
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

            <span className="text-xs tracking-widest text-primary font-bold uppercase mb-2 block text-left">E-Commerce Platform</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight text-left">Nebula E-Commerce</h1>

            <div className="flex gap-2 mb-12 flex-wrap justify-start">
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Next.js</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">TypeScript</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Node.js</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">MongoDB</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">REST API</span>
              <span className="text-xxs px-3 py-1 bg-white/5 border border-white/5 rounded-md text-text-muted uppercase font-bold">Tailwind CSS</span>
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
                Nebula E-Commerce is a modern full-stack online shopping platform designed to provide a seamless digital retail experience for customers and administrators. The platform enables users to browse products, manage shopping carts, place orders, and track purchases through an intuitive and responsive interface.
              </p>
              <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                Built with scalability and performance in mind, Nebula E-Commerce combines modern UI/UX principles with robust backend architecture to deliver a secure, fast, and user-friendly shopping experience. The system streamlines product management, inventory organization, and customer interactions while supporting future business growth.
              </p>
              
              <h3 className="text-lg font-bold text-white mt-4">Key Features</h3>
              <ul className="flex flex-col gap-3 text-xs sm:text-sm text-text-muted list-disc list-inside pl-1">
                <li><strong>Product Catalog Management:</strong> Browse and explore products through organized categories and collections.</li>
                <li><strong>Advanced Product Search & Filtering:</strong> Quickly discover products using category, pricing, and keyword-based filtering.</li>
                <li><strong>Shopping Cart System:</strong> Add, update, and manage products before checkout.</li>
                <li><strong>Secure User Authentication:</strong> User registration, login, and account management with protected routes.</li>
                <li><strong>Order Management Workflow:</strong> Track customer orders and purchase history through a centralized system.</li>
                <li><strong>Responsive Shopping Experience:</strong> Optimized for desktop, tablet, and mobile devices.</li>
                <li><strong>Administrative Dashboard:</strong> Manage products, categories, inventory, and customer orders efficiently.</li>
                <li><strong>Scalable API Architecture:</strong> Modular backend services supporting future integrations and feature expansion.</li>
              </ul>

              <h3 className="text-lg font-bold text-white mt-4">Technical Execution</h3>
              <p className="text-text-muted leading-relaxed text-sm">
                Nebula E-Commerce was developed as a full-stack web application utilizing a component-driven frontend architecture and API-based backend services. The platform manages product catalogs, user accounts, shopping carts, and order workflows through a structured and maintainable codebase.
              </p>
              <p className="text-text-muted leading-relaxed text-sm">
                The application implements responsive design principles, optimized data fetching, and scalable database structures to ensure smooth performance across devices. Authentication, product management, and order processing workflows are designed to provide a secure and reliable online shopping experience. Modern e-commerce architectures commonly emphasize performance, scalability, and modularity, which guided the system design.
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
                <img src="assets/project-4.png" alt="Nebula E-Commerce Platform" className="w-full h-full object-cover rounded-2xl" />
              </div>

              {/* Spec specifications */}
              <div className="glass-panel p-6 rounded-3xl">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 pb-2 border-b border-white/5">Project Specifications</h4>
                <table className="w-full text-xs sm:text-sm">
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Development Role</td>
                      <td className="py-2.5 text-white font-semibold text-right">Full Stack Developer</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Product Catalog</td>
                      <td className="py-2.5 text-white font-semibold text-right">Dynamic Inventory</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">User Features</td>
                      <td className="py-2.5 text-white font-semibold text-right">Cart & Orders</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Authentication</td>
                      <td className="py-2.5 text-white font-semibold text-right">Secure Access</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Admin Features</td>
                      <td className="py-2.5 text-white font-semibold text-right">Product Management</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2.5 text-text-muted">Architecture</td>
                      <td className="py-2.5 text-white font-semibold text-right">E-Commerce Platform</td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-6 flex flex-col gap-2">
                  <a href="https://nebulaecom.netlify.app/" target="_blank" className="w-full py-2.5 rounded-xl font-bold text-xs inline-flex items-center justify-center gap-1.5 bg-white text-bg-primary hover:bg-white/95 transition-all shadow-md">
                    Visit Live Website
                  </a>
                  <a href="https://github.com/roji370/nebula.git" target="_blank" className="w-full glass-button py-2.5 rounded-xl font-bold text-xs inline-flex items-center justify-center gap-1.5 text-white">
                    <Github className="w-4 h-4" /> View Source Code
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
                    <label htmlFor="p4-username" className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-1.5">Your Name</label>
                    <input
                      type="text"
                      id="p4-username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. Jane Doe"
                      required
                      className="w-full bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 rounded-xl px-4 py-2.5 text-base lg:text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="p4-comment" className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-1.5">Message</label>
                    <textarea
                      id="p4-comment"
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
