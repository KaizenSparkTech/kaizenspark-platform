import { useEffect, useRef, useState } from "react";
import { ChevronRight, ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const stats = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "+", label: "Enterprise Clients" },
  { value: 12, suffix: "+", label: "Industries Served" },
  { value: 99.9, suffix: "%", label: "Uptime SLA" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2400;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target * 10) / 10);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const display = Number.isInteger(target)
    ? Math.floor(count).toString()
    : count.toFixed(1);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl md:text-4xl font-black text-blue-500">
        {display}
        {suffix}
      </p>
    </div>
  );
};

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 250]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [typedText, setTypedText] = useState("");
  const fullText = "Full-Stack IT & AI Engineering for Scalable Digital Infrastructure";

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setTypedText(fullText.slice(0, i));
        if (i >= fullText.length) clearInterval(interval);
      }, 35);
      return () => clearInterval(interval);
    }, 600);
    return () => clearTimeout(delay);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col bg-slate-950 overflow-hidden pt-20"
    >
      {/* Parallax Background Arrays */}
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            background: "radial-gradient(circle at top right, hsl(215 100% 50% / 0.15) 0%, transparent 50%), radial-gradient(circle at bottom left, hsl(230 100% 60% / 0.1) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* CONTENT WITH PARALLAX OPACITY / POSITION */}
      <motion.div className="container relative z-10 flex-1 flex flex-col justify-center items-center text-center pb-16 pt-12" style={{ y: y1, opacity }}>
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/80 backdrop-blur-sm mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[11px] text-slate-300 uppercase tracking-widest font-semibold flex items-center gap-2">
              KaizenSpark Tech
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight min-h-[140px] md:min-h-[120px]">
            {typedText || <span className="opacity-0">{fullText}</span>}
            {typedText.length < fullText.length && (
              <span className="inline-block w-[3px] h-[1em] bg-blue-500 ml-1 animate-pulse align-middle" />
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-3xl leading-relaxed"
          >
            We design, develop, and deploy enterprise-grade software systems, SaaS platforms, and AI-driven automation solutions for modern businesses worldwide.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollTo("#contact")}
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              Schedule Consultation
              <ChevronRight size={18} />
            </button>
            <button
              onClick={() => scrollTo("#services")}
              className="px-8 py-4 rounded-xl border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-300 font-semibold transition-all flex items-center justify-center gap-2"
            >
              Explore Services
            </button>
          </motion.div>

          {/* Scroll instruction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-300 transition-colors"
            onClick={() => scrollTo("#about")}
          >
            <span className="text-[10px] uppercase font-semibold tracking-widest">Scroll Down</span>
            <ArrowDown size={14} className="animate-bounce" />
          </motion.div>
        </div>
      </motion.div>

      {/* Stats bar */}
      <div className="border-t border-slate-800/50 bg-slate-900/80 backdrop-blur-md relative z-20 mt-auto">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-800/50">
            {stats.map((s, index) => (
              <div key={s.label} className={`text-center ${index === 0 ? "" : "border-slate-800/50"}`}>
                <Counter target={s.value} suffix={s.suffix} />
                <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest font-semibold">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
