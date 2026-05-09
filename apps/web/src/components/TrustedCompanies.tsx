import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const companies = [
  { name: 'Stripe', logo: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' },
  { name: 'Webflow', logo: 'https://cdn.worldvectorlogo.com/logos/webflow-logo.svg' },
  { name: 'Datadog', logo: 'https://cdn.worldvectorlogo.com/logos/datadog.svg' },
  { name: 'AWS', logo: 'https://cdn.worldvectorlogo.com/logos/aws-2.svg' },
  { name: 'Zapier', logo: 'https://cdn.worldvectorlogo.com/logos/zapier.svg' },
  { name: 'Firebase', logo: 'https://cdn.worldvectorlogo.com/logos/firebase-1.svg' },
];

const TrustedCompanies = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('trusted-companies');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="trusted-companies" className="relative py-20 overflow-hidden border-y border-slate-800/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-slate-500 uppercase tracking-[0.2em] font-bold mb-3">
            Trusted by Growing Companies
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            Startup and enterprise teams worldwide rely on our{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              technology engineering expertise
            </span>
          </h3>
        </motion.div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.8, filter: 'grayscale(100%)' }}
              animate={
                isVisible
                  ? { opacity: 1, scale: 1, filter: 'grayscale(100%)' }
                  : {}
              }
              whileHover={{
                scale: 1.1,
                filter: 'grayscale(0%)',
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
              className="flex items-center justify-center p-6 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all cursor-pointer group"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-8 w-auto opacity-40 group-hover:opacity-100 transition-opacity"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `<span class="text-slate-500 font-bold text-sm">${company.name}</span>`;
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '150+', label: 'Projects Delivered' },
            { value: '50+', label: 'Enterprise Clients' },
            { value: '12+', label: 'Industries Served' },
            { value: '99.9%', label: 'Uptime SLA' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 + index * 0.1 }}
              className="text-center group"
            >
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
