import { useEffect, useRef, useState } from "react";
import { ChevronRight, Sparkles, Zap, TrendingUp, ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import LiveDashboard from "./LiveDashboard";
import MagneticButton from "./MagneticButton";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 250]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // GSAP text animation
  useEffect(() => {
    if (!headlineRef.current) return;

    const words = headlineRef.current.querySelectorAll('.word');
    
    gsap.fromTo(
      words,
      {
        opacity: 0,
        y: 50,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.3,
      }
    );
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const headline = "Full-Stack IT & AI Engineering for Scalable Digital Infrastructure";
  const words = headline.split(' ');

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden pt-20"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          }}
        />
      </div>

      {/* Light streaks */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          style={{
            width: '100%',
            top: `${20 + i * 30}%`,
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'linear',
          }}
        />
      ))}

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* CONTENT */}
      <motion.div 
        className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20" 
        style={{ y: y1, opacity, scale }}
      >
        {/* LEFT SIDE - Text Content */}
        <div className="flex flex-col items-start text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm mb-8 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all group cursor-pointer"
          >
            <Sparkles size={14} className="text-blue-400 group-hover:rotate-12 transition-transform" />
            <span className="text-[11px] text-slate-200 uppercase tracking-widest font-bold flex items-center gap-2">
              KaizenSpark Tech
            </span>
            <span className="text-[10px] text-blue-400 font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 animate-pulse">
              AI-Powered
            </span>
          </motion.div>

          {/* Headline with GSAP animation */}
          <h1 
            ref={headlineRef}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight"
            style={{ perspective: '1000px' }}
          >
            {words.map((word, index) => (
              <span
                key={index}
                className="word inline-block mr-3 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {word}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed"
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
            <MagneticButton
              onClick={() => scrollTo("#contact")}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/50 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <Zap size={18} className="relative group-hover:rotate-12 transition-transform" />
              <span className="relative">Schedule Consultation</span>
              <ChevronRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollTo("#services")}
              className="group px-8 py-4 rounded-xl border-2 border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/50 text-slate-300 hover:text-white font-bold transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <TrendingUp size={18} className="group-hover:scale-110 transition-transform" />
              Explore Services
            </MagneticButton>
          </motion.div>
        </div>

        {/* RIGHT SIDE - Live Dashboard */}
        <div className="relative">
          <LiveDashboard />
        </div>
      </motion.div>

      {/* Scroll instruction */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-300 transition-colors z-20"
        onClick={() => scrollTo("#about")}
      >
        <span className="text-[10px] uppercase font-semibold tracking-widest">Scroll Down</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
