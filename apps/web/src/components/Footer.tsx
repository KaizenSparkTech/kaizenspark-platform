import { useState } from "react";
import { Mail, MapPin, Phone, Send, Linkedin, Twitter, Github, CheckCircle2, Loader2 } from "lucide-react";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Our Services", href: "#services" },
      { label: "Case Studies", href: "#case-studies" },
      { label: "Careers", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Technology Strategy", href: "#services" },
      { label: "Application Engineering", href: "#services" },
      { label: "Cloud DevOps", href: "#services" },
      { label: "AI Automation", href: "#services" },
    ],
  },
  {
    title: "Technology",
    links: [
      { label: "React / Next.js", href: "#services" },
      { label: "Node.js / Python", href: "#services" },
      { label: "AWS / Azure / GCP", href: "#services" },
      { label: "PostgreSQL / MongoDB", href: "#services" },
    ],
  },
  {
    title: "Compliance",
    links: [
      { label: "Data Privacy Policy", href: "#contact" },
      { label: "ISO 27001 Aligned", href: "#contact" },
      { label: "GDPR Compliant", href: "#contact" },
      { label: "SOC 2 Practices", href: "#contact" },
    ],
  },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");

    // Simulate API call (frontend-only demo)
    await new Promise((res) => setTimeout(res, 1800));
    setStatus("success");
    setForm({ name: "", company: "", email: "", service: "", message: "" });

    setTimeout(() => setStatus("idle"), 5000);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {status === "success" ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h4 className="text-white font-bold text-lg">Message Sent!</h4>
          <p className="text-white/45 text-sm max-w-xs">
            Thank you for reaching out. Our team will get back to you within 2 business hours.
          </p>
        </div>
      ) : (
        <>
          {/* Row 1 */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="contact-label" htmlFor="footer-name">Full Name *</label>
              <input
                id="footer-name"
                type="text"
                placeholder="John Smith"
                className={`contact-input ${errors.name ? "border-rose-500/50" : ""}`}
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="contact-label" htmlFor="footer-company">Company</label>
              <input
                id="footer-company"
                type="text"
                placeholder="Acme Corp"
                className="contact-input"
                value={form.company}
                onChange={(e) => handleChange("company", e.target.value)}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="contact-label" htmlFor="footer-email">Business Email *</label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@company.com"
                className={`contact-input ${errors.email ? "border-rose-500/50" : ""}`}
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="contact-label" htmlFor="footer-service">Service Needed</label>
              <select
                id="footer-service"
                className="contact-input"
                value={form.service}
                onChange={(e) => handleChange("service", e.target.value)}
                style={{ appearance: "none" }}
              >
                <option value="" style={{ background: "#1a1f35" }}>Select a service…</option>
                {["Technology Strategy", "Application Engineering", "Backend & Data", "Cloud DevOps", "AI & Automation", "Security & Compliance", "Other"].map((s) => (
                  <option key={s} value={s} style={{ background: "#1a1f35" }}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div>
            <label className="contact-label" htmlFor="footer-message">Message *</label>
            <textarea
              id="footer-message"
              rows={4}
              placeholder="Tell us about your project, timeline, and goals…"
              className={`contact-input resize-none ${errors.message ? "border-rose-500/50" : ""}`}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
            {errors.message && <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>}
          </div>

          <button
            id="contact-submit-btn"
            type="submit"
            disabled={status === "submitting"}
            className="w-full hero-btn-primary py-4 text-[14px] font-bold rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send Message
                <Send size={15} />
              </>
            )}
          </button>

          <p className="text-[10px] text-white/20 text-center">
            We respond within 2 business hours · Your info is never shared
          </p>
        </>
      )}
    </form>
  );
};

const Footer = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-navy-deep">
      {/* Contact section — top block */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at top right, hsl(221 69% 33% / 0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[350px] h-[350px] pointer-events-none"
          style={{
            background: "radial-gradient(circle at bottom left, hsl(38 92% 50% / 0.07) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 animated-grid opacity-[0.025] pointer-events-none" />

        <div className="container py-14 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left: Contact info */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-amber-400 mb-4">
                Get in Touch
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">
                Let's Build Something{" "}
                <span className="text-gradient-gold">Remarkable</span>
              </h2>
              <p className="text-white/40 text-[15px] leading-relaxed mb-10 max-w-md">
                Ready to transform your digital infrastructure? Fill out the form and our
                enterprise solutions team will get back to you within 2 business hours.
              </p>

              {/* Contact cards */}
              <div className="space-y-4">
                <a
                  href="mailto:hr@kaizensparktech.com"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-amber-400/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0 group-hover:bg-amber-400/20 transition-colors">
                    <Mail className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-0.5">Email</p>
                    <p className="text-[13px] text-white/65 font-medium">hr@kaizensparktech.com</p>
                  </div>
                </a>
                <a
                  href="tel:+919150684544"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06] hover:border-blue-400/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-400/10 flex items-center justify-center shrink-0 group-hover:bg-blue-400/20 transition-colors">
                    <Phone className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-0.5">Phone</p>
                    <p className="text-[13px] text-white/65 font-medium">+91 91506 84544</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.03]">
                  <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 mb-0.5">Office</p>
                    <p className="text-[13px] text-white/65 font-medium">Chennai, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-8 flex items-center gap-3">
                <p className="text-[11px] text-white/20 uppercase tracking-widest font-medium">Follow us</p>
                {[
                  { icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-400 hover:bg-blue-400/10" },
                  { icon: Twitter, label: "Twitter", color: "hover:text-sky-400 hover:bg-sky-400/10" },
                  { icon: Github, label: "GitHub", color: "hover:text-white hover:bg-white/10" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className={`w-9 h-9 rounded-xl border border-white/[0.08] flex items-center justify-center text-white/30 transition-all ${s.color}`}
                  >
                    <s.icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Contact form */}
            <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 md:p-8">
              <h3 className="text-white font-black text-lg mb-1">Send us a Message</h3>
              <p className="text-white/35 text-[13px] mb-6">
                Free consultation · No obligations
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Links section */}
      <div className="container py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                <span className="text-white font-black text-sm">K</span>
              </div>
              <span className="text-white font-black text-[14px] tracking-tight">KAIZENSPARK</span>
            </div>
            <p className="text-[12px] text-white/30 leading-relaxed mb-5">
              Enterprise-grade IT and AI engineering services. From strategy through execution.
            </p>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-emerald-400/70 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational
              </span>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/25 mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="footer-link text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05]">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/20 font-medium">
            © 2026 KaizenSpark Tech Pvt Ltd · All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <button key={item} className="footer-link text-[11px]">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
