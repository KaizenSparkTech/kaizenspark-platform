import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, TrendingUp, Layers, CheckCircle2, Server, Smartphone } from "lucide-react";

const caseStudies = [
  {
    client: "SaaS Internship Management Platform",
    sector: "Education & SaaS",
    sectorColor: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
    icon: Server,
    challenge: "Managing internship applications, tracking progress, and issuing certificates manually was incredibly inefficient and error-prone.",
    solution: "Designed a multi-role SaaS platform with secure authentication, automated certificate generation, and structured workflow automation.",
    stack: ["React", "Node.js", "PostgreSQL", "AWS"],
    outcome: "Reduced administrative workload by 80% and automated the generation of over 10,000 verified certificates.",
    metric: "80%",
    metricLabel: "Time Saved",
  },
  {
    client: "NFC Digital Identity System",
    sector: "Enterprise Tech",
    sectorColor: "bg-indigo-500/10 text-indigo-600 border border-indigo-500/20",
    icon: Smartphone,
    challenge: "Traditional paper-based business cards and identity verification were outdated, hard to update, and environmentally wasteful.",
    solution: "Developed a scalable digital identity platform integrating QR/NFC-based profile access with centralized data management.",
    stack: ["Next.js", "MongoDB", "Express", "GCP"],
    outcome: "Enabled instantaneous profile sharing and effortless centralized updates for thousands of corporate employees.",
    metric: "10K+",
    metricLabel: "Active Profiles",
  }
];

const stackColors: Record<string, string> = {
  React: "bg-blue-50 text-blue-600 border-blue-100",
  "Node.js": "bg-green-50 text-green-700 border-green-100",
  PostgreSQL: "bg-indigo-50 text-indigo-700 border-indigo-100",
  AWS: "bg-amber-50 text-amber-700 border-amber-100",
  "Next.js": "bg-slate-100 text-slate-700 border-slate-200",
  MongoDB: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Express: "bg-gray-100 text-gray-700 border-gray-200",
  GCP: "bg-blue-50 text-blue-600 border-blue-100",
};

const CaseStudiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} id="case-studies" className="bg-slate-50 py-24 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwcjEzMjgiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgye1Y2aDRWNGgtNHpNNiAzNHYtNEg0djRIMHYyaDR2NGhydi00aDR2LTJINnpNNiA0VjBINFY0SDB2Mmg0djRoMlY2aDRWNEg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50 pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Featured Case Studies
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
            Real <span className="text-blue-600">Business Impact</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See how we engineer scalable systems that solve complex operational challenges and drive growth.
          </p>
        </motion.div>

        <motion.div style={{ y: y1 }} className="space-y-8 max-w-5xl mx-auto">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-400 group"
            >
              <div className="p-8 md:p-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-6">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
                      <cs.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <span className={`inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${cs.sectorColor} mb-3`}>
                        {cs.sector}
                      </span>
                      <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                        {cs.client}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 shrink-0">
                    <div>
                      <p className="text-3xl font-black text-slate-900">{cs.metric}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{cs.metricLabel}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white text-blue-600 transition-all duration-300 ml-4">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 pl-0 md:pl-[76px]">
                  {/* Left Column: Context */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                        <Layers size={14} className="text-slate-400" />
                        The Challenge
                      </p>
                      <p className="text-[15px] text-slate-600 leading-relaxed font-medium">
                        {cs.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                        <Layers size={14} className="text-blue-500" />
                        The Architecture
                      </p>
                      <p className="text-[15px] text-slate-700 leading-relaxed font-medium border-l-2 border-blue-500 pl-4 bg-blue-50/50 py-2 pr-2 rounded-r-lg">
                        {cs.solution}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Stack & Outcome */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                        Technology Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cs.stack.map((s) => (
                          <span
                            key={s}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${stackColors[s] || "bg-slate-100 text-slate-600 border-slate-200"} hover:scale-105 transition-transform cursor-default`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-5">
                      <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3 flex items-center gap-2">
                        <TrendingUp size={14} />
                        Measurable Outcome
                      </p>
                      <p className="text-[15px] text-emerald-950 font-semibold leading-relaxed">
                        {cs.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom action bar */}
              <div className="border-t border-slate-100 px-6 md:px-10 py-4 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Deployed & Monitored
                </div>
                <button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest flex items-center gap-1.5 group/btn"
                >
                  Discuss a Similar Project
                  <ArrowUpRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
