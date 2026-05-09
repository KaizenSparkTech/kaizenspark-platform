import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, Users, Zap, Heart, TrendingUp, Upload, CheckCircle2, Loader2, AlertCircle, X, Award, Coffee, Rocket, Globe, Code, Palette, Database, Brain, DollarSign, Umbrella, GraduationCap, Plane, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

const openings = [
  {
    id: 1,
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    location: 'Chennai, India',
    type: 'Full-time',
    experience: '5+ years',
    salary: '₹15-25 LPA',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'Docker'],
    description: 'We are looking for an experienced Full-Stack Developer to join our engineering team. You will be responsible for building scalable web applications and working with modern technologies.',
    responsibilities: [
      'Design and develop full-stack web applications using React and Node.js',
      'Collaborate with cross-functional teams to define and ship new features',
      'Write clean, maintainable, and well-documented code',
      'Participate in code reviews and mentor junior developers',
      'Optimize applications for maximum speed and scalability',
      'Implement security and data protection measures',
    ],
    requirements: [
      '5+ years of experience in full-stack development',
      'Strong knowledge of React, Node.js, and TypeScript',
      'Experience with cloud platforms (AWS, Azure, or GCP)',
      'Familiarity with microservices architecture',
      'Excellent problem-solving and communication skills',
      'Bachelor\'s degree in Computer Science or related field',
    ],
  },
  {
    id: 2,
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Chennai, India / Remote',
    type: 'Full-time',
    experience: '3+ years',
    salary: '₹12-20 LPA',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Jenkins'],
    description: 'Join our infrastructure team to build and maintain scalable cloud infrastructure. You will work with cutting-edge DevOps tools and practices.',
    responsibilities: [
      'Design and implement CI/CD pipelines for automated deployments',
      'Manage and optimize cloud infrastructure on AWS',
      'Containerize applications using Docker and orchestrate with Kubernetes',
      'Monitor system performance and implement improvements',
      'Implement infrastructure as code using Terraform',
      'Ensure security best practices across all systems',
    ],
    requirements: [
      '3+ years of DevOps or SRE experience',
      'Strong knowledge of Docker, Kubernetes, and AWS',
      'Experience with CI/CD tools (Jenkins, GitLab CI, GitHub Actions)',
      'Proficiency in scripting languages (Bash, Python)',
      'Understanding of infrastructure as code principles',
      'Experience with monitoring tools (Prometheus, Grafana)',
    ],
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Chennai, India',
    type: 'Full-time',
    experience: '3+ years',
    salary: '₹10-18 LPA',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research', 'Adobe XD', 'Sketch'],
    description: 'We are seeking a creative UI/UX Designer to create beautiful and intuitive user experiences. You will work closely with product and engineering teams.',
    responsibilities: [
      'Design user interfaces for web and mobile applications',
      'Create and maintain comprehensive design systems',
      'Conduct user research and usability testing',
      'Collaborate with developers to ensure design implementation',
      'Create interactive prototypes and wireframes',
      'Present design concepts to stakeholders',
    ],
    requirements: [
      '3+ years of UI/UX design experience',
      'Expert proficiency in Figma and design tools',
      'Strong portfolio demonstrating design skills',
      'Understanding of user-centered design principles',
      'Experience with design systems and component libraries',
      'Excellent communication and presentation skills',
    ],
  },
  {
    id: 4,
    title: 'AI/ML Engineer',
    department: 'AI & Automation',
    location: 'Chennai, India',
    type: 'Full-time',
    experience: '4+ years',
    salary: '₹18-30 LPA',
    icon: Brain,
    color: 'from-orange-500 to-red-500',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision', 'MLOps'],
    description: 'Join our AI team to build intelligent automation solutions. You will work on cutting-edge machine learning projects and AI-driven applications.',
    responsibilities: [
      'Develop and deploy machine learning models at scale',
      'Work on NLP, computer vision, and deep learning projects',
      'Optimize model performance and reduce inference time',
      'Collaborate with engineering teams to integrate AI solutions',
      'Research and implement state-of-the-art AI techniques',
      'Build MLOps pipelines for model training and deployment',
    ],
    requirements: [
      '4+ years of ML/AI engineering experience',
      'Strong knowledge of Python and ML frameworks',
      'Experience with TensorFlow, PyTorch, or similar',
      'Deep understanding of NLP and deep learning',
      'Published research papers or strong portfolio',
      'Master\'s or PhD in Computer Science, AI, or related field preferred',
    ],
  },
];

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Salary',
    description: 'Industry-leading compensation packages with performance bonuses',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Umbrella,
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance for you and your family',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: GraduationCap,
    title: 'Learning Budget',
    description: '₹50,000 annual budget for courses, conferences, and certifications',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Plane,
    title: 'Flexible Time Off',
    description: 'Unlimited PTO policy with 15 paid holidays per year',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Zap,
    title: 'Cutting-Edge Tech',
    description: 'Work with latest technologies and frameworks',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Users,
    title: 'Great Team',
    description: 'Collaborate with talented professionals from top companies',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Clear career progression paths and mentorship programs',
    color: 'from-teal-500 to-green-500',
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    description: 'Flexible hours, remote work options, and wellness programs',
    color: 'from-pink-500 to-rose-500',
  },
];

