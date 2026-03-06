import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, Mail, Phone } from "lucide-react";

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
      className={`navbar-fixed w-full z-50 transition-all duration-400 ${scrolled
        ? "bg-background/95 backdrop-blur-xl shadow-md border-b border-border"
        : "bg-background/80 backdrop-blur-md"
        }`}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-blue-500 transition-all duration-100 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

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
          <span className="text-[11px] text-muted-foreground">Chennai, India</span>
        </div>
      </div>

      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#home"
          onClick={() => scrollTo("#home")}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
            <span className="text-white font-black text-base leading-none">K</span>
          </div>
          <div>
            <span className="text-foreground font-black text-[15px] tracking-tight">
              KAIZENSPARK
            </span>
            <span className="hidden sm:inline text-muted-foreground text-[9px] ml-1.5 uppercase tracking-[0.15em] font-medium">
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
                className={`text-[13px] px-3.5 py-2 rounded-lg font-medium transition-all duration-200 relative ${isActive
                  ? "text-blue-600 bg-blue-50/50 dark:bg-blue-900/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
                )}
              </button>
            );
          })}
          <button
            onClick={() => scrollTo("#contact")}
            className="ml-3 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-[13px] font-bold hover:bg-blue-700 transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
          >
            Request Consultation
            <ChevronRight size={14} />
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
