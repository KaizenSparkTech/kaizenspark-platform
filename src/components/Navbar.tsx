import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, Mail, Phone, Linkedin } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Technology", href: "#products" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Scroll progress bar
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      progressRef.current = progress;
      setScrollProgress(progress);

      // Active section detection
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`navbar-fixed w-full z-50 transition-all duration-500 ${scrolled
        ? "bg-background/98 backdrop-blur-2xl shadow-xl shadow-black/5 border-b border-blue-500/10"
        : "bg-background/70 backdrop-blur-lg"
        }`}
    >
      {/* Scroll progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 shadow-lg shadow-blue-500/50 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top utility bar */}
      <div className="hidden lg:block border-b border-border/50">
        <div className="container flex items-center justify-end h-8 gap-6">
          <a
            href="mailto:hr@kaizensparktech.com"
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail size={11} />
            hr@kaizensparktech.com
          </a>
          <a
            href="tel:+919150684544"
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone size={11} />
            +91 91506 84544
          </a>
          <span className="text-[11px] text-border">|</span>
          <a
            href="https://www.linkedin.com/company/kaizensparktech/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-blue-500 transition-colors"
          >
            <Linkedin size={11} />
            Follow us
          </a>
          <span className="text-[11px] text-muted-foreground">Chennai, India</span>
        </div>
      </div>

      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#home"
          onClick={() => scrollTo("#home")}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-10 h-10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <img 
              src="/logo.svg" 
              alt="KaizenSpark Tech" 
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(37,99,235,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(37,99,235,0.8)] transition-all"
            />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-slate-300 font-bold text-[17px] tracking-tight group-hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              KaizenSpark
            </span>
            <span className="text-blue-500 font-bold text-[17px] tracking-tight group-hover:text-blue-400 transition-colors drop-shadow-[0_0_12px_rgba(37,99,235,0.6)]">
              Tech
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-[13px] px-3.5 py-2 rounded-lg font-semibold transition-all duration-300 relative group ${isActive
                  ? "text-blue-500 bg-blue-500/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-slate-800/50"
                  }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
                )}
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
          <button
            onClick={() => scrollTo("#contact")}
            className="ml-3 relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg text-[13px] font-bold hover:from-blue-500 hover:to-blue-600 transition-all duration-300 flex items-center gap-1.5 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 group overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <span className="relative">Request Consultation</span>
            <ChevronRight size={14} className="relative group-hover:translate-x-0.5 transition-transform" />
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-foreground p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className={`transition-transform duration-300 ${mobileOpen ? "rotate-90" : "rotate-0"}`}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </div>
        </button>
      </div>

      {/* Mobile nav */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <nav className="bg-background shadow-lg border-t border-border pb-4">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{ animationDelay: `${i * 40}ms` }}
                className={`block w-full text-left px-6 py-3.5 text-sm font-medium transition-all duration-200 border-b border-border/50 last:border-0 ${isActive
                  ? "text-blue-600 bg-blue-50/50 dark:bg-blue-900/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
              >
                <span className="flex items-center gap-2">
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />}
                  {link.label}
                </span>
              </button>
            );
          })}
          <div className="px-6 pt-4">
            <button
              onClick={() => scrollTo("#contact")}
              className="w-full bg-blue-600 text-white px-5 py-3.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 flex justify-center items-center gap-2"
            >
              Request Consultation <ChevronRight size={16} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
