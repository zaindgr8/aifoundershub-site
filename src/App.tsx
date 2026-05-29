import React, { useState, useEffect, useRef } from "react";
import { 
  Mail, 
  ChevronDown, 
  Check, 
  Calendar, 
  Clock, 
  ArrowRight, 
  User, 
  Sparkles, 
  ShieldCheck, 
  Ticket, 
  Share2, 
  ExternalLink, 
  AlertCircle,
  X,
  Lock,
  MessageSquare,
  BookOpen
} from "lucide-react";
import { SummitAgenda } from "./components/SummitAgenda";
import { SummitEndSection } from "./components/SummitEndSection";

interface Country {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
}

const COUNTRIES: Country[] = [
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪", dialCode: "+971" },
  { name: "United States", code: "US", flag: "🇺🇸", dialCode: "+1" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", dialCode: "+44" },
  { name: "Canada", code: "CA", flag: "🇨🇦", dialCode: "+1" },
  { name: "India", code: "IN", flag: "🇮🇳", dialCode: "+91" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", dialCode: "+966" },
  { name: "Qatar", code: "QA", flag: "🇶🇦", dialCode: "+974" },
  { name: "Kuwait", code: "KW", flag: "🇰🇼", dialCode: "+965" },
  { name: "Oman", code: "OM", flag: "🇴🇲", dialCode: "+968" },
  { name: "Singapore", code: "SG", flag: "🇸🇬", dialCode: "+65" },
  { name: "Australia", code: "AU", flag: "🇦🇺", dialCode: "+61" },
];

export default function App() {
  // Form State
  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // UAE by default
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  
  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  // Modals state
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

  // Form Validation Errors
  const [errors, setErrors] = useState<{ firstName?: string; emailAddress?: string }>({});

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close country dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCountryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Custom Event Listener for footer triggers
  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<"privacy" | "terms" | null>;
      if (customEvent.detail) {
        setActiveModal(customEvent.detail);
      }
    };
    window.addEventListener("trigger-modal", handleTrigger);
    return () => window.removeEventListener("trigger-modal", handleTrigger);
  }, []);

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    // Let's set a countdown target in May 2026 or dynamically in the future to keep a clean ticking state
    const targetDate = new Date("2026-05-22T09:00:00Z");
    const interval = setInterval(() => {
      const now = new Date();
      let diff = targetDate.getTime() - now.getTime();
      
      // If the target has passed, add smart recurring live updates so there's always an active countdown
      if (diff < 0) {
        const nextTarget = new Date();
        nextTarget.setDate(nextTarget.getDate() + 3); // 3 days in future
        diff = nextTarget.getTime() - now.getTime();
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { firstName?: string; emailAddress?: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }
    if (!emailAddress.trim()) {
      newErrors.emailAddress = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Trigger a light haptic vibrating/shake alert if supported, or visual feedback
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate server side lead submission
    setTimeout(() => {
      // Generate unique ticket ID
      const randomId = Math.floor(100000 + Math.random() * 900000);
      setTicketNumber(`AI-SUMMIT-${randomId}`);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 overflow-x-hidden font-sans flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      
      {/* BACKGROUND GRAPHICS: Digital Circuits and Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Bold Typography Dot Pattern */}
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        
        {/* Soft Radial ambient glows matching Design Theme */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] left-[25%] right-[25%] h-[350px] bg-gradient-to-b from-amber-500/5 to-transparent blur-[120px] rounded-full" />


        {/* LEFT CIRCUIT OVERLAY: "prompt" & "image_synthesis" */}
        <div className="absolute left-[3%] top-[10%] w-[380px] h-[550px] hidden xl:block opacity-40 hover:opacity-60 transition-opacity duration-700">
          <svg width="380" height="550" viewBox="0 0 380 550" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Main horizontal line with prompt text node */}
            <path d="M10 50 H240 L280 90 V250 H330 L360 280 V420" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="5 5" />
            <path d="M10 50 H240 L280 90 V250 H330 L360 280 V420" stroke="#6366f1" strokeWidth="1.5" className="opacity-70" />
            
            {/* Animating energy beam */}
            <path d="M10 50 H240 L280 90 V250" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeDasharray="30 200">
              <animate attributeName="stroke-dashoffset" values="230;-230" dur="4s" repeatCount="indefinite" />
            </path>
            
            {/* Terminating Glowing Nodes */}
            <circle cx="280" cy="90" r="4" fill="#a855f7" />
            <circle cx="330" cy="250" r="4" fill="#3b82f6" />
            <circle cx="360" cy="280" r="5" fill="#facc15" className="animate-ping" style={{ animationDuration: '3s' }} />
            <circle cx="360" cy="280" r="4" fill="#facc15" />

            {/* Embedded texts from screenshot */}
            <text x="30" y="40" fill="#38bdf8" fontFamily="monospace" fontSize="13" className="font-bold opacity-80" letterSpacing="2">prompt</text>
            <rect x="25" y="22" width="75" height="24" rx="4" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" fill="#38bdf8/10" />

            <path d="M30 140 H180 L200 160 V330" stroke="#1e293b" strokeWidth="2" />
            <path d="M30 140 H180 L200 160 V330" stroke="#3b82f6" strokeWidth="1" className="opacity-50" />
            <text x="40" y="132" fill="#10b981" fontFamily="monospace" fontSize="11" className="opacity-90" letterSpacing="1">image_synthesis</text>
            
            {/* Secondary abstract lines */}
            <path d="M150 280 H220 L240 300 V490" stroke="#312e81" strokeWidth="1.5" />
            <circle cx="240" cy="490" r="3" fill="#312e81" />
          </svg>
        </div>

        {/* RIGHT CIRCUIT OVERLAY: Integrated Chip (IC) & "AI GENERATIVE" */}
        <div className="absolute right-[3%] top-[12%] w-[400px] h-[600px] hidden xl:block opacity-45 hover:opacity-65 transition-opacity duration-700">
          <svg width="400" height="600" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Grid structure leading to microchip */}
            <path d="M380 120 H200 L160 160 V320 H70" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="8 6" />
            <path d="M380 220 H220 L180 260 V400 H120" stroke="#ec4899" strokeWidth="1.5" className="opacity-40" />

            {/* Animating electron for pink circuit */}
            <path d="M380 220 H220 L180 260 V400 H120" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="40 300">
              <animate attributeName="stroke-dashoffset" values="340;-340" dur="5s" repeatCount="indefinite" />
            </path>

            {/* Microchip "AI GENERATIVE" container block */}
            <g transform="translate(180, 180)">
              {/* Main Chip Body */}
              <rect x="0" y="0" width="130" height="130" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="3" className="shadow-[0_0_20px_rgba(99,102,241,0.25)]" />
              <rect x="5" y="5" width="120" height="120" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              
              {/* Silicon pathways inside core */}
              <circle cx="65" cy="65" r="28" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="65" y1="5" x2="65" y2="37" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="65" y1="125" x2="65" y2="93" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="5" y1="65" x2="37" y2="65" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="125" y1="65" x2="93" y2="65" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Glowing copper pads / legs around the chip */}
              {Array.from({ length: 4 }).map((_, i) => (
                <g key={`pins-${i}`}>
                  {/* Left pins */}
                  <rect x="-8" y={20 + i * 28} width="8" height="10" rx="2" fill="#64748b" />
                  <line x1="-12" y1={25 + i * 28} x2="-8" y2={25 + i * 28} stroke="#334155" strokeWidth="1.5" />
                  
                  {/* Right pins */}
                  <rect x="130" y={20 + i * 28} width="8" height="10" rx="2" fill="#64748b" />
                  <line x1="138" y1={25 + i * 28} x2="130" y2={25 + i * 28} stroke="#334155" strokeWidth="1.5" />

                  {/* Top pins */}
                  <rect x={20 + i * 28} y="-8" width="10" height="8" rx="2" fill="#64748b" />
                  <line x1={25 + i * 28} y1="-12" x2={25 + i * 28} y2="-8" stroke="#334155" strokeWidth="1.5" />

                  {/* Bottom pins */}
                  <rect x={20 + i * 28} y="130" width="10" height="8" rx="2" fill="#64748b" />
                  <line x1={25 + i * 28} y1="138" x2={25 + i * 28} y2="130" stroke="#334155" strokeWidth="1.5" />
                </g>
              ))}

              {/* Silicon text label "AI GENERATIVE" */}
              <text x="65" y="112" fill="#a855f7" fontFamily="monospace" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="1" className="opacity-95">AI GENERATIVE</text>
              <rect x="25" y="102" width="80" height="14" rx="2" stroke="#a855f7" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />
            </g>
            
            {/* Tech details */}
            <circle cx="100" cy="460" r="5" fill="#ec4899" />
            <path d="M100 460 Q70 490, 110 520 T60 560" stroke="#ec4899" strokeWidth="1" className="opacity-40" />
            <text x="112" y="464" fill="#a1a1aa" fontFamily="monospace" fontSize="10" className="opacity-60">CORE_BLOCK_01</text>
          </svg>
        </div>
      </div>

      {/* HEADER SECTION: Branding & Decorative elements */}
      <header className="relative z-10 w-full pt-6 pb-4 px-6 md:px-12 flex items-center justify-between border-b border-white/5 bg-slate-950/45 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center font-black text-slate-950 tracking-tighter">
            AI
          </div>
          <div>
            <span className="font-display font-black tracking-tighter text-white text-lg sm:text-xl block uppercase">
              AI Founder Hub
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-400 uppercase tracking-widest">
          <span className="text-xs hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-500" /> Schedule
          </span>
          <span className="text-xs hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" /> Curriculum
          </span>
          <span className="text-xs hover:text-white transition-colors opacity-90 rounded-full px-3 py-1 border border-slate-800 text-amber-500 flex items-center gap-1.5">
            Live Broadcast
          </span>
        </nav>

        <div>
          <button 
            onClick={() => {
              // Scroll to form smoothly
              document.getElementById("register-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-4 py-1.5 rounded-full border border-slate-700 bg-slate-900 text-xs font-bold text-slate-200 hover:text-white hover:border-amber-500/45 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            Claim Free Seat
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 py-10 sm:py-16">
        
        {/* HERO HEADER */}
        <div className="w-full max-w-5xl text-center space-y-6 mb-8 sm:mb-12">
          
          {/* THE EXACT GLASS PILL BADGE UPGRADED WITH BOLD AMBER THEME */}
          <div className="inline-block" id="col-7G4Csur_QP">
            <div className="bg-amber-500 text-slate-950 px-5 py-2.5 rounded-full inline-flex items-center justify-center gap-2.5 text-[11px] sm:text-xs font-black tracking-widest uppercase shadow-lg shadow-amber-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
                <span className="pulse-glow-dot relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
              </span>
              <span>LIVE • MAY 22-24, 2026 (FRI-SUN)</span>
            </div>
          </div>

          {/* THE EXACT SUBTITLE IN SCREENSHOT OPTIMIZED FOR THE BOLD THEME */}
          <p className="font-display font-extrabold text-xs sm:text-sm tracking-[0.2em] text-amber-500 uppercase max-w-2xl mx-auto leading-relaxed px-2">
            USE AI TO BUILD YOUR FIRST APP—NO CODING, NO EXPERIENCE REQUIRED
          </p>

          {/* THE MAIN HEADLINE IN THE EXACT "BOLD TYPOGRAPHY" THEME PATTERNS */}
          <h1 className="font-display font-black text-[36px] sm:text-[62px] md:text-[76px] lg:text-[80px] leading-[0.95] tracking-tighter max-w-5xl mx-auto text-white uppercase px-1">
            HOW TO GO FROM <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">0 CODE</span> TO A{" "}
            <wbr />
            <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">WORKING APP</span> IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">3 DAYS</span>
          </h1>
        </div>

        {/* REGISTRATION CARD & FORM COMPONENT */}
        <section id="register-section" className="w-full max-w-lg mx-auto relative px-1 sm:px-0">
          
          {/* Ambient container corner glows optimized for the Bold Theme */}
          <div className="absolute -inset-[1px] bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 rounded-3xl blur-md pointer-events-none" />

          {/* Core Card structure - Using bold theme card design */}
          <div className="relative bg-[#0b0f19]/90 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-black/90">
            
            {/* Display Countdown Clock helper styled with theme colours */}
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-1.5 rounded-full border border-amber-300/30 text-[10px] font-mono text-slate-950 tracking-widest uppercase font-black flex items-center gap-1.5 shadow-lg shadow-amber-950/30">
              <Clock className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
              <span>
                {timeLeft.days}D : {timeLeft.hours.toString().padStart(2, "0")}H : {timeLeft.minutes.toString().padStart(2, "0")}M
              </span>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleRegister} className="space-y-6">
                
                {/* 1. FIRST NAME INPUT */}
                <div className="space-y-1.5 relative">
                  <div className="relative rounded-lg shadow-sm">
                    <input
                      type="text"
                      id="firstName-input"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (errors.firstName) setErrors(prev => ({ ...prev, firstName: undefined }));
                      }}
                      placeholder="First Name*"
                      className={`w-full bg-white text-slate-900 placeholder-[#9ca3af] font-semibold py-3.5 sm:py-4 px-4.5 rounded-xl border-2 transition-all duration-200 outline-none focus:ring-4 focus:ring-amber-500/20 text-sm sm:text-base ${
                        errors.firstName ? 'border-red-500 ring-2 ring-red-500/10' : 'border-transparent focus:border-amber-500'
                      }`}
                    />
                  </div>
                  {errors.firstName && (
                    <div className="flex items-center gap-1.5 text-xs text-red-400 font-medium pl-1 animate-pulse">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.firstName}</span>
                    </div>
                  )}
                </div>

                {/* 2. EMAIL ADDRESS INPUT */}
                <div className="space-y-1.5 relative">
                  <div className="relative rounded-lg shadow-sm">
                    {/* Inbox Mail letter icon in left side */}
                    <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-[#9ca3af] flex-shrink-0" />
                    </div>
                    <input
                      type="text"
                      id="email-input"
                      value={emailAddress}
                      onChange={(e) => {
                        setEmailAddress(e.target.value);
                        if (errors.emailAddress) setErrors(prev => ({ ...prev, emailAddress: undefined }));
                      }}
                      placeholder="Enter Your Best Email Address*"
                      className={`w-full bg-white text-slate-900 placeholder-[#9ca3af] font-semibold py-3.5 sm:py-4 pl-12 pr-4.5 rounded-xl border-2 transition-all duration-200 outline-none focus:ring-4 focus:ring-amber-500/20 text-sm sm:text-base ${
                        errors.emailAddress ? 'border-red-500 ring-2 ring-red-500/10' : 'border-transparent focus:border-amber-500'
                      }`}
                    />
                  </div>
                  {errors.emailAddress && (
                    <div className="flex items-center gap-1.5 text-xs text-red-400 font-medium pl-1 animate-pulse">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.emailAddress}</span>
                    </div>
                  )}
                </div>

                {/* 3. PHONE NUMBER (OPTIONAL) WITH FLAG DROPDOWN TRIGGERS */}
                <div className="space-y-1.5 relative">
                  <div className="relative rounded-xl shadow-sm flex bg-white border border-transparent overflow-hidden">
                    
                    {/* Flag Trigger Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        id="flag-dropdown-btn"
                        onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                        className="h-full flex items-center gap-1 px-3 sm:px-4 border-r border-slate-200 hover:bg-slate-50 transition-colors focus:outline-none"
                      >
                        <span className="text-xl sm:text-2xl leading-none select-none">{selectedCountry.flag}</span>
                        <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                      </button>

                      {/* Dropdown Menu Portal */}
                      {countryDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-64 max-h-60 overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl z-50 py-1.5 scrollbar-thin scrollbar-thumb-slate-700">
                          <div className="px-3 pb-1 mb-1 border-b border-slate-800 text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                            Select Country Code
                          </div>
                          {COUNTRIES.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(country);
                                setCountryDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                                selectedCountry.code === country.code
                                  ? "bg-amber-500 text-slate-950"
                                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
                              }`}
                            >
                              <span className="flex items-center gap-2.5">
                                <span className="text-lg leading-none">{country.flag}</span>
                                <span>{country.name}</span>
                              </span>
                              <span className={`text-[11px] font-mono ${selectedCountry.code === country.code ? 'text-slate-900' : 'text-slate-400'}`}>{country.dialCode}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Numeric phone field entry */}
                    <div className="flex-1 flex items-center relative">
                      <span className="absolute left-3 text-slate-400 font-mono text-sm pointer-events-none">
                        {selectedCountry.dialCode}
                      </span>
                      <input
                        type="tel"
                        id="phone-input"
                        value={phoneNumber}
                        onChange={(e) => {
                          // Allow numbers, spaces, parentheses, dashes
                          const cleanVal = e.target.value.replace(/[^0-9\- ()]/g, "");
                          setPhoneNumber(cleanVal);
                        }}
                        placeholder="Phone Number (Optional)"
                        className="w-full bg-transparent text-slate-900 placeholder-[#9ca3af] font-semibold py-3.5 sm:py-4 pl-14 sm:pl-16 pr-4 outline-none text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* THE EXACT CHECKBOX + TERMS DESCRIPTION FROM THE SCREENSHOT */}
                <div className="flex items-start gap-3 mt-4 text-left">
                  <div className="flex items-center h-5 mt-1">
                    <input
                      id="opt-in-agreement"
                      name="opt-in-agreement"
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="h-4.5 w-4.5 rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-amber-500/30"
                    />
                  </div>
                  <div className="text-[11px] leading-[1.5] text-[#94a3b8]">
                    By opting in, you consent to receive important marketing and promotional sms notifications about the AI Founder Hub. Message frequency may vary. Msg & data rates may apply. Message frequency varies. Reply HELP for help, STOP to opt-out.{" "}
                    <button
                      type="button"
                      onClick={() => setActiveModal("privacy")}
                      className="text-slate-300 underline font-semibold hover:text-amber-500 transition-colors"
                    >
                      Privacy Policy
                    </button>{" "}
                    |{" "}
                    <button
                      type="button"
                      onClick={() => setActiveModal("terms")}
                      className="text-slate-300 underline font-semibold hover:text-amber-500 transition-colors"
                    >
                      Terms of Service
                    </button>
                  </div>
                </div>

                {/* THE CTA ACTION BUTTON IN THE EXACT BOLD TYPOGRAPHY GRADIENTS */}
                <div className="space-y-4 pt-2">
                  <button
                    type="submit"
                    id="submit-cta-btn"
                    disabled={isSubmitting || !agreedToTerms}
                    className={`w-full py-5 px-6 rounded-xl font-display font-black text-slate-950 text-xl sm:text-2xl uppercase tracking-tighter flex items-center justify-center gap-2.5 transition-all duration-300 select-none ${
                      !agreedToTerms 
                        ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-400' 
                        : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 active:scale-[0.98] shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] cursor-pointer'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 font-black">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Securing VIP Seat...
                      </span>
                    ) : (
                      <>
                        JOIN THE FREE CLASS! <span className="text-xl leading-none">➔</span>
                      </>
                    )}
                  </button>

                  {/* Dynamic user circles and count indicators from theme layout */}
                  <div className="flex items-center justify-center gap-3.5 text-xs font-semibold text-slate-400">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[9px] font-black text-amber-500">A</div>
                      <div className="w-6 h-6 rounded-full bg-amber-600 border-2 border-slate-950 flex items-center justify-center text-[9px] font-black text-slate-950">AI</div>
                      <div className="w-6 h-6 rounded-full bg-orange-600 border-2 border-slate-950 flex items-center justify-center text-[9px] font-black text-slate-100">S</div>
                    </div>
                    <span>Join 4,281+ attendees registration this month</span>
                  </div>
                </div>
              </form>
            ) : (
              /* REAL-TIME DYNAMIC VIRTUAL TICKET SYSTEM */
              <div className="space-y-6 text-center py-2 animate-fade-in">
                
                {/* Success Sparkle Animation */}
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Check className="w-8 h-8 text-emerald-400" strokeWidth={3} />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-2xl text-white uppercase tracking-wide">
                    Congratulations, {firstName}! 
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Your VIP Seat is confirmed. We have generated your dynamic AI Founder Access Pass & emailed instructions to <span className="font-semibold text-slate-200">{emailAddress}</span>.
                  </p>
                </div>

                {/* THE TICKET UPGRADED WITH THE BOLD THEME DESIGN */}
                <div className="relative mt-8 bg-gradient-to-br from-slate-900 to-[#020617] border-2 border-dashed border-amber-500/30 rounded-xl p-5 text-left shadow-2xl overflow-hidden">
                  
                  {/* Decorative glowing lines on ticket */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
                    <div>
                      <div className="text-[10px] font-mono font-black tracking-widest text-amber-500 uppercase">
                        FOUNDER ALL-ACCESS ENTRY
                      </div>
                      <div className="font-display font-black text-slate-100 text-xl uppercase mt-1 leading-none">
                        AI Founder Hub
                      </div>
                    </div>
                    <Ticket className="w-8 h-8 text-amber-500 opacity-90 animate-pulse" />
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs mb-4">
                    <div>
                      <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">Attendee</span>
                      <span className="font-bold text-slate-100 font-sans">{firstName}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">Pass Number</span>
                      <span className="font-mono font-bold text-amber-500">{ticketNumber}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">Phone Sync</span>
                      <span className="font-sans text-slate-300 font-medium">
                        {phoneNumber ? `${selectedCountry.dialCode} ${phoneNumber}` : "None Provided (Optional)"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-wider font-bold">Live Broadcast</span>
                      <span className="font-bold text-emerald-400">May 22-24, 2026</span>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-white/10 pt-4 flex items-center justify-between">
                    <div>
                      <span className="block text-[8px] font-mono text-slate-600 uppercase tracking-widest font-bold">
                        Security Hash Match
                      </span>
                      <span className="font-mono text-[9px] text-slate-400">
                        SHA256 • AD993AEC{ticketNumber.replace("AI-SUMMIT-", "")}
                      </span>
                    </div>
                    <div className="bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded border border-amber-500/25 text-[9px] font-mono uppercase font-black">
                      VIP CONFIRMED
                    </div>
                  </div>
                </div>

                {/* Next helpful steps */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-left flex items-start gap-2.5 text-xs">
                  <div className="bg-amber-500/10 p-1.5 rounded text-amber-500 flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-200 block">Next Step: VIP WhatsApp Group</span>
                    <span className="text-slate-400 text-[11px] leading-relaxed">Join our members-only group to download the 3-Day Action Workbook and code templates before class starts.</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => {
                      // Simulating inviting a friend
                      const text = `I just registered for the AI Founder Hub! Check it out!`;
                      navigator.clipboard.writeText(text);
                      alert("Share link copied to clipboard!");
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold hover:bg-slate-800 hover:border-amber-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-amber-500" /> Invite Friend
                  </button>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFirstName("");
                      setEmailAddress("");
                      setPhoneNumber("");
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-500 hover:bg-amber-500/20 transition-colors cursor-pointer"
                  >
                    Register Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* BOTTOM METADATA BAR DISPLAYING LOGOS OR PARTNERS IN SCREENSHOT BACKGROUND */}
        {/* BOTTOM METADATA BAR DISPLAYING LOGOS OR PARTNERS */}
        <div className="w-full max-w-3xl mx-auto mt-14 sm:mt-20 text-center space-y-4">
          <p className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-slate-500 uppercase">
            FEATURING LEADING INDUSTRY AI SYSTEMS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 opacity-40 hover:opacity-75 transition-opacity duration-300">
            <span className="font-display font-black text-sm tracking-tight text-slate-100">LLAMA INDEX</span>
            <span className="font-mono text-sm font-black text-slate-100">GEMINI PRO</span>
            <span className="font-sans text-xs font-black tracking-widest text-slate-100">LANGCHAIN</span>
            <span className="font-display text-sm font-black text-slate-100">STABLE DIFFUSION</span>
            <span className="font-mono text-xs font-extrabold text-slate-100">OPENAI GPT-4o</span>
          </div>
        </div>

        {/* SUMMIT FULL INTERACTIVE AGENDA SECTION */}
        <SummitAgenda />

        {/* REPLICATED SUMMIT REALS AND FAQ SECTIONS */}
        <SummitEndSection />
      </main>

      {/* INTERACTIVE POLICIES MODALS */}
      {activeModal && (
        <div id="modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-900 flex items-center justify-between bg-slate-900/40">
              <div className="flex items-center gap-2">
                <div className="bg-amber-500/10 p-1.5 rounded text-amber-500">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="font-display font-extrabold text-slate-200 uppercase text-sm tracking-wide">
                  {activeModal === "privacy" ? "Privacy Policy Agreement" : "Terms of Service Agreement"}
                </h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[350px] overflow-y-auto text-xs text-slate-400 space-y-4 leading-relaxed font-sans">
              {activeModal === "privacy" ? (
                <>
                  <p className="font-semibold text-slate-200">Last updated: May 2026</p>
                  <p>
                    Your privacy is extremely important to us. Here is how your registration data is handled for the AI Founder Hub.
                  </p>
                  <h4 className="font-bold text-slate-300 text-[13px] uppercase tracking-wide pt-2">1. Information Collection</h4>
                  <p>
                    We collect your Name, Email Address, and Phone Number solely to issue your access, verify credentials, and deliver training workbook materials and session updates from the Hub.
                  </p>
                  <h4 className="font-bold text-slate-300 text-[13px] uppercase tracking-wide pt-2">2. Text (SMS) Notifications</h4>
                  <p>
                    By checking the opt-in checkbox, you explicitly consent to receive automated promotional SMS messages regarding speaker timings and live build sessions. Message frequency is limited to up to 4 texts per day during events. Msg & data rates may apply. You can reply STOP at any moment to instantly discontinue.
                  </p>
                  <h4 className="font-bold text-slate-300 text-[13px] uppercase tracking-wide pt-2">3. Third-party Sharing</h4>
                  <p>
                    We guarantee zero sales or transfers of your contact metrics to unrelated marketing agencies. All data is stored securely using validated end-to-end cloud database encryption.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-slate-200">Last updated: May 2026</p>
                  <p>
                    Welcome to the AI Founder Hub platform registration process. By securing your seat, you agree to comply with the general terms:
                  </p>
                  <h4 className="font-bold text-slate-300 text-[13px] uppercase tracking-wide pt-2">1. Educational Disclaimer</h4>
                  <p>
                    The training delivers live AI software demonstrations utilizing modern generative APIs, prompting techniques, and frontend dev wrappers. Individual success is dependent on your implementation, active participation, and individual project variables.
                  </p>
                  <h4 className="font-bold text-slate-300 text-[13px] uppercase tracking-wide pt-2">2. Intellectual Property</h4>
                  <p>
                    Provided visual slides, code files, and workbook content shared throughout the platform are owned by AI Founder Hub. Standard usage grants a private, single-user license to implement the curriculum, but copying or reselling these resource modules is forbidden.
                  </p>
                  <h4 className="font-bold text-slate-300 text-[13px] uppercase tracking-wide pt-2">3. Free Access Guidelines</h4>
                  <p>
                    Your Virtual pass provides live broadcast streaming links during scheduled event hours. Resource access is maintained temporarily at the discretion of the Hub administrators unless a premium VIP recordings pass is acquired.
                  </p>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-950 flex justify-end bg-slate-900/40">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 font-bold text-xs text-slate-950 uppercase tracking-wider transition-colors cursor-pointer"
              >
                I Understand and Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