const stats = [
  { value: '50+', label: 'Team Members', icon: Users },
  { value: '100+', label: 'Projects Delivered', icon: Rocket },
  { value: '15+', label: 'Countries Served', icon: Globe },
  { value: '4.9/5', label: 'Employee Rating', icon: Award },
];

const perks = [
  { icon: Coffee, title: 'Free Meals', description: 'Complimentary breakfast, lunch, and snacks' },
  { icon: Rocket, title: 'Latest Equipment', description: 'MacBook Pro, ergonomic setup, and accessories' },
  { icon: Users, title: 'Team Events', description: 'Regular team outings, hackathons, and celebrations' },
  { icon: Globe, title: 'Remote First', description: 'Work from anywhere with flexible hours' },
];

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<typeof openings[0] | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    portfolio: '',
    coverLetter: '',
    resume: null as File | null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email';
    if (!formData.phone.trim()) e.phone = 'Phone is required';
    if (!formData.experience.trim()) e.experience = 'Experience is required';
    if (!formData.coverLetter.trim()) e.coverLetter = 'Cover letter is required';
    if (!formData.resume) e.resume = 'Resume is required';
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
    setFormStatus('submitting');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('portfolio', formData.portfolio);
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('jobTitle', selectedJob?.title || '');
      formDataToSend.append('jobId', selectedJob?.id.toString() || '');
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }

      const response = await fetch('http://localhost:8000/api/apply', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          experience: '',
          portfolio: '',
          coverLetter: '',
          resume: null,
        });
        setTimeout(() => {
          setFormStatus('idle');
          setSelectedJob(null);
        }, 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
      if (errors.resume) setErrors({ ...errors, resume: '' });
    }
  };

  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <Navbar />
      
      <main className="relative pt-20">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          
          {/* Animated Background Blobs */}
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
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"
          />

          <motion.div style={{ opacity, scale }} className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm mb-8 shadow-lg shadow-blue-500/10"
              >
                <Briefcase size={16} className="text-blue-400" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
                  Join Our Team
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                Build the Future with{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  KaizenSpark
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
                Join a team of innovators, creators, and problem-solvers building next-generation solutions
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 group hover:border-blue-500/30 transition-all"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                      <Icon className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
                      <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Why Join Us Section */}
        <section className="relative py-20 bg-slate-900/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Why Join <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">KaizenSpark?</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                We offer more than just a job – we offer a career where you can grow, innovate, and make an impact
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 overflow-hidden group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Additional Perks */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 md:p-12"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                Additional <span className="text-blue-400">Perks</span>
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {perks.map((perk, index) => {
                  const Icon = perk.icon;
                  return (
                    <motion.div
                      key={perk.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 flex items-center justify-center mb-4 mx-auto">
                        <Icon className="w-8 h-8 text-blue-400" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">{perk.title}</h4>
                      <p className="text-slate-400 text-sm">{perk.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="relative py-20 bg-slate-900/50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Open <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Positions</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Find your perfect role and start your journey with us
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {openings.map((job, index) => {
                const Icon = job.icon;
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${job.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
                          {job.salary}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {job.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-3 text-sm text-slate-400 mb-4">
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
                          {job.experience}
                        </span>
                      </div>

                      <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 4 && (
                          <span className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs font-medium">
                            +{job.skills.length - 4} more
                          </span>
                        )}
                      </div>

                      <button className="flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
                        View Details & Apply
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Don't See Your Role?
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <motion.a
                href="mailto:hr@kaizensparktech.com?subject=General Application - KaizenSpark Tech&body=Hi,%0D%0A%0D%0AI am interested in joining KaizenSpark Tech. Please find my resume attached.%0D%0A%0D%0AName: %0D%0AEmail: %0D%0APhone: %0D%0AExperience: %0D%0ALinkedIn/Portfolio: %0D%0A%0D%0AThank you!"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
              >
                <Mail size={20} />
                Send Your Resume
                <ArrowRight size={20} />
              </motion.a>
              <p className="text-sm text-slate-500 mt-4">
                Or email directly to: <a href="mailto:hr@kaizensparktech.com" className="text-blue-400 hover:text-blue-300 transition-colors">hr@kaizensparktech.com</a>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100000] flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
          >
            <button
              onClick={() => setSelectedJob(null)}
              className="sticky top-6 right-6 float-right w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-white transition-all z-10 shadow-lg"
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-12">
              <div className="mb-8">
                {(() => {
                  const Icon = selectedJob.icon;
                  return (
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedJob.color} flex items-center justify-center mb-6 shadow-xl`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  );
                })()}
                
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    {selectedJob.title}
                  </h2>
                  <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold whitespace-nowrap ml-4">
                    {selectedJob.salary}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-4 text-slate-400 mb-6">
                  <span className="flex items-center gap-2">
                    <Briefcase size={16} />
                    {selectedJob.department}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={16} />
                    {selectedJob.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {selectedJob.type} • {selectedJob.experience}
                  </span>
                </div>

                <p className="text-slate-300 text-lg leading-relaxed mb-8 bg-slate-800/30 p-6 rounded-xl border border-slate-700/50">
                  {selectedJob.description}
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="text-blue-400" size={20} />
                    Skills Required
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium hover:scale-105 transition-transform"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <CheckCircle2 className="text-green-400" size={20} />
                      Responsibilities
                    </h3>
                    <ul className="space-y-3">
                      {selectedJob.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Award className="text-blue-400" size={20} />
                      Requirements
                    </h3>
                    <ul className="space-y-3">
                      {selectedJob.requirements.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div className="border-t border-slate-800 pt-8">
                <h3 className="text-2xl font-bold text-white mb-2">Apply for this Position</h3>
                <p className="text-slate-400 mb-6">Fill out the form below and we'll get back to you within 48 hours</p>
                
                {formStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h4 className="text-white font-bold text-2xl">Application Submitted!</h4>
                    <p className="text-slate-400 text-sm max-w-md">
                      Thank you for applying to {selectedJob.title}. Our HR team will review your application and get back to you soon.
                    </p>
                  </motion.div>
                ) : formStatus === 'error' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-red-500/15 flex items-center justify-center">
                      <AlertCircle className="w-10 h-10 text-red-400" />
                    </div>
                    <h4 className="text-white font-bold text-2xl">Submission Failed</h4>
                    <p className="text-slate-400 text-sm max-w-md">
                      Please try again or email your resume to hr@kaizensparktech.com
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                          placeholder="+91 98765 43210"
                        />
                        {errors.phone && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Years of Experience *
                        </label>
                        <input
                          type="text"
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                          placeholder="5 years"
                        />
                        {errors.experience && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.experience}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Portfolio / LinkedIn URL
                      </label>
                      <input
                        type="url"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                        placeholder="https://linkedin.com/in/johndoe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Cover Letter *
                      </label>
                      <textarea
                        value={formData.coverLetter}
                        onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                        rows={5}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all resize-none"
                        placeholder="Tell us why you're a great fit for this role..."
                      />
                      {errors.coverLetter && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.coverLetter}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Upload Resume * (PDF, DOC, DOCX - Max 5MB)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                          id="resume-upload"
                        />
                        <label
                          htmlFor="resume-upload"
                          className="flex items-center justify-center gap-3 w-full bg-slate-800/50 border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl px-4 py-8 text-slate-400 hover:text-white cursor-pointer transition-all group"
                        >
                          <Upload size={24} className="group-hover:scale-110 transition-transform" />
                          <div className="text-center">
                            <div className="font-semibold">{formData.resume ? formData.resume.name : 'Click to upload resume'}</div>
                            {!formData.resume && <div className="text-xs text-slate-500 mt-1">PDF, DOC, or DOCX up to 5MB</div>}
                          </div>
                        </label>
                      </div>
                      {errors.resume && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.resume}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Careers;
