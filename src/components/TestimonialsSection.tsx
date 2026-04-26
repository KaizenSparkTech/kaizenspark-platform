import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Quote, Star, ArrowRight, Sparkles, TrendingUp, Zap, Award, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Chief Technology Officer',
    company: 'TechCorp Inc.',
    content: 'KaizenSpark transformed our legacy system into a modern, scalable platform. Their expertise in cloud architecture and DevOps is unmatched. We saw 10x performance improvement.',
    rating: 5,
    metric: '10x Performance',
    value: '+250%',
    color: 'from-blue-500 to-cyan-500',
    icon: Zap,
    achievements: ['Cloud Migration', 'DevOps Setup', 'Performance Optimization'],
  },
  {
    name: 'Michael Chen',
    role: 'VP of Engineering',
    company: 'DataFlow Systems',
    content: 'The AI automation solutions they built saved us 40% in operational costs. Exceptional team with deep technical knowledge and incredible attention to detail.',
    rating: 5,
    metric: '40% Cost Savings',
    value: '$2M+',
    color: 'from-purple-500 to-pink-500',
    icon: TrendingUp,
    achievements: ['AI Integration', 'Process Automation', 'Cost Reduction'],
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    company: 'CloudScale',
    content: 'From concept to deployment in 8 weeks. Their agile approach and communication made the entire process seamless. Best development partner we\'ve ever worked with.',
    rating: 5,
    metric: '8 Week Delivery',
    value: '100%',
    color: 'from-green-500 to-emerald-500',
    icon: Sparkles,
    achievements: ['Rapid Development', 'Agile Process', 'On-Time Delivery'],
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const handleDotClick = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const currentTestimonial = testimonials[current];
  const Icon = currentTestimonial.icon;

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Dynamic gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -80, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm mb-8 shadow-lg shadow-blue-500/10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Award size={16} className="text-blue-400" />
            </motion.div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              Client Success Stories
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Trusted by{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Industry Leaders
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Real results from real clients. See the{' '}
            <span className="text-blue-400 font-semibold">transformative impact</span> we deliver
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="max-w-6xl mx-auto mb-16">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
              }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-950/95 backdrop-blur-2xl border border-slate-800/50 rounded-3xl overflow-hidden shadow-2xl">
                {/* Animated gradient border */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${currentTestimonial.color} opacity-10`}
                  animate={{
                    opacity: [0.05, 0.15, 0.05],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="relative z-10 p-12 md:p-16">
                  <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left - Quote and Content */}
                    <div className="lg:col-span-2">
                      {/* Quote icon */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentTestimonial.color} flex items-center justify-center mb-8 shadow-lg`}
                      >
                        <Quote className="w-10 h-10 text-white" />
                      </motion.div>

                      {/* Rating */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex gap-1 mb-6"
                      >
                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                          >
                            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Testimonial text */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8"
                      >
                        "{currentTestimonial.content}"
                      </motion.p>

                      {/* Author info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center gap-4 mb-8"
                      >
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentTestimonial.color} flex items-center justify-center shadow-lg`}>
                          <span className="text-2xl font-black text-white">
                            {currentTestimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white">
                            {currentTestimonial.name}
                          </div>
                          <div className="text-blue-400 font-semibold text-sm">
                            {currentTestimonial.role}
                          </div>
                          <div className="text-slate-500 text-xs">
                            {currentTestimonial.company}
                          </div>
                        </div>
                      </motion.div>

                      {/* Achievements */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-wrap gap-2"
                      >
                        {currentTestimonial.achievements.map((achievement, i) => (
                          <motion.div
                            key={achievement}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + i * 0.1 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            {achievement}
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Right - Metrics */}
                    <div className="space-y-6">
                      {/* Main metric */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className={`relative bg-gradient-to-br ${currentTestimonial.color} rounded-2xl p-8 shadow-2xl overflow-hidden`}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                          className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                        />
                        <div className="relative z-10">
                          <Icon className="w-10 h-10 text-white mb-4" />
                          <div className="text-4xl font-black text-white mb-2">
                            {currentTestimonial.value}
                          </div>
                          <div className="text-white/80 font-semibold text-sm">
                            {currentTestimonial.metric}
                          </div>
                        </div>
                      </motion.div>

                      {/* Additional stats */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-slate-950/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6"
                      >
                        <div className="space-y-4">
                          <div>
                            <div className="text-slate-500 text-xs mb-1">Project Duration</div>
                            <div className="text-xl font-bold text-white">8-12 weeks</div>
                          </div>
                          <div className="h-px bg-slate-800" />
                          <div>
                            <div className="text-slate-500 text-xs mb-1">Team Size</div>
                            <div className="text-xl font-bold text-white">5-8 experts</div>
                          </div>
                          <div className="h-px bg-slate-800" />
                          <div>
                            <div className="text-slate-500 text-xs mb-1">Satisfaction</div>
                            <div className="flex items-center gap-2">
                              <div className="text-xl font-bold text-white">100%</div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className={`absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br ${currentTestimonial.color} opacity-5 rounded-full blur-3xl`} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDotClick(index)}
              className="group relative"
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current
                    ? `bg-gradient-to-r ${testimonial.color} shadow-lg`
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
              />
              {index === current && (
                <motion.div
                  layoutId="activeDot"
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${testimonial.color} blur-md opacity-50`}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-purple-500/40 mx-auto overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            <span className="relative">Start Your Success Story</span>
            <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
