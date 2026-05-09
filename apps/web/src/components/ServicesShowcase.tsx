import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code2, Database, Cloud, Bot, Shield, Zap, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'Enterprise applications with React, Node.js, and modern frameworks',
    gradient: 'from-blue-500 to-cyan-500',
    features: ['React/Next.js', 'Node.js/Python', 'TypeScript', 'REST APIs'],
  },
  {
    icon: Database,
    title: 'SaaS Platform Engineering',
    description: 'Multi-tenant systems with subscription models and role-based access',
    gradient: 'from-purple-500 to-pink-500',
    features: ['Multi-tenancy', 'Subscriptions', 'RBAC', 'Analytics'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'AWS, Azure, GCP deployment with CI/CD automation',
    gradient: 'from-green-500 to-emerald-500',
    features: ['AWS/Azure/GCP', 'Docker/K8s', 'CI/CD', 'Monitoring'],
  },
  {
    icon: Bot,
    title: 'AI & Automation',
    description: 'Intelligent workflows, chatbots, and predictive analytics',
    gradient: 'from-orange-500 to-red-500',
    features: ['ML Models', 'Chatbots', 'Automation', 'Analytics'],
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security with SOC 2, GDPR compliance',
    gradient: 'from-indigo-500 to-blue-500',
    features: ['SOC 2', 'GDPR', 'Encryption', 'Auditing'],
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Speed optimization, caching strategies, and scalability',
    gradient: 'from-yellow-500 to-orange-500',
    features: ['Caching', 'CDN', 'Load Balancing', 'Optimization'],
  },
];

interface ServiceCardProps {
  service: typeof services[0];
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative"
    >
      <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>

        {/* Icon */}
        <motion.div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg relative`}
          style={{ transformStyle: 'preserve-3d', translateZ: '50px' }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon className="w-8 h-8 text-white" />
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} blur-xl opacity-50`} />
        </motion.div>

        {/* Content */}
        <div style={{ transformStyle: 'preserve-3d', translateZ: '30px' }}>
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
            {service.title}
          </h3>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {service.features.map((feature) => (
              <span
                key={feature}
                className="text-xs px-3 py-1 rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/50 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors"
          >
            Learn More
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Corner accent */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
      </div>
    </motion.div>
  );
};

const ServicesShowcase = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Animated orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6"
          >
            <Zap size={14} className="text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Our Services
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Complete Technology Solutions for{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Modern Businesses
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            From concept to deployment, we provide end-to-end engineering services
            that scale with your business growth
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
