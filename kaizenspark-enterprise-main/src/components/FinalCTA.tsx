import { useRef } from "react";
import { ChevronRight, Zap, Clock, Shield, Users, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const perks = [
  { icon: Clock, label: "30-Min Free Consultation" },
  { icon: Shield, label: "NDA on Request" },
  { icon: Users, label: "Dedicated POC" },
];

const testimonials = [
  { initials: "RK", name: "Rajesh Kumar", role: "CTO, National Education Group", text: "Exceptional delivery within timeline. Their team is highly skilled and professional." },
  { initials: "AP", name: "Anita Patel", role: "COO, RetailChain India", text: "Reduced our ops overhead by 30%. Outstanding technical expertise." },
];

const FinalCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="bg-slate-950 section-padding relative overflow-hidden border-t border-slate-900">
      {/* Clean elegant background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top center, hsl(215 100% 50% / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/10">
              <Zap size={14} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Get Started Today
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Ready to build <span className="text-blue-500">scalable digital infrastructure</span> for your business?
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Schedule a Consultation Today.
            </p>

            {/* Perks row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              {perks.map((perk) => (
                <div key={perk.label} className="flex items-center gap-2.5 text-slate-400 hover:text-slate-300 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center border border-slate-800">
                    <perk.icon size={14} className="text-blue-400" />
                  </div>
                  <span className="text-sm font-medium">{perk.label}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => scrollTo("#contact")}
                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors flex items-center justify-center gap-2 text-base"
              >
                Schedule Consultation
                <ChevronRight size={18} />
              </button>
              <button
                onClick={() => scrollTo("#services")}
                className="px-8 py-4 rounded-xl border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-300 font-semibold transition-all flex items-center justify-center gap-2 text-base group"
              >
                View Our Services
                <ArrowRight size={18} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Social proof */}
            <p className="text-xs text-slate-500 font-medium mb-12 uppercase tracking-widest">
              Trusted by 50+ enterprise clients across 12 industries
            </p>
          </motion.div>

          {/* Mini testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/80 transition-colors duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} size={14} className="text-blue-400 fill-blue-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-6 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-200">{t.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
