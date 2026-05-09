import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(necessaryOnly));
    setShowBanner(false);
    setShowSettings(false);
  };

  const savePreferences = () => {
    const savedPreferences = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(savedPreferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998]"
            onClick={() => !showSettings && setShowBanner(false)}
          />

          {/* Cookie Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[99999] p-4 md:p-6"
          >
            <div className="container max-w-6xl">
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                {!showSettings ? (
                  // Main Banner
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                        <Cookie className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">
                          We Value Your Privacy
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                          By clicking "Accept All", you consent to our use of cookies. You can customize your preferences or learn more in our{' '}
                          <button
                            onClick={() => navigate('/cookie-policy')}
                            className="text-blue-400 hover:text-blue-300 underline font-medium"
                          >
                            Cookie Policy
                          </button>
                          .
                        </p>
                      </div>
                      <button
                        onClick={() => setShowBanner(false)}
                        className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={acceptAll}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <Check size={18} />
                        Accept All Cookies
                      </button>
                      <button
                        onClick={acceptNecessary}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-all border border-slate-700"
                      >
                        Necessary Only
                      </button>
                      <button
                        onClick={() => setShowSettings(true)}
                        className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-2"
                      >
                        <Settings size={18} />
                        Customize
                      </button>
                    </div>
                  </div>
                ) : (
                  // Settings Panel
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">Cookie Preferences</h3>
                      <button
                        onClick={() => setShowSettings(false)}
                        className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="space-y-4 mb-6">
                      {/* Necessary Cookies */}
                      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                              <Check className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold">Necessary Cookies</h4>
                              <p className="text-slate-400 text-xs">Always Active</p>
                            </div>
                          </div>
                          <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </div>
                        </div>
                        <p className="text-slate-300 text-sm">
                          Essential for the website to function properly. These cookies enable basic functions like page navigation and access to secure areas.
                        </p>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                              <Cookie className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold">Analytics Cookies</h4>
                              <p className="text-slate-400 text-xs">Optional</p>
                            </div>
                          </div>
                          <button
                            onClick={() => togglePreference('analytics')}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              preferences.analytics ? 'bg-blue-500' : 'bg-slate-600'
                            } flex items-center ${preferences.analytics ? 'justify-end' : 'justify-start'} px-1`}
                          >
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </button>
                        </div>
                        <p className="text-slate-300 text-sm">
                          Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                        </p>
                      </div>

                      {/* Marketing Cookies */}
                      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                              <Cookie className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold">Marketing Cookies</h4>
                              <p className="text-slate-400 text-xs">Optional</p>
                            </div>
                          </div>
                          <button
                            onClick={() => togglePreference('marketing')}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              preferences.marketing ? 'bg-purple-500' : 'bg-slate-600'
                            } flex items-center ${preferences.marketing ? 'justify-end' : 'justify-start'} px-1`}
                          >
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </button>
                        </div>
                        <p className="text-slate-300 text-sm">
                          Used to track visitors across websites to display relevant and engaging advertisements.
                        </p>
                      </div>

                      {/* Functional Cookies */}
                      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                              <Cookie className="w-5 h-5 text-orange-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold">Functional Cookies</h4>
                              <p className="text-slate-400 text-xs">Optional</p>
                            </div>
                          </div>
                          <button
                            onClick={() => togglePreference('functional')}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              preferences.functional ? 'bg-orange-500' : 'bg-slate-600'
                            } flex items-center ${preferences.functional ? 'justify-end' : 'justify-start'} px-1`}
                          >
                            <div className="w-4 h-4 bg-white rounded-full" />
                          </button>
                        </div>
                        <p className="text-slate-300 text-sm">
                          Enable enhanced functionality and personalization, such as remembering your preferences and settings.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={savePreferences}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
                      >
                        Save Preferences
                      </button>
                      <button
                        onClick={acceptAll}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-all border border-slate-700"
                      >
                        Accept All
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
