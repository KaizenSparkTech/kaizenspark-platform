import { useRef } from "react";
import { ArrowRight, Zap, Award, Layers, Building, ShieldCheck, Heart } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const outcomes = [
  { text: "Digital transformation of legacy processes", icon: "01", tag: "Strategy", color: "text-blue-500", bg: "bg-blue-500/10" },
  { text: "Custom ERP and CRM development", icon: "02", tag: "Engineering", color: "text-blue-500", bg: "bg-blue-500/10" },
  { text: "SaaS platform engineering", icon: "03", tag: "SaaS", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { text: "AI-driven workflow automation", icon: "04", tag: "AI", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { text: "Secure cloud-native deployment", icon: "05", tag: "Cloud", color: "text-violet-500", bg: "bg-violet-500/10" },
  { text: "Long-term technical partnership and support", icon: "06", tag: "Support", color: "text-violet-500", bg: "bg-violet-500/10" },
];

const highlights = [
  { value: "Agile", label: "Structured Sprints", icon: Layers, color: "text-blue-500" },
  { value: "Scale", label: "Enterprise Ready", icon: Building, color: "text-blue-600" },
  { value: "Secure", label: "Compliance First", icon: ShieldCheck, color: "text-indigo-500" },
];

const ExecutiveOverview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-background section-padding relative overflow-hidden"
    >
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Who We Are
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-6 text-foreground tracking-tight">
              Engineering End-to-End{" "}
              <span className="text-blue-600">Digital Infrastructure</span>
            </h2>
            <div className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl space-y-4">
              <p>
                KaizenSpark Tech Pvt. Ltd. is a full-stack IT engineering company delivering custom enterprise software, scalable SaaS platforms, cloud infrastructure solutions, and AI automation systems for businesses seeking structured digital transformation.
              </p>
              <p>
                We operate with a systems-first mindset, ensuring architecture stability, security compliance, and long-term scalability.
              </p>
            </div>

            {/* Highlight stats — solid elegant cards */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center p-5 rounded-2xl bg-card border border-border shadow-sm"
                >
                  <h.icon className={`w-5 h-5 mx-auto mb-3 ${h.color} opacity-80`} />
                  <p className="text-xl font-black text-foreground mb-1">{h.value}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold leading-tight">{h.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              id="about-cta-services"
              onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2.5 bg-blue-600 text-white px-7 py-3.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 group relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap size={16} />
              <span>Explore Our Capabilities</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

          {/* Right column — outcome list */}
          <motion.div style={{ y: y2 }} className="space-y-4 bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden">
            {/* Soft decorative background element */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />

            <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-foreground">
              <Award size={20} className="text-blue-500" />
              What We Deliver
            </h3>
            <div className="space-y-3 relative z-10">
              {outcomes.map((item, i) => (
                <motion.div
                  key={item.icon}
                  initial={{ opacity: 0, x: 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border hover:border-blue-500/20 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <span className={`text-xs font-black ${item.color} font-mono tracking-tighter`}>
                      {item.icon}
                    </span>
                  </div>
                  <p className="text-sm border-l border-border pl-4 font-medium text-foreground/80 leading-relaxed flex-1 group-hover:text-foreground transition-colors">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExecutiveOverview;
