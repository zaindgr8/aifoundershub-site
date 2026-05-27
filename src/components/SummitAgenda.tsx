import React, { useState, useEffect, useRef } from "react";
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Activity, 
  Laptop, 
  Smartphone, 
  Heart, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Speaker image path generated in previous step
const SPEAKER_IMAGE = "/src/assets/images/anik_speaker_1779907871841.png";

interface TimeZoneDiff {
  name: string;
  days: string;
  mainTime: string;
  sundayDays: string;
  sundayTime: string;
}

const zones: TimeZoneDiff[] = [
  {
    name: "Pacific Time",
    days: "May 22-23, 2026",
    mainTime: "9AM",
    sundayDays: "May 24, 2026",
    sundayTime: "4PM"
  },
  {
    name: "Mountain Time",
    days: "May 22-23, 2026",
    mainTime: "10AM",
    sundayDays: "May 24, 2026",
    sundayTime: "5PM"
  },
  {
    name: "Central Time",
    days: "May 22-23, 2026",
    mainTime: "11AM",
    sundayDays: "May 24, 2026",
    sundayTime: "6PM"
  },
  {
    name: "Eastern Time",
    days: "May 22-23, 2026",
    mainTime: "12PM",
    sundayDays: "May 24, 2026",
    sundayTime: "7PM"
  }
];

interface TopicItem {
  time: string;
  title: string;
  desc: string;
  type: "lecture" | "lab" | "coaching" | "surprise";
}

interface DayAgendaItem {
  day: number;
  date: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  icon: React.ReactNode;
  topics: TopicItem[];
}

