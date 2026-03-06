import { useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles, ArrowUpRight, TrendingUp } from "lucide-react";

const products = [
  {
    name: "SkillTank",
    desc: "Enterprise learning management & skill assessment platform with AI-powered course recommendations.",
    tag: "EdTech",
    tagColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    accentFrom: "from-violet-600/15",
    accentTo: "to-purple-600/5",
    accentMid: "via-violet-500/8",
    borderColor: "border-violet-500/20",
    glowColor: "text-violet-400",
    glowBg: "violet-500",
    status: "Live",
    statusColor: "bg-emerald-500/15 text-emerald-400",
    users: "2,400+",
    growth: "+38%",
  },
  {
    name: "TapZX",
    desc: "Digital payment integration & transaction management system with real-time analytics.",
    tag: "FinTech",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    accentFrom: "from-amber-600/15",
    accentTo: "to-orange-600/5",
    accentMid: "via-amber-500/8",
    borderColor: "border-amber-500/20",
    glowColor: "text-amber-400",
    glowBg: "amber-500",
    status: "Live",
    statusColor: "bg-emerald-500/15 text-emerald-400",
    users: "15K+",
    growth: "+52%",
  },
  {
    name: "RetailZen",
    desc: "Omnichannel retail operations & inventory platform with demand forecasting for multi-location chains.",
    tag: "Retail",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    accentFrom: "from-emerald-600/15",
    accentTo: "to-teal-600/5",
    accentMid: "via-emerald-500/8",
    borderColor: "border-emerald-500/20",
    glowColor: "text-emerald-400",
    glowBg: "emerald-500",
    status: "Live",
    statusColor: "bg-emerald-500/15 text-emerald-400",
    users: "180+",
    growth: "+27%",
  },
  {
    name: "IntelliMarkx",
    desc: "AI-powered marketing analytics & campaign orchestration with predictive audience segmentation.",
    tag: "MarTech",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    accentFrom: "from-cyan-600/15",
    accentTo: "to-sky-600/5",
    accentMid: "via-cyan-500/8",
    borderColor: "border-cyan-500/20",
    glowColor: "text-cyan-400",
    glowBg: "cyan-500",
    status: "Beta",
    statusColor: "bg-amber-500/15 text-amber-400",
    users: "340+",
    growth: "+64%",
  },
  {
    name: "Certifizor",
    desc: "Automated certificate generation & verification system with blockchain-backed credential management.",
    tag: "Compliance",
    tagColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    accentFrom: "from-rose-600/15",
    accentTo: "to-pink-600/5",
    accentMid: "via-rose-500/8",
    borderColor: "border-rose-500/20",
    glowColor: "text-rose-400",
    glowBg: "rose-500",
    status: "Live",
    statusColor: "bg-emerald-500/15 text-emerald-400",
    users: "5,000+",
    growth: "+41%",
  },
];

const ProductPortfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} id="products" className="bg-background section-padding relative overflow-hidden">
      {/* Parallax background blobs */}
      <div
        ref={orbRef}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none will-change-transform"
        style={{
          background: "radial-gradient(circle, hsl(38 92% 50% / 0.05) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(221 69% 33% / 0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-5">
            <Sparkles size={12} className="text-accent" />
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
              Our Products
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight mb-4">
            Proprietary{" "}
            <span className="text-gradient-gold relative">
              SaaS Platforms
              <span className="capability-underline" style={{ background: "linear-gradient(90deg, hsl(38 92% 50%), hsl(38 92% 65%), hsl(38 92% 50%))", backgroundSize: "200% 100%", animation: "shimmerLine 2.8s linear infinite" }} />
            </span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Engineered in-house for vertical-specific use cases. Production-ready and battle-tested.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`relative bg-gradient-to-br ${p.accentFrom} ${p.accentMid} ${p.accentTo} border ${p.borderColor} rounded-3xl p-6 group overflow-hidden`}
            >
              {/* Top edge glow */}
              <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent ${p.glowColor} opacity-25 group-hover:opacity-60 transition-opacity`} />

              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <span className={`text-[9px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full border ${p.tagColor}`}>
                  {p.tag}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${p.statusColor} flex items-center gap-1`}>
                    <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
                    {p.status}
                  </span>
                  <ExternalLink className={`w-3.5 h-3.5 ${p.glowColor} opacity-25 group-hover:opacity-100 transition-opacity`} />
                </div>
              </div>

              {/* Product name */}
              <h3 className="text-xl font-black text-foreground mb-2 group-hover:text-gradient-blue transition-all">
                {p.name}
              </h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-5">
                {p.desc}
              </p>

              {/* Metrics row */}
              <div className="flex items-center gap-4 mb-5 py-3 border-t border-current/10">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">Users</p>
                  <p className={`text-sm font-black ${p.glowColor}`}>{p.users}</p>
                </div>
                <div className="w-px h-8 bg-current opacity-10" />
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">Growth</p>
                  <div className={`text-sm font-black flex items-center gap-1 ${p.glowColor}`}>
                    <TrendingUp size={12} />
                    {p.growth}
                  </div>
                </div>
              </div>

              {/* Bottom anchor */}
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${p.glowColor} opacity-50 group-hover:opacity-100 uppercase tracking-wider transition-all hover:gap-2.5`}
              >
                <Sparkles size={11} />
                Request Demo
                <ArrowUpRight size={11} />
              </button>

              {/* Decorative corner glow */}
              <div className={`absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br ${p.accentFrom} ${p.accentTo} blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none`} />

              {/* Decorative grid pattern inside card */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] rounded-3xl overflow-hidden"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPortfolio;
