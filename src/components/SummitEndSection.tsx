import React, { useState, useEffect } from "react";
import { 
  Heart, 
  MessageSquare, 
  Send, 
  Check, 
  ChevronDown, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  User,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TestimonialMessage {
  id: string;
  name: string;
  avatar: string;
  bgClass: string;
  time: string;
  message: string;
  hearts?: number;
  edited?: boolean;
  replies?: TestimonialMessage[];
  link?: string;
  tag?: string;
}

const initialTestimonials: TestimonialMessage[] = [
  // COLUMN 1
  {
    id: "t1",
    name: "V",
    avatar: "V",
    bgClass: "bg-amber-500 text-white",
    time: "8:25 PM",
    message: "I agree Natasha. In the very near future. A Millionaire will be every 4 persons you know.",
    hearts: 2,
    replies: [
      {
        id: "t1_r1",
        name: "Natasha Williams",
        avatar: "NW",
        bgClass: "bg-pink-600 text-white",
        time: "8:26 PM",
        message: "Let's gooo V! We missed the internet revolution so we can't miss the AI revolution. This is our time!"
      }
    ]
  },
  {
    id: "t2",
    name: "Phyllis Jones",
    avatar: "PJ",
    bgClass: "bg-indigo-600 text-white",
    time: "1:02 PM",
    message: "Definitely. Justin, you always over deliver."
  },
  {
    id: "t3",
    name: "Shevelle McPherson",
    avatar: "SM",
    bgClass: "bg-purple-600 text-white",
    time: "1:02 PM",
    message: "Lots of value. Leaving with an idea"
  },
  {
    id: "t4",
    name: "Dana Thompson",
    avatar: "DT",
    bgClass: "bg-teal-600 text-white",
    time: "1:02 PM",
    edited: true,
    message: "Ready to build my APP as a result of this Summit! Thanks GOAT Justin!"
  },
  {
    id: "t5",
    name: "Sonya Morris Dunston",
    avatar: "SD",
    bgClass: "bg-emerald-600 text-white",
    time: "1:05 PM",
    message: "Justin,\nI am leaving better than I was when I came."
  },

  // COLUMN 2
  {
    id: "t6",
    name: "Lynn Fournier",
    avatar: "LF",
    bgClass: "bg-indigo-500 text-white",
    time: "1:07 PM",
    message: "Thank you both Justin and Michael for all the time you have dedicated to us for the last two days. My excitement lever-lis soaring and I have so many ideas on what I can do! This has been an amazing experience and I look forward to many more."
  },
  {
    id: "t7",
    name: "Hui & Regina",
    avatar: "HR",
    bgClass: "bg-pink-500 text-white",
    time: "12:12 PM",
    message: "This is so helpful, needed and extremely good to grow our business"
  },
  {
    id: "t8",
    name: "14 - LaChelle Jackson - VIP",
    avatar: "1-",
    bgClass: "bg-teal-500 text-white font-mono",
    time: "2:45 PM",
    message: "This has been amazing!!! ❤️❤️❤️",
    hearts: 5
  },
  {
    id: "t9",
    name: "Vivian Benn",
    avatar: "VB",
    bgClass: "bg-blue-600 text-white",
    time: "10:07 AM",
    message: "Yes the biggest take away was the knowledge of Justin sharing all this knowledge!"
  },
  {
    id: "t10",
    name: "Hope",
    avatar: "H",
    bgClass: "bg-slate-700 text-white",
    time: "10:15 AM",
    message: "Justin brings so many puzzle pieces together in an unique way. \"Basics\" build with JB is a completely new game"
  },

  // COLUMN 3
  {
    id: "t11",
    name: "Teri",
    avatar: "T",
    bgClass: "bg-rose-500 text-white",
    time: "1:23 PM",
    message: "I was already inspired. I understand what it takes. It's great that she was able to understand the value in building an app."
  },
  {
    id: "t12",
    name: "Allan Pettit",
    avatar: "AP",
    bgClass: "bg-amber-600 text-white",
    time: "2:38 PM",
    link: "legacyblueprintnow.com",
    tag: "Reply",
    message: "this summit is like drinking from a fire hose in the best possible way.. or a buffet that is so big it stretches like 10 city blocks long. I LOVE IT!! More.. More.. More... I hungry!"
  },
  {
    id: "t13",
    name: "Gary Banks",
    avatar: "GB",
    bgClass: "bg-indigo-950 text-white outline outline-1 outline-blue-400",
    time: "3:03 PM",
    message: "Shoutout to Justin and the entire team. The last summit was a real turning point for us. What we gained wasn't just information - it was clarity, structure, and the confidence to execute.\n\nBecause of that experience, we officially launched Grantswipe.com\n\nWhat was once vision and strategy conversations is now live and moving. Grateful for the room, the push, and the leadership that helped us make it real. 🔥",
    hearts: 8
  },
  {
    id: "t14",
    name: "Osman Walker",
    avatar: "OW",
    bgClass: "bg-blue-600 text-white",
    time: "1:07 PM",
    message: "This is the roadmap that I needed. Been burnt on so many other programs. This is the best Blueprint that I have seen. Thank you, Justin. Happy Holidays!"
  },
  {
    id: "t15",
    name: "Cherry Hart2Help Fortenberry",
    avatar: "CH",
    bgClass: "bg-emerald-500 text-white",
    time: "12:40 PM",
    message: "Honestly it's PRICELESS! Having a new found family and the APP."
  },

  // COLUMN 4 ACCORDING TO SCREENSHOT 3
  {
    id: "t16",
    name: "Artia Hawkins",
    avatar: "AH",
    bgClass: "bg-orange-500 text-white",
    time: "2:24 PM",
    message: "I made the right decision joining. That's been my biggest issue with everything I create in Lovable 😩"
  },
  {
    id: "t17",
    name: "Monica Stith",
    avatar: "MS",
    bgClass: "bg-purple-500 text-white",
    time: "12:51 PM",
    message: "Definitely. This is the first time that I don't feel as afraid as I did before! Ready to push forward as God has blessed me with this opportunity to see you today! Needed this!"
  },
  {
    id: "t18",
    name: "Helen Igomu Kussiy",
    avatar: "HK",
    bgClass: "bg-stone-700 text-white",
    time: "4:12 PM",
    message: "I've attended many summits over the years. Usually, when the speaker starts with long stories before getting into the \"how-to,\" I'm quietly thinking, please just get to it already.\n\nBut this was different.\n\nFor the first time ever, I didn't want him to stop talking. Every word before the \"main content\" felt intentional, layered, and necessary. It didn't feel like filler — it felt like foundation."
  },
  {
    id: "t19",
    name: "Tracy Brock-Islam",
    avatar: "TB",
    bgClass: "bg-rose-600 text-white",
    time: "9:44 PM",
    message: "I signed at midnight up and went in today and the resources are wild, I already feel like I am winning this portal is phenomenal ❤️"
  }
];

interface FAQItem {
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    question: "Do I Need A Fully Formed App Idea Before I Join?",
    answer: "Absolutely not! In fact, many our most successful graduates started completely blank. During the Day 1 masterclass, we provide step-by-step workbook blueprints and live brainstorming frameworks to instantly extract high-demand microsaas opportunities out of your standard daily routines."
  },
  {
    question: "Do I Need Any Coding Or Technical Skills?",
    answer: "No previous experience required whatsoever. If you are capable of typing a message on social platforms or making a simple presentation slide, you possess 100% of the building capability. We utilize natural, conversational language prompting interfaces to formulate the code architecture live on screen."
  },
  {
    question: "How Advanced Do I Need To Be With AI?",
    answer: "Whether you use customized prompts daily or have never loaded an AI interface in your entire life, the structured step-by-step layout assumes starting from complete ground-level. We build up clearly from basic inputs to advanced API connectors so no registrant is left behind."
  },
  {
    question: "Will This Help If I'm Just Getting Started As A Coach Or Consultant?",
    answer: "Yes, heavily! In 2026, the ultimate way to stand out from generic competitors and secure high-paying enterprise clients is delivering custom digital toolkits, diagnostic calculators, or automated client dashboards that offer immediate, tangible interactive value."
  },
  {
    question: "Do I Need A Specific Tech Stack?",
    answer: "No custom hardware or technical stack is required. Everything we demonstrate runs smoothly on basic server networks directly through single browser tabs. We even cover zero-cost edge servers and rapid hosting platforms to publish your prototype with one click."
  },
  {
    question: "What If I Already Have An App?",
    answer: "This is the perfect catalyst to escalate your existing system interface. We will show you exactly how to safely introduce intelligent visual charts, plug-in server-side Gemini API prompt filters to deliver content summarization, and refactor code paths to dramatically decrease upkeep costs."
  }
];

