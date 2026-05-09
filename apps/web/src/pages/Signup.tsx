import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.submitLead({ name, email, message });
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold"><span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">KaizenSpark</span><span className="text-white"> Tech</span></h1>
            <p className="text-gray-400 mt-2 text-sm">Contact Us / Request Project</p>
            <p className="text-gray-500 mt-1 text-xs">Fill out the form below and we'll reach out.</p>
          </div>
          {success ? (
            <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
              <p className="text-green-400 font-medium mb-2">Request Submitted!</p>
              <p className="text-sm text-gray-300">Our admin will review your request and send you an invite email with platform credentials shortly.</p>
              <button onClick={() => setSuccess(false)} className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors">Submit Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">{error}</div>}
              <div><label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label><input id="contact-name" type="text" value={name} onChange={e=>setName(e.target.value)} required placeholder="John Doe" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all" /></div>
              <div><label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-1.5">Email</label><input id="contact-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="you@example.com" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all" /></div>
              <div><label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-1.5">Project Details / Message</label><textarea id="contact-message" value={message} onChange={e=>setMessage(e.target.value)} required placeholder="Tell us about your project..." rows={4} className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all" /></div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/20">{loading ? "Submitting..." : "Send Request"}</button>
            </form>
          )}
          <p className="text-center text-gray-400 text-sm mt-6">Already a client? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">Sign in</Link></p>
          <div className="mt-4 p-3 bg-white/5 rounded-lg text-center">
            <p className="text-xs text-gray-500">🔒 Employee / Intern? Your admin will create your account and share credentials with you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
