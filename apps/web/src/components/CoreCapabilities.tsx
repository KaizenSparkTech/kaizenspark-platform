import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layers, Code2, Database, Cloud, Bot, Shield, ArrowRight } from "lucide-react";

const capabilities = [
  {
    icon: Layers,
    title: "Technology Strategy & Architecture",
    tagline: "We design scalable system architectures with clean database structures, secure authentication models, and infrastructure planning.",
    tag: "Architecture",
  },
  {
    icon: Code2,
    title: "Enterprise Application Development",
    tagline: "Custom ERP, CRM, POS, HRMS, and internal operational systems tailored to business workflows.",
    tag: "Enterprise",
  },
  {
    icon: Database,
    title: "SaaS Platform Engineering",
    tagline: "Multi-tenant SaaS systems with subscription models, role-based access control, and scalable backend architecture.",
    tag: "SaaS",
  },
  {
    icon: Shield,
    title: "Backend & API Engineering",
    tagline: "RESTful APIs, microservices architecture, database optimization, authentication systems, and secure integrations.",
    tag: "Backend",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps Infrastructure",
    tagline: "Cloud deployment, CI/CD automation, server configuration, performance monitoring, and scalability optimization.",
    tag: "Cloud",
  },
  {
    icon: Bot,
    title: "AI & Intelligent Automation",
    tagline: "Business workflow automation, AI assistants, predictive dashboards, and intelligent reporting systems.",
    tag: "AI",
  },
];

interface FlipCardProps {
  cap: (typeof capabilities)[0];
  index: number;
}

const FlipCard = ({ cap, index }: FlipCardProps) => {
  const Icon = cap.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className="flip-card-wrapper h-[320px] lg:h-[300px]"
    >
      <div className="flip-card-inner">
        {/* ── FRONT ── */}
        <div
          className="flip-card-front bg-slate-900 border border-slate-800 shadow-xl p-8 flex flex-col justify-between group"
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-blue-500/50 transition-colors shadow-inner">
                <Icon className="w-6 h-6 text-blue-500" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 border border-slate-800 px-3 py-1 rounded-full bg-slate-950">
                {cap.tag}
              </span>
            </div>

            <h3 className="text-white font-bold text-xl leading-snug mb-3">
              {cap.title}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-blue-500/70 font-semibold tracking-widest uppercase mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
            <span>Explore Details</span>
            <span className="flip-hint-arrow">→</span>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="flip-card-back bg-blue-950/40 border border-blue-500/30 shadow-2xl p-8 flex flex-col justify-center text-center relative overflow-hidden backdrop-blur-md"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col items-center">
            <Icon className="w-8 h-8 text-blue-400 mb-4 opacity-80" />
            <p className="text-slate-300 text-[15px] leading-relaxed mb-6 font-medium">
              {cap.tagline}
            </p>

            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-auto px-6 py-2.5 rounded-lg text-xs font-bold text-white border border-blue-500/50 bg-blue-600/20 hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group w-full"
            >
              Discuss Project
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CoreCapabilities = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="services" className="relative bg-slate-950 py-32 border-t border-slate-900 overflow-hidden">
      {/* Scroll Parallax Grid */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 20%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 20%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Subtle top glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-600/40 to-transparent" />

      <motion.div className="container relative z-10" style={{ y: yContent }}>
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Core Capabilities
            </p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight max-w-4xl mx-auto"
          >
            Enterprise software requires <span className="text-blue-500">structured engineering.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            We operate with a systems-first mindset, ensuring architecture stability, security compliance, and long-term scalability. Hover to explore our service pillars.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {capabilities.map((cap, i) => (
            <FlipCard key={cap.title} cap={cap} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CoreCapabilities;