export function SummitEndSection() {
  const [comments, setComments] = useState<TestimonialMessage[]>(initialTestimonials);
  const [userName, setUserName] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Time stamp state for real-time initiating sequence
  const [secondsLeft, setSecondsLeft] = useState(3);
  const [isConferenceReady, setIsConferenceReady] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsConferenceReady(true);
      return;
    }
    const timer = setTimeout(() => {
      setSecondsLeft((s) => s - 1);
    }, 1200);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  // Handle registration scroll
  const handleScrollToRegister = () => {
    const section = document.getElementById("register-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle mock testimonial submit
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userMsg.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      const newComment: TestimonialMessage = {
        id: `user_${Date.now()}`,
        name: userName.trim(),
        avatar: userName.trim().substring(0, 2).toUpperCase(),
        bgClass: "bg-purple-600 text-white",
        time: "Just Now",
        message: userMsg.trim(),
        hearts: 1
      };

      setComments((prev) => [newComment, ...prev]);
      setUserName("");
      setUserMsg("");
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 800);
  };

  const toggleHeart = (id: string, currentHeartsVal: number = 0) => {
    if (likedIds.includes(id)) {
      setLikedIds((prev) => prev.filter((i) => i !== id));
      setComments((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, hearts: Math.max(0, currentHeartsVal - 1) } : c
        )
      );
    } else {
      setLikedIds((prev) => [...prev, id]);
      setComments((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, hearts: currentHeartsVal + 1 } : c
        )
      );
    }
  };

  return (
    <div id="summit-testimonials-faq" className="w-full relative bg-slate-50 text-slate-900 border-t border-slate-200">
      
      {/* BACKGROUND MESH POINT PATTERN */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.35]" style={{
        backgroundImage: "radial-gradient(#1e293b 1px, transparent 1.2px)",
        backgroundSize: "24px 24px"
      }} />

      {/* Decorative colored glow fields */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-purple-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-60 left-0 w-[450px] h-[450px] bg-amber-100/40 rounded-full blur-[130px] pointer-events-none" />

      {/* 1. SOCIAL BRANDING PARAGRAPH & CTAs */}
      <div className="w-full max-w-5xl mx-auto px-6 pt-16 sm:pt-24 pb-8 relative z-10 text-center">
        
        {/* Bold Statement */}
        <h3 className="text-xl sm:text-2xl font-sans font-medium text-slate-800 leading-relaxed max-w-4xl mx-auto tracking-tight">
          You'll also <span className="text-purple-600 font-extrabold px-1 relative inline-block">have the confidence</span> of seeing exactly how other founders <span className="font-extrabold text-slate-950 underline decoration-purple-600 decoration-3">are doing this right now</span> not in theory, but in the real world.
        </h3>

        {/* GLORIOUS ACCENT GRADIENT REGISTRATION BUTTON 1 */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleScrollToRegister}
            className="group relative w-full max-w-2xl px-6 sm:px-10 py-5 sm:py-6 rounded-full font-display font-black text-[13px] sm:text-[17px] tracking-wider text-white uppercase shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-95 overflow-hidden border border-white/20"
            style={{
              background: "linear-gradient(135deg, #4f46e5 0%, #a855f7 35%, #ec4899 70%, #f59e0b 100%)",
            }}
          >
            {/* Glossy shine element */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/15 -skew-x-[30deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-[1200ms] ease-out-expo" />
            
            <span className="flex items-center justify-center gap-2 relative z-10">
              JOIN THE 3-DAY LIVE SUMMIT (IT'S FREE)
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </button>
          
          <span className="text-xs font-mono font-black text-slate-500 tracking-wide uppercase">
            IT'S FREE! AND TAKES 2 MINUTES TO SIGN UP!
          </span>
        </div>

        {/* 2. EVENT STARTS STATUS */}
        <div className="mt-20 flex flex-col items-center">
          <span className="text-[12px] sm:text-[13px] font-mono font-black text-slate-400 tracking-[0.3em] uppercase block">
            EVENT STARTS IN
          </span>

          <div className="mt-4 px-6 py-3 rounded-2xl bg-indigo-950/5 border border-indigo-200/40 shadow-inner flex items-center justify-center min-w-[280px]">
            {!isConferenceReady ? (
              <div className="flex items-center gap-2 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-ping" />
                <span className="text-purple-600 font-black tracking-widest text-[13px] sm:text-[14px]">
                  INITIATING TELEMETRY: {secondsLeft}S
                </span>
              </div>
            ) : (
              <motion.span 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[14px] sm:text-[16px] font-mono font-black tracking-[0.45em] text-indigo-600 uppercase flex items-center gap-2 select-none animate-pulse"
                style={{
                  textShadow: "0 0 10px rgba(79, 70, 229, 0.15)"
                }}
              >
                INITIATING CONFERENCE
              </motion.span>
            )}
          </div>
        </div>

      </div>

      {/* 3. INTERACTIVE CHAT COMMENTS WALL */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-20 relative z-10">
        
        {/* Soft Pink Border Accent Container Grid Frame */}
        <div className="p-1 sm:p-2 rounded-[32px] bg-gradient-to-tr from-pink-400/20 via-purple-300/10 to-indigo-400/20 border border-purple-200/40 shadow-xl">
          
          <div className="bg-slate-100/50 backdrop-blur-sm rounded-[24px] p-4 sm:p-8">
            
            {/* Header tag */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/60">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
                <span className="text-sm font-sans font-bold text-slate-700">
                  Registrant Broadcast Chat Feed <span className="text-pink-600 font-black">({comments.length} entries)</span>
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 font-extrabold uppercase bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-sm flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                Secured VIP Logs
              </span>
            </div>

            {/* MASONRY COMMENT COLUMNS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* INTERACTIVE MSG SUBMISSION PANEL inside first slot optionally */}
              <div className="bg-white border-2 border-dashed border-purple-300 rounded-[20px] p-5 flex flex-col justify-between shadow-md group hover:border-purple-500 transition-all">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                      <Sparkles className="w-4 h-4 animate-spin-slow" />
                    </div>
                    <span className="font-display font-black text-xs text-slate-800 uppercase tracking-wider">
                      Add Your Live Comment
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    Simulate sending a real comment live on the prototype board. It will append immediately to the top of the stream.
                  </p>

                  <form onSubmit={handleAddComment} className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Your First & Last Name..."
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 text-slate-900 font-bold placeholder-slate-400"
                      maxLength={32}
                    />
                    <textarea 
                      placeholder="Type your feedback message..."
                      rows={3}
                      value={userMsg}
                      onChange={(e) => setUserMsg(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/30 text-slate-900 font-medium placeholder-slate-400 resize-none"
                      maxLength={180}
                    />

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-mono font-black text-[11px] uppercase tracking-wider hover:bg-purple-500 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-950/10"
                    >
                      {submitting ? (
                        <span>TRANSMITTING...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-white" />
                          <span>SEND COMMENT REEL</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <AnimatePresence>
                  {success && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3.5 flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-200/55 p-2 rounded-xl text-[11px] font-bold"
                    >
                      <Check className="w-4 h-4 flex-shrink-0" />
                      <span>Transmitted perfectly to live reel pool!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* RENDER DYNAMIC TESTIMONIALS LIST FLUIDLY */}
              {comments.map((testimonial) => {
                const isLiked = likedIds.includes(testimonial.id);
                return (
                  <div 
                    key={testimonial.id}
                    className="bg-white border border-slate-200/80 rounded-[20px] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    
                    <div className="space-y-3.5">
                      {/* Comment Header info */}
                      <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-2.5">
                        <div className="flex items-center gap-3">
                          {/* Circle Avatar badge */}
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-sans font-black tracking-tight select-none ${testimonial.bgClass}`}>
                            {testimonial.avatar}
                          </div>
                          
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <span className="font-display font-black text-slate-900 text-[13px] tracking-tight leading-none">
                                {testimonial.name}
                              </span>
                              {testimonial.tag && (
                                <span className="text-[9px] bg-amber-500/10 text-amber-600 font-mono font-black uppercase px-1.5 py-0.5 rounded">
                                  {testimonial.tag}
                                </span>
                              )}
                            </div>
                            
                            <span className="text-[10px] text-slate-400 font-sans font-bold leading-none mt-1">
                              {testimonial.time}
                            </span>
                          </div>
                        </div>

                        {/* Interactive heart button */}
                        <button
                          type="button"
                          onClick={() => toggleHeart(testimonial.id, testimonial.hearts)}
                          className={`p-1.5 rounded-lg border flex items-center gap-1.5 transition-all outline-none ${
                            isLiked 
                              ? "bg-rose-50 border-rose-200 text-rose-500 scale-105" 
                              : "bg-slate-50 border-transparent text-slate-400 hover:text-rose-400"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500" : ""}`} />
                          {testimonial.hearts && testimonial.hearts > 0 ? (
                            <span className="text-[10px] font-mono font-black">{testimonial.hearts}</span>
                          ) : null}
                        </button>
                      </div>

                      {/* Comment Message text */}
                      <p className="text-xs text-slate-700 font-semibold leading-relaxed whitespace-pre-line pl-1">
                        {testimonial.message}
                      </p>

                      {/* Custom external link state if any */}
                      {testimonial.link && (
                        <div className="pt-1.5 pl-1">
                          <a 
                            href={`https://${testimonial.link}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[10px] font-mono font-extrabold text-indigo-600 hover:underline bg-indigo-50/50 px-2 py-1 rounded"
                          >
                            <ExternalLink className="w-3 h-3 text-indigo-500" />
                            {testimonial.link}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* NESTED REPLIES RENDERING (LIKE IN SCREENSHOT) */}
                    {testimonial.replies && testimonial.replies.map((reply) => (
                      <div 
                        key={reply.id} 
                        className="mt-4 pt-3.5 border-t border-slate-100 bg-slate-50/80 p-3 rounded-xl border border-slate-100 space-y-2 ml-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-pink-600 text-white flex items-center justify-center text-[10px] font-sans font-black">
                              {reply.avatar}
                            </div>
                            <span className="font-display font-black text-slate-950 text-xs tracking-tight">
                              {reply.name}
                            </span>
                          </div>
                          <span className="text-[9px] text-slate-400 font-mono font-bold">
                            {reply.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium pl-1 leading-normal">
                          {reply.message}
                        </p>
                      </div>
                    ))}

                  </div>
                );
              })}

            </div>

          </div>
        </div>

      </div>

      {/* 4. THE FAQ ACCORDION TIMELINE */}
      <section className="w-full py-20 bg-slate-100 border-t border-slate-200 relative overflow-hidden">
        
        {/* Subtle grid pattern for FAQ segment */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />

        <div className="w-full max-w-5xl mx-auto px-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
            
            {/* Left FAQ Intro Card Column */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono font-black text-purple-600 tracking-widest uppercase">
                STILL UNSURE?
              </span>
              <h3 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-none uppercase">
                FAQ
              </h3>
              <p className="text-sm text-slate-500 font-bold leading-relaxed max-w-md pt-2">
                Still on the fence? Here are the most common questions people ask before registering for our 3-Day Summit.
              </p>
              
              <div className="pt-6 border-t border-slate-200/80 max-w-sm space-y-4">
                <div className="flex items-start gap-3 text-xs font-bold text-slate-600">
                  <ShieldCheck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>100% Free Virtual Ticket. Zero hidden credit card charges or recurring subscriptions.</span>
                </div>
                <div className="flex items-start gap-3 text-xs font-bold text-slate-600">
                  <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Interactive Workbook download available immediately inside secure VIP logs.</span>
                </div>
              </div>
            </div>

            {/* Right Accordion List Column */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 md:p-6 shadow-xl space-y-4">
              {faqList.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen 
                        ? "bg-slate-50/70 border-indigo-500/30" 
                        : "bg-white border-slate-100 hover:bg-slate-50 cursor-pointer"
                    }`}
                    onClick={() => {
                      setActiveFaq(isOpen ? null : idx);
                    }}
                  >
                    {/* Header trigger */}
                    <button
                      type="button"
                      className="w-full p-4 md:p-5 flex items-center justify-between gap-4 text-left font-sans select-none focus:outline-none"
                    >
                      <span className="font-display font-black text-slate-950 text-xs sm:text-[14px] uppercase tracking-tight leading-tight">
                        {faq.question}
                      </span>
                      
                      <div className={`p-1.5 rounded-lg flex-shrink-0 transition-transform ${
                        isOpen ? "bg-indigo-50 border border-indigo-100 text-indigo-600 rotate-180" : "bg-slate-100 text-slate-400"
                      }`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Collapsible Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-5 pb-5 pt-1 text-xs text-slate-500 font-semibold leading-relaxed border-t border-slate-100">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 5. THE FINAL GRADIENT CTA SECTION */}
      <div className="w-full relative py-20 px-6 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-4">
            <span className="text-[11px] font-mono font-black text-purple-600 tracking-[0.2em] uppercase">
              LAST CHANCE PASS REGISTRATION
            </span>
            <h4 className="font-display font-black text-2xl sm:text-4xl text-slate-950 uppercase tracking-tight leading-none">
              TAKE ACTION TODAY AND MASTER AUTOMATED APPBUILDING
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 font-bold max-w-2xl mx-auto">
              Our May 2026 broadcast lines are strictly bound by video streaming bandwidth protocols. Ensure you register your seat code right now to guarantee pass clearance.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleScrollToRegister}
              className="group relative w-full max-w-xl px-6 sm:px-8 py-5 rounded-full font-display font-black text-[12px] sm:text-[15px] tracking-wider text-white uppercase shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-95 overflow-hidden border border-white/20"
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #a855f7 35%, #ec4899 70%, #f59e0b 100%)",
              }}
            >
              <div className="absolute inset-0 w-1/2 h-full bg-white/10 -skew-x-[30deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-[1200ms] ease-out-expo" />
              <span className="flex items-center justify-center gap-2 relative z-10">
                JOIN THE 3-DAY LIVE SUMMIT (IT'S FREE)
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <span className="text-[10px] font-mono font-extrabold text-slate-400 uppercase tracking-widest">
              IT'S FREE! AND TAKES 2 MINUTES TO SIGN UP!
            </span>
          </div>
        </div>
      </div>

      {/* 6. COMPLETE REPLICATED BRANDING FOOTER */}
      <footer className="w-full relative bg-slate-950 border-t border-slate-900 text-slate-400 py-16 px-6 z-10 font-sans">
        
        {/* Soft background grid on dark footer */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
          backgroundImage: "radial-gradient(#ffffff 0.8px, transparent 1px)",
          backgroundSize: "32px 32px"
        }} />

        <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center space-y-8">
          
          {/* Replicated logo and typography from header */}
          <div className="flex flex-col items-center gap-3 select-none">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center font-black text-slate-950 tracking-tighter">
                AI
              </div>
              <span className="font-display font-black tracking-tighter text-white text-lg sm:text-xl block uppercase">
                AI Founder Hub
              </span>
            </div>
            <span className="text-xs font-mono tracking-widest text-amber-500/90 block uppercase font-extrabold text-center">
              The place where founders build with AI.
            </span>
          </div>

          <div className="text-center space-y-2">
            <p className="text-xs font-semibold text-slate-300">
              Copyright 2026. AIFounderHub. All Rights Reserved.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-bold text-slate-400">
              <button 
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("trigger-modal", { detail: "privacy" }));
                }}
                className="hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </button>
              <span className="text-slate-700">|</span>
              <button 
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("trigger-modal", { detail: "terms" }));
                }}
                className="hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </button>
              <span className="text-slate-700">|</span>
              <a href="mailto:support@aifounderhub.com" className="hover:text-purple-400 transition-colors">
                Contact
              </a>
            </div>

            <p className="text-[11px] font-mono text-indigo-400 select-all hover:underline pt-1">
              https://support.aifounderhub.com
            </p>
          </div>

          {/* REAL LEGAL EDUCATIONAL DISCLAIMER FROM SCREENSHOT */}
          <div className="max-w-4xl border-t border-slate-900 pt-8 text-center text-[10px] text-slate-500 font-medium leading-relaxed uppercase tracking-wider">
            Disclaimer: This is a free educational event. Results mentioned are not typical and your results may vary. Building a successful app requires effort, dedication, and the application of the strategies taught. This training is designed to show you what's possible with AI-powered app development, but success depends on individual implementation and market conditions.
          </div>

        </div>

      </footer>

    </div>
  );
}