export function SummitAgenda() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [userInteracted, setUserInteracted] = useState(false);
  
  // Audio state
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Sound synthesis melody
  const melody = [261.63, 311.13, 349.23, 392.00, 466.16, 523.25, 622.25]; // pentatonic synthesizer chord sequence

  const stopAudio = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  const startAudio = () => {
    if (typeof window === "undefined") return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      stopAudio();

      let step = 0;
      const playStep = () => {
        if (!isPlaying || !soundEnabled) return;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Cozy high-tech square-to-sine warm synth
        osc.type = "sine";
        
        // Pick pentatonic notes based on step
        const frequency = melody[step % melody.length];
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        
        // Modulate with sub frequency for bass depth
        if (step % 2 === 0) {
          const subOsc = ctx.createOscillator();
          const subGain = ctx.createGain();
          subOsc.type = "triangle";
          subOsc.frequency.setValueAtTime(frequency / 2, ctx.currentTime);
          subGain.gain.setValueAtTime(0.05, ctx.currentTime);
          subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
          subOsc.connect(subGain);
          subGain.connect(ctx.destination);
          subOsc.start();
          subOsc.stop(ctx.currentTime + 0.82);
        }

        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.48);
        
        step++;
      };

      // Play initially, then loop
      playStep();
      synthIntervalRef.current = window.setInterval(playStep, 500);
    } catch (e) {
      console.error("Audio error", e);
    }
  };

  // Toggle play/pause
  const handlePlayToggle = () => {
    setUserInteracted(true);
    const newPlaying = !isPlaying;
    setIsPlaying(newPlaying);
    
    if (newPlaying && !soundEnabled) {
      setSoundEnabled(true);
    }
  };

  // Handle speaker click
  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUserInteracted(true);
    setSoundEnabled(!soundEnabled);
  };

  // Trigger or update sound loop on states change
  useEffect(() => {
    if (isPlaying && soundEnabled) {
      startAudio();
    } else {
      stopAudio();
    }
    return () => stopAudio();
  }, [isPlaying, soundEnabled]);

  // Audio wave visualization simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let bars: number[] = Array.from({ length: 32 }, () => 2);
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const barWidth = width / bars.length;

      phase += 0.08;

      for (let i = 0; i < bars.length; i++) {
        let targetHeight = 2;
        if (isPlaying) {
          // If sound is enabled we show nice rhythmic pulsing peaks, else micro standby waves
          const multiplier = soundEnabled ? 28 : 8;
          targetHeight = 2 + Math.abs(Math.sin(i * 0.3 + phase) * Math.cos(i * 0.15 + phase * 0.5)) * multiplier;
          // Add some random noise
          targetHeight += Math.random() * (soundEnabled ? 6 : 2);
        } else {
          // Flattened stationary waves
          targetHeight = 1.5 + Math.sin(i * 0.2) * 1.5;
        }

        bars[i] = bars[i] * 0.7 + targetHeight * 0.3;

        // Draw double side visualizers symmetrical
        const currentH = bars[i];
        
        // Gradient fill
        const grad = ctx.createLinearGradient(0, height, 0, 0);
        grad.addColorStop(0, "rgba(245, 158, 11, 0.1)"); // translucent amber
        grad.addColorStop(0.5, "rgba(236, 72, 153, 0.6)"); // hot pink
        grad.addColorStop(1, "rgba(168, 85, 247, 0.95)"); // violet

        ctx.fillStyle = grad;
        ctx.fillRect(
          i * barWidth + 1,
          height - currentH,
          barWidth - 2,
          currentH
        );
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, soundEnabled]);

  // Dynamic Day Details data structure
  const agendaDays: DayAgendaItem[] = [
    {
      day: 1,
      date: "Friday, May 22, 2026",
      title: "Your Idea in Action",
      subtitle: "The 60-Minute Prototype Challenge",
      shortDesc: "Learn how to instantly translate any visual napkin sketch or rough prompt description into a fully coded, structured, reactive front-end interface in under one hour — using pure conversational dialog.",
      icon: <Laptop className="w-5 h-5 text-amber-500" />,
      topics: [
        {
          time: "09:00 AM - 10:15 AM",
          title: "The AI Prompt Masterclass: Sketching & Logic Maps",
          desc: "How to communicate with AI models clearly to skip complex technical diagrams. You’ll draft your first visual layout system using exact blueprint templates provided in the VIP Workbook.",
          type: "lecture"
        },
        {
          time: "10:30 AM - 12:00 PM",
          title: "Real-time Build Lab: The Raw React Architecture",
          desc: "Step-by-step guidance on structural logic blocks. Watch the instructor code an administrative dashboard from scratches, then copy the live workspace template to build yours in minutes.",
          type: "lab"
        },
        {
          time: "12:15 PM - 01:00 PM",
          title: "Live Hot-seat Coaching: Wireframe Auditing",
          desc: "Three selected registrants present their app ideas on screens. The instructor builds, modifies, and launches their custom application interfaces live on high-contrast zoom stream.",
          type: "coaching"
        }
      ]
    },
    {
      day: 2,
      date: "Saturday, May 23, 2026",
      title: "Interactive Synthesis & Multipage Logic",
      subtitle: "API Interactivity and Intelligent Features",
      shortDesc: "Upgrade your static frontend with powerful dynamic features. We'll introduce third-party connectors, implement robust data capture, and inject custom serverless API pipelines without touching command lines.",
      icon: <Activity className="w-5 h-5 text-purple-500" />,
      topics: [
        {
          time: "09:00 AM - 10:15 AM",
          title: "Data Flows & State Engines: Store & Retrieve Data",
          desc: "Demystifying user storage systems. Learn to implement persistent key-value caching (e.g. state saves, workspace cache) so attendees don't lose progress on page refresh.",
          type: "lecture"
        },
        {
          time: "10:30 AM - 12:00 PM",
          title: "Integrating the Gemini & External API Gateway",
          desc: "Give your application advanced intelligence. We'll set up a server-side route together to process smart prompts, structure raw JSON responses, and display them securely in the browser.",
          type: "lab"
        },
        {
          time: "12:15 PM - 01:00 PM",
          title: "The Live Debugging Clinic: Overcoming Common Bottlenecks",
          desc: "A designated session dedicated to clearing developer hurdles. Learn to parse compiler logs, target UI rendering inconsistencies, and deploy quick iterative fixes.",
          type: "coaching"
        }
      ]
    },
    {
      day: 3,
      date: "Sunday, May 24, 2026",
      title: "The 4-Figure Launch Roadmap",
      subtitle: "Cloud Distribution, Hosting, and Monetization",
      shortDesc: "Complete your transformation. In our final day, you will build automated launch sequences, deploy your live code to Cloud hosting securely, and execute our zero-cost distribution model to attract your first users.",
      icon: <Smartphone className="w-5 h-5 text-emerald-500" />,
      topics: [
        {
          time: "04:00 PM - 05:15 PM",
          title: "One-click Cloud Distribution & Asset Optimization",
          desc: "Watch the compilation cycle package your application into optimized static assets. We'll publish the build live to Cloud Run and global edge content delivery networks (CDNs).",
          type: "lecture"
        },
        {
          time: "05:30 PM - 06:45 PM",
          title: "The SaaS Micro-SaaS Blueprint: Payment Gates & Subscriptions",
          desc: "How to bundle your software with ready-made checkout workflows. Configure stripe overlays, secure custom checkout nodes, and lock premium modules safely from basic attendees.",
          type: "lab"
        },
        {
          time: "07:00 PM - 07:45 PM",
          title: "Day 3 Closing Ceremony: Workbook Graduation & Certificate distribution",
          desc: "Claim your Certified AI Appbuilder badge and review exclusive templates. Interactive panel answering specific deployment and monetization strategy paths.",
          type: "surprise"
        }
      ]
    }
  ];

  return (
    <div className="w-full relative py-1 flex flex-col items-center">
      
      {/* 1. TIMEZONE / SCHEDULE BANNER BLOCK */}
      <div className="w-full max-w-5xl px-4 sm:px-6 relative z-10 -mt-8 sm:-mt-10 mb-16">
        <div id="timezone-schedule-box" className="bg-slate-900/90 border border-slate-700/60 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 md:gap-x-2 text-center divide-slate-800 divide-y-2 lg:divide-y-0 lg:divide-x divide-solid">
            {zones.map((zone, idx) => (
              <div 
                key={zone.name} 
                className={`flex flex-col justify-center py-2 lg:py-0 ${idx > 0 ? "lg:pl-4" : ""} ${idx > 1 ? "pt-4 lg:pt-0" : ""}`}
              >
                <span className="text-[14px] sm:text-[16px] font-sans font-extrabold tracking-tight text-pink-500 uppercase">
                  {zone.name}
                </span>
                
                <div className="mt-2.5 space-y-1.5 flex flex-col items-center">
                  <div className="flex gap-2.5 items-center text-xs text-slate-300 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    <span>{zone.days}</span>
                    <span className="text-amber-500 font-extrabold text-[13px] bg-amber-500/10 px-2 py-0.5 rounded font-mono">
                      {zone.mainTime}
                    </span>
                  </div>
                  
                  <div className="flex gap-2.5 items-center text-xs text-slate-300 font-semibold">
                    <CalendarArrow className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{zone.sundayDays}</span>
                    <span className="text-amber-500 font-extrabold text-[13px] bg-amber-500/10 px-2 py-0.5 rounded font-mono">
                      {zone.sundayTime}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. THE TRANSITIONAL LUXURIOUS LIGHT SECTION */}
      <section className="w-full bg-slate-50 text-slate-900 border-y border-slate-200 py-16 sm:py-24 relative overflow-hidden">
        
        {/* Aesthetic background mesh & dot grid layout exactly like the screenshot */}
        <div className="absolute inset-0 pointer-events-none opacity-60" style={{ 
          backgroundImage: "radial-gradient(#0f172a 1px, transparent 1.2px)", 
          backgroundSize: "28px 28px" 
        }} />
        
        <div className="absolute top-1/4 left-0 right-0 h-[450px] bg-gradient-to-b from-purple-100/30 to-slate-200/50 blur-[130px] rounded-full pointer-events-none" />

        <div className="w-full max-w-5xl mx-auto px-6 relative z-10">
          
          {/* Main Headers block */}
          <div className="text-center space-y-4 max-w-4xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-mono font-black tracking-[0.25em] text-purple-600 uppercase block">
              SUMMIT AGENDA
            </span>
            
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-[1.05] tracking-tight text-slate-900 uppercase">
              HOW WE'LL HELP YOU <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-900">BUILD YOUR FIRST 4+ FIGURE APP IDEA</span> IN 2026
            </h2>
            
            <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-indigo-600 mx-auto rounded-full mt-6" />
            
            <p className="text-sm sm:text-base font-sans font-bold text-slate-600 max-w-3xl mx-auto leading-relaxed pt-2">
              No Coding. No Previous Experience. Just Your Idea And A Willingness To Execute.
            </p>
          </div>

          {/* 3. INTERACTIVE SPEAKER VIDEO PLAYER MODULE */}
          <div className="w-full max-w-4xl mx-auto mb-20 relative">
            
            {/* Soft decorative shadow background glowing block */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-purple-600/10 via-amber-500/10 to-indigo-600/10 rounded-[32px] blur-xl pointer-events-none" />

            {/* Main Interactive Player card */}
            <div 
              id="summit-interactive-player"
              onClick={handlePlayToggle}
              className="relative aspect-video w-full rounded-[24px] overflow-hidden border-[4px] sm:border-[6px] border-purple-600 hover:border-purple-500 shadow-2xl transition-all duration-500 cursor-pointer group"
            >
              {/* Speaker Background Thumbnail */}
              <div className="absolute inset-0 bg-slate-950">
                <img 
                  src={SPEAKER_IMAGE} 
                  alt="Anik Singal Summit Trainer" 
                  className={`w-full h-full object-cover object-top transition-transform duration-[4000ms] ease-out select-none ${isPlaying ? "scale-105" : "scale-100"}`}
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual shadow overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
                
                {/* Dynamic animated glow overlay when playing */}
                {isPlaying && (
                  <div className="absolute inset-0 bg-purple-500/5 mix-blend-overlay animate-pulse pointer-events-none" />
                )}
              </div>

              {/* TOP FLAVOUR LAYER: Enable sound overlay & CLICK TO TURN ON SOUND red badge */}
              <div className="absolute top-3 sm:top-5 left-3 sm:left-5 right-3 sm:right-5 z-20 flex justify-between items-start pointer-events-none">
                
                {/* Sound Control Indicator Pills on Left */}
                <button
                  type="button"
                  onClick={handleSoundToggle}
                  className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-sm border border-white/10 hover:bg-slate-900 group/btn shadow-md transition-all active:scale-95"
                >
                  {soundEnabled && isPlaying ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-100">Sound On</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-100">Enable sound</span>
                    </>
                  )}
                </button>

                {/* RED PULSING BADGE FROM EXCEL PICTURE BANNER - ON RIGHT */}
                {!soundEnabled && isPlaying && (
                  <button
                    type="button"
                    onClick={handleSoundToggle}
                    className="pointer-events-auto flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl bg-rose-600 border border-rose-400/30 hover:bg-rose-500 text-white font-mono font-black text-[10px] sm:text-xs tracking-wider uppercase animate-bounce shadow-lg shadow-rose-950/40"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <Volume2 className="w-3.5 h-3.5 animate-pulse text-white" />
                    <span>Click Turn On Sound</span>
                  </button>
                )}
              </div>

              {/* CENTER COMPONENT FOR MOCK PLAY STATE CHOOSE */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <AnimatePresence mode="wait">
                  {!isPlaying ? (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex flex-col items-center gap-4"
                    >
                      {/* Enormous high contrast purple vector play icon */}
                      <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-purple-600/90 border-2 border-white text-white flex items-center justify-center shadow-2xl group-hover:scale-110 active:scale-95 transition-transform duration-300">
                        <Play className="w-7 h-7 sm:w-10 sm:h-10 text-white fill-white translate-x-1" />
                      </div>
                      
                      <div className="bg-slate-950/85 px-4.5 py-1.5 rounded-full border border-white/10 shadow-lg text-center">
                        <span className="text-[11px] sm:text-xs font-sans font-bold text-amber-500 uppercase tracking-widest block">
                          Day 1 + Day 2 Live Reel Preview
                        </span>
                        <span className="text-[10px] text-slate-300 font-mono block">
                          (Click to preview sound synthese)
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-slate-950/70 border border-white/20 text-white flex items-center justify-center shadow-lg">
                        <Pause className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* BOTTOM STRIP BAR VISUALIZER CONTAINER */}
              <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent flex flex-col gap-2 pointer-events-none">
                
                {/* Live sound peaks and visual tracking stream */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-slate-200 font-extrabold uppercase flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-purple-400" />
                      {isPlaying ? (soundEnabled ? "BROADCAST STREAM ACTIVE" : "BROADCAST STREAM MUTED") : "STANDBY STATION"}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-300 font-semibold">
                    [PROTOTYPE LIVE FEED - MAY 2026]
                  </span>
                </div>

                {/* Simulated live frequencies spectrum canvas */}
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-8 sm:h-12 border-t border-white/5 opacity-80" 
                  width={600} 
                  height={80} 
                />
              </div>
            </div>

            {/* Quick Helper under Video Card */}
            <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs font-bold text-slate-500">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Listen to Summit Speaker Intro and download Workbook inside VIP seat confirmation.</span>
            </div>
          </div>

          {/* 4. THE 3-DAY CURRICULUM ACCORDION TIMELINE */}
          <div className="w-full max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg sm:text-xl font-display font-black tracking-tight text-slate-900 uppercase">
                  COMPLETE 3-DAY BROADCAST CURRICULUM
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wide">
                Interactive Schedule
              </span>
            </div>

            <div className="space-y-4">
              {agendaDays.map((agenda, dayIdx) => {
                const isDayExpanded = expandedDay === agenda.day;
                return (
                  <div 
                    key={agenda.day}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isDayExpanded 
                        ? "bg-white border-purple-500/40 shadow-xl shadow-purple-950/5" 
                        : "bg-slate-100 hover:bg-slate-200/60 border-slate-200 cursor-pointer"
                    }`}
                    onClick={() => {
                      if (!isDayExpanded) {
                        setExpandedDay(agenda.day);
                      }
                    }}
                  >
                    
                    {/* ACCORDION HEADER BLOCK */}
                    <div className="p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start sm:items-center gap-4">
                        
                        {/* Day indicator badge */}
                        <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-display font-black leading-none flex-shrink-0 border-2 select-none ${
                          isDayExpanded 
                            ? "bg-purple-600 border-purple-500 text-white" 
                            : "bg-slate-200 border-slate-300 text-slate-700"
                        }`}>
                          <span className="text-[10px] tracking-tighter uppercase block">DAY</span>
                          <span className="text-lg sm:text-xl block">{agenda.day}</span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                            <span className="text-[11px] font-mono tracking-wider font-extrabold text-purple-600 uppercase">
                              {agenda.date}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-semibold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full font-mono uppercase">
                              {agenda.day === 3 ? "4 Hours LIVE" : "3 Hours Live + Labs"}
                            </span>
                          </div>
                          
                          <h4 className="font-display font-black text-slate-950 text-base sm:text-lg lg:text-xl uppercase tracking-tight leading-tight">
                            {agenda.title}
                          </h4>
                          
                          <span className="text-xs sm:text-sm text-slate-500 font-bold tracking-tight block">
                            {agenda.subtitle}
                          </span>
                        </div>
                      </div>

                      {/* Accordion Arrow Toggle */}
                      <button 
                        type="button"
                        className={`p-1.5 rounded-lg border flex-shrink-0 transition-transform ${
                          isDayExpanded 
                            ? "bg-purple-50 border-purple-200 text-purple-600 rotate-180" 
                            : "bg-slate-50 border-transparent text-slate-400"
                        }`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </button>
                    </div>

                    {/* ACCORDION INNER COLLAPSE BODY */}
                    <AnimatePresence initial={false}>
                      {isDayExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-6">
                            
                            {/* Summary callout box */}
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl font-medium border-l-4 border-amber-500 pl-3.5 py-1">
                              {agenda.shortDesc}
                            </p>

                            {/* Bullet Topics List Timeline */}
                            <div className="space-y-4">
                              <h5 className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest pl-1">
                                SESSIONS WORKFLOW TIMELINE
                              </h5>
                              
                              <div className="space-y-4 relative pl-3.5 sm:pl-5 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                                {agenda.topics.map((topic, tIdx) => (
                                  <div key={tIdx} className="relative group/topic">
                                    {/* Timeline bullet dot */}
                                    <div className="absolute -left-[17px] sm:-left-[23px] top-[18px] w-2.5 h-2.5 rounded-full bg-slate-400 group-hover/topic:bg-purple-500 transition-colors border-2 border-white shadow-sm" />
                                    
                                    <div className="bg-white border border-slate-100 hover:border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm space-y-2.5 transition-all">
                                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                          <span className="text-[11px] font-mono font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                                            {topic.time}
                                          </span>
                                          <span className={`text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded ${
                                            topic.type === "lecture" 
                                              ? "bg-slate-100 text-slate-600" 
                                              : topic.type === "lab"
                                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                              : topic.type === "surprise"
                                              ? "bg-amber-50 text-amber-600 border border-amber-100 animate-pulse animate-duration-1000"
                                              : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                                          }`}>
                                            {topic.type}
                                          </span>
                                        </div>
                                      </div>

                                      <h6 className="font-sans font-black text-[14px] sm:text-[15px] text-slate-900 group-hover/topic:text-purple-600 transition-colors">
                                        {topic.title}
                                      </h6>

                                      <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                                        {topic.desc}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Bonus items at bottom of the day */}
                            <div className="p-4 rounded-xl bg-purple-50/75 border border-purple-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-purple-600 animate-spin-slow" />
                                <span className="font-bold text-slate-800">
                                  Day {agenda.day} Active Workbook Bonus Resources Included
                                </span>
                              </div>
                              <span className="font-mono text-[10px] text-purple-600 font-bold bg-white px-2 py-0.5 rounded-full border border-purple-200">
                                +3 custom templates
                              </span>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>

            {/* Quick Bottom Seal CTA */}
            <div className="pt-6 text-center">
              <button 
                type="button"
                onClick={() => {
                  document.getElementById("register-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-slate-50 hover:bg-purple-600 hover:text-white font-display font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer active:scale-95"
              >
                <span>Back To Top and Claim Access Card</span>
                <span className="text-sm">➔</span>
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

// Help component to render dynamic icons easily
function CalendarArrow({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      {...props}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M3 10h18" />
      <path d="M21 6V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" />
      <path d="M16 19h6" />
      <path d="M19 16l3 3-3 3" />
    </svg>
  );
}
