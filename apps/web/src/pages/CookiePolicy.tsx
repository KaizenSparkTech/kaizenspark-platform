import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import { Cookie } from 'lucide-react';

const CookiePolicy = () => {
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
              <Cookie size={16} className="text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-slate-400">
              Last updated: May 5, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-slate max-w-none">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 space-y-8">
              
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies?</h2>
                <p className="text-slate-300 leading-relaxed">
                  Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Cookies</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  KaizenSpark Tech uses cookies to:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you use our website</li>
                  <li>Improve your user experience</li>
                  <li>Analyze website traffic and performance</li>
                  <li>Provide personalized content</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Types of Cookies We Use</h2>
                
                <h3 className="text-xl font-semibold text-white mb-3">3.1 Essential Cookies</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                </p>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6">
                  <p className="text-slate-300 text-sm"><strong>Examples:</strong> Session cookies, security cookies</p>
                  <p className="text-slate-300 text-sm"><strong>Duration:</strong> Session or up to 1 year</p>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">3.2 Performance Cookies</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  These cookies collect information about how visitors use our website, such as which pages are visited most often. This helps us improve how our website works.
                </p>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6">
                  <p className="text-slate-300 text-sm"><strong>Examples:</strong> Google Analytics cookies</p>
                  <p className="text-slate-300 text-sm"><strong>Duration:</strong> Up to 2 years</p>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">3.3 Functionality Cookies</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  These cookies allow the website to remember choices you make (such as your language or region) and provide enhanced, personalized features.
                </p>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6">
                  <p className="text-slate-300 text-sm"><strong>Examples:</strong> Language preference, theme selection</p>
                  <p className="text-slate-300 text-sm"><strong>Duration:</strong> Up to 1 year</p>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">3.4 Targeting/Advertising Cookies</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  These cookies are used to deliver advertisements more relevant to you and your interests. They may also be used to limit the number of times you see an advertisement.
                </p>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6">
                  <p className="text-slate-300 text-sm"><strong>Examples:</strong> Third-party advertising cookies</p>
                  <p className="text-slate-300 text-sm"><strong>Duration:</strong> Up to 2 years</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Cookies</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  We may use third-party services that set cookies on your device. These include:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
                  <li><strong>Social Media Platforms:</strong> To enable social sharing features</li>
                  <li><strong>Marketing Tools:</strong> To track campaign effectiveness</li>
                </ul>
                <p className="text-slate-300 leading-relaxed mt-4">
                  These third parties have their own privacy policies, and we have no control over their cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Managing Cookies</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences through:
                </p>

                <h3 className="text-xl font-semibold text-white mb-3">5.1 Browser Settings</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Most web browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li>Block all cookies</li>
                  <li>Accept only first-party cookies</li>
                  <li>Delete cookies after each session</li>
                  <li>Set preferences for specific websites</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-6">5.2 Browser-Specific Instructions</h3>
                <div className="space-y-3">
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                    <p className="text-white font-semibold mb-1">Google Chrome</p>
                    <p className="text-slate-300 text-sm">Settings → Privacy and security → Cookies and other site data</p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                    <p className="text-white font-semibold mb-1">Mozilla Firefox</p>
                    <p className="text-slate-300 text-sm">Options → Privacy & Security → Cookies and Site Data</p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                    <p className="text-white font-semibold mb-1">Safari</p>
                    <p className="text-slate-300 text-sm">Preferences → Privacy → Cookies and website data</p>
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                    <p className="text-white font-semibold mb-1">Microsoft Edge</p>
                    <p className="text-slate-300 text-sm">Settings → Privacy, search, and services → Cookies</p>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed mt-4">
                  <strong>Note:</strong> Blocking or deleting cookies may affect your experience on our website and limit certain features.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Do Not Track Signals</h2>
                <p className="text-slate-300 leading-relaxed">
                  Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want your online activity tracked. Currently, there is no industry standard for how to respond to DNT signals. We do not currently respond to DNT signals.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Updates to This Policy</h2>
                <p className="text-slate-300 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. We will notify you of any significant changes by posting the updated policy on our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. More Information</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  For more information about cookies and how to manage them, visit:
                </p>
                <ul className="list-disc list-inside text-slate-300 space-y-2 ml-4">
                  <li><a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">www.allaboutcookies.org</a></li>
                  <li><a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">www.youronlinechoices.com</a></li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  If you have questions about our use of cookies, please contact us:
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

export default CookiePolicy;
