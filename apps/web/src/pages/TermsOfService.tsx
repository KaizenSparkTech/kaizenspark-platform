import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import { FileText } from 'lucide-react';

const TermsOfService = () => {
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
              <FileText size={16} className="text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-slate-400">
              Last updated: May 5, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-slate max-w-none">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-8">
              
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                <p className="text-slate-300 leading-relaxed">
                  By accessing or using the services provided by KaizenSpark Tech Pvt Ltd ("Company," "we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  KaizenSpark Tech provides enterprise-grade IT and AI engineering services, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li>Technology Strategy and Consulting</li>
                  <li>Application Engineering and Development</li>
                  <li>Cloud DevOps and Infrastructure</li>
                  <li>AI and Automation Solutions</li>
                  <li>Security and Compliance Services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Use of Services</h2>
                <h3 className="text-xl font-semibold text-white mb-3">3.1 Eligibility</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  You must be at least 18 years old and have the legal capacity to enter into contracts to use our services.
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">3.2 Account Responsibilities</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  If you create an account with us, you are responsible for:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-6">3.3 Prohibited Activities</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li>Use our services for any illegal purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt our services</li>
                  <li>Transmit viruses, malware, or harmful code</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  All content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are owned by KaizenSpark Tech and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  You may not reproduce, distribute, modify, or create derivative works without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Service Agreements</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Specific services provided by KaizenSpark Tech will be governed by separate service agreements that outline:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li>Scope of work and deliverables</li>
                  <li>Payment terms and pricing</li>
                  <li>Project timelines and milestones</li>
                  <li>Confidentiality obligations</li>
                  <li>Intellectual property ownership</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Payment Terms</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Payment terms will be specified in individual service agreements. Generally:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li>Invoices are due within 30 days of issuance unless otherwise specified</li>
                  <li>Late payments may incur interest charges</li>
                  <li>We reserve the right to suspend services for non-payment</li>
                  <li>All fees are non-refundable unless otherwise stated</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Confidentiality</h2>
                <p className="text-slate-300 leading-relaxed">
                  Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the course of our business relationship. This obligation survives the termination of services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Warranties and Disclaimers</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  We strive to provide high-quality services, but:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li>Services are provided "as is" without warranties of any kind</li>
                  <li>We do not guarantee uninterrupted or error-free service</li>
                  <li>We are not liable for any indirect, incidental, or consequential damages</li>
                  <li>Our total liability is limited to the amount paid for services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
                <p className="text-slate-300 leading-relaxed">
                  To the maximum extent permitted by law, KaizenSpark Tech shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
                <p className="text-slate-300 leading-relaxed">
                  You agree to indemnify and hold harmless KaizenSpark Tech from any claims, damages, losses, or expenses arising from your use of our services or violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Termination</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  We reserve the right to terminate or suspend your access to our services at any time, without prior notice, for:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li>Violation of these Terms of Service</li>
                  <li>Non-payment of fees</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Any other reason at our sole discretion</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law</h2>
                <p className="text-slate-300 leading-relaxed">
                  These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">13. Changes to Terms</h2>
                <p className="text-slate-300 leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. We will notify you of any material changes by posting the updated terms on our website. Your continued use of our services constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  For questions about these Terms of Service, please contact us:
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

export default TermsOfService;
