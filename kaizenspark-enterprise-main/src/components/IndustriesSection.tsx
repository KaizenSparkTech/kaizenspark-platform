import { useRef } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Factory, ShoppingCart, Rocket, Building2, Briefcase, CheckCircle2, ArrowUpRight } from "lucide-react";

const industries = [
  {
    icon: GraduationCap,
    label: "Education Institutions",
    desc: "Digital campus, LMS, and student management platforms",
    color: "from-violet-500/20 to-purple-500/10",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-300",
    glowColor: "hsl(262 83% 58% / 0.25)",
    tag: "EdTech",
    stat: "12+ deployments",
  },
  {
    icon: Factory,
    label: "MSMEs & Manufacturing",
    desc: "Process automation, ERP systems, and digital operations",
    color: "from-blue-500/20 to-cyan-500/10",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-300",
    glowColor: "hsl(217 91% 60% / 0.25)",
    tag: "ERP",
    stat: "20+ clients",
  },
  {
    icon: ShoppingCart,
    label: "Retail & E-Commerce",
    desc: "Omnichannel commerce, inventory, and fulfillment",
    color: "from-emerald-500/20 to-teal-500/10",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-300",
    glowColor: "hsl(160 84% 39% / 0.25)",
    tag: "Commerce",
    stat: "40+ outlets served",
  },
  {
    icon: Rocket,
    label: "Startups & SaaS",
    desc: "MVP development, architecture, and scale engineering",
    color: "from-amber-500/20 to-orange-500/10",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-300",
    glowColor: "hsl(38 92% 50% / 0.25)",
    tag: "SaaS",
    stat: "30+ MVPs launched",
  },
  {
    icon: Building2,
    label: "Real Estate",
    desc: "Property management, CRM, and listing platforms",
    color: "from-rose-500/20 to-pink-500/10",
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-300",
    glowColor: "hsl(350 89% 60% / 0.25)",
    tag: "PropTech",
    stat: "15+ platforms",
  },
  {
    icon: Briefcase,
    label: "Professional Services",
    desc: "Client management, billing, and operations",
    color: "from-sky-500/20 to-indigo-500/10",
    iconBg: "bg-sky-500/15",
    iconColor: "text-sky-300",
    glowColor: "hsl(199 89% 48% / 0.25)",
    tag: "B2B",
    stat: "8+ enterprise clients",
  },
];

const IndustriesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} id="industries" className="bg-secondary section-padding relative overflow-hidden">
      {/* Parallax grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 animated-grid opacity-[0.04] pointer-events-none will-change-transform"
      />
      {/* Top glow orb */}
      <div
        ref={orbRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none will-change-transform"
        style={{
          background: "radial-gradient(ellipse at top, hsl(38 92% 50% / 0.14) 0%, transparent 65%)",
        }}
      />
      {/* Bottom accent */}
      <div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(221 69% 55% / 0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-blue-300">
              Domain Expertise
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-secondary-foreground leading-tight mb-4">
            Industries{" "}
            <span className="text-gradient-gold relative">
              Served
              <span className="capability-underline" style={{ background: "linear-gradient(90deg, hsl(38 92% 50%), hsl(38 92% 65%), hsl(38 92% 50%))", backgroundSize: "200% 100%", animation: "shimmerLine 2.8s linear infinite" }} />
            </span>
          </h2>
          <p className="text-body-lg text-secondary-foreground/55 mt-3 max-w-2xl mx-auto">
            Deep vertical expertise across sectors that demand reliability and scale.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`bg-gradient-to-br ${ind.color} border border-white/10 rounded-3xl p-6 hover:border-white/22 transition-all duration-300 group relative overflow-hidden`}
              style={{
                boxShadow: "0 0 0 0px transparent",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 60px ${ind.glowColor}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 0px transparent";
              }}
            >
              {/* Corner tag */}
              <div className="absolute top-4 right-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/25 border border-white/10 px-2.5 py-1 rounded-full group-hover:text-white/45 group-hover:border-white/20 transition-all">
                  {ind.tag}
                </span>
              </div>

              {/* Stat overlay */}
              <div className="absolute bottom-14 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider">{ind.stat}</span>
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl ${ind.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                <ind.icon className={`w-6 h-6 ${ind.iconColor}`} />
              </div>

              <h3 className="font-bold text-white mb-2 leading-snug text-[15px] group-hover:text-white transition-colors">{ind.label}</h3>
              <p className="text-[13px] text-white/50 leading-relaxed group-hover:text-white/70 transition-colors mb-5">
                {ind.desc}
              </p>

              {/* Bottom CTA row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white/25 uppercase tracking-wider group-hover:text-white/50 transition-colors">
                  <CheckCircle2 size={12} />
                  Active Practice
                </div>
                <div className="w-7 h-7 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white/10">
                  <ArrowUpRight size={13} className="text-white/50" />
                </div>
              </div>

              {/* Background shimmer */}
              <div className="absolute inset-0 -skew-y-3 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
