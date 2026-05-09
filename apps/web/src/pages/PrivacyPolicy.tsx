import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950">
      <ScrollProgress />
      <Navbar />
      
      <main className="relative pt-32 pb-20">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
              <Shield size={16} className="text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-slate-400">
              Last updated: May 5, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-slate max-w-none">
            {/* Table of Contents */}
            <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Shield size={20} className="text-blue-400" />
                Table of Contents
              </h3>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                {[
                  '1. Information We Collect',
                  '2. How We Use Your Information',
                  '3. Data Sharing and Disclosure',
                  '4. Data Security',
                  '5. Data Retention',
                  '6. Your Rights',
                  '7. Cookies and Tracking',
                  '8. Children\'s Privacy',
                  '9. International Data Transfers',
                  '10. Changes to This Policy',
                  '11. Contact Us',
                ].map((item) => (
                  <a
                    key={item}
                    href={`#section-${item.split('.')[0].trim()}`}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 space-y-10">
              
              {/* Introduction */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-l-4 border-blue-500 rounded-r-xl p-6">
                <p className="text-slate-200 leading-relaxed text-base">
                  <strong className="text-white">Effective Date:</strong> May 5, 2026<br/>
                  <strong className="text-white">Last Updated:</strong> May 5, 2026
                </p>
                <p className="text-slate-300 leading-relaxed mt-4">
                  KaizenSpark Tech Pvt Ltd ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong className="text-white">www.kaizensparktech.com</strong> or use our services.
                </p>
              </div>

              <section id="section-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      Personal Information
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      We may collect personal information that you voluntarily provide to us when you:
                    </p>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex items-start gap-3">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>Fill out contact forms on our website</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>Apply for job positions through our careers portal</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>Subscribe to our newsletter or communications</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>Request information about our services</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">
                      <p className="text-slate-300 text-sm">
                        <strong className="text-white">Types of data collected:</strong> Name, email address, phone number, company name, job title, resume/CV, and any other information you choose to provide.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      Automatically Collected Information
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies installed on your device. We may also collect information about your browsing behavior, such as pages visited and links clicked.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Process job applications and recruitment activities</li>
                  <li>Send you marketing and promotional communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Data Sharing and Disclosure</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website and conducting our business</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of our company</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                <p className="text-slate-300 leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Data Retention</h2>
                <p className="text-slate-300 leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate data</li>
                  <li>Deletion of your personal information</li>
                  <li>Objection to processing of your data</li>
                  <li>Data portability</li>
                  <li>Withdrawal of consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Cookies</h2>
                <p className="text-slate-300 leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. See our Cookie Policy for more details.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
                <p className="text-slate-300 leading-relaxed">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
                <p className="text-slate-300 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <p className="text-white font-semibold mb-2">KaizenSpark Tech Pvt Ltd</p>
                  <p className="text-slate-300">Email: <a href="mailto:hr@kaizensparktech.com" className="text-blue-400 hover:text-blue-300">hr@kaizensparktech.com</a></p>
                  <p className="text-slate-300">Phone: <a href="tel:+919150684544" className="text-blue-400 hover:text-blue-300">+91 91506 84544</a></p>
                  <p className="text-slate-300">Location: Chennai, Tamil Nadu, India</p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
