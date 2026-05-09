import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Users, Zap, Heart, TrendingUp } from 'lucide-react';

const openings = [
  {
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    location: 'Chennai, India',
    type: 'Full-time',
    experience: '5+ years',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
  },
  {
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Chennai, India / Remote',
    type: 'Full-time',
    experience: '3+ years',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Chennai, India',
    type: 'Full-time',
    experience: '3+ years',
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
  },
  {
    title: 'AI/ML Engineer',
    department: 'AI & Automation',
    location: 'Chennai, India',
    type: 'Full-time',
    experience: '4+ years',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP'],
  },
];

const benefits = [
  {
    icon: Zap,
    title: 'Cutting-Edge Tech',
    description: 'Work with latest technologies and frameworks',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Great Team',
    description: 'Collaborate with talented professionals',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Continuous learning and advancement opportunities',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    description: 'Flexible hours and remote work options',
    color: 'from-orange-500 to-red-500',
  },
];

const CareersSection = () => {
  return (
    <section id="careers" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl"
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
            <Briefcase size={16} className="text-blue-400" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              Join Our Team
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Build the Future with{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              KaizenSpark
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We're looking for talented individuals who are passionate about technology
            and want to make a real impact
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-sm">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Open Positions
          </h3>

          <div className="space-y-4 max-w-5xl mx-auto">
            {openings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="group relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 md:p-8 overflow-hidden cursor-pointer"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0 shadow-lg">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {job.title}
                        </h4>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Briefcase size={14} />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {job.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-slate-500">
                      Experience: <span className="text-slate-400 font-semibold">{job.experience}</span>
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group/btn px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-purple-500/30 shrink-0"
                  >
                    Apply Now
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-12 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Don't see a perfect fit?
            </h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-purple-500/40 mx-auto overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              <span className="relative">Send Your Resume</span>
              <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CareersSection;
