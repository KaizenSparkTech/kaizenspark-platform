import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);
    if (result.error) setError(result.error);
    else navigate("/dashboard");
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
            <p className="text-gray-400 mt-2 text-sm">Create your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">{error}</div>}
            <div><label htmlFor="signup-name" className="block text-sm font-medium text-gray-300 mb-1.5">Full Name</label><input id="signup-name" type="text" value={name} onChange={e=>setName(e.target.value)} required placeholder="John Doe" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all" /></div>
            <div><label htmlFor="signup-email" className="block text-sm font-medium text-gray-300 mb-1.5">Email</label><input id="signup-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="you@example.com" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all" /></div>
            <div><label htmlFor="signup-password" className="block text-sm font-medium text-gray-300 mb-1.5">Password</label><input id="signup-password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Min. 6 characters" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all" /></div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-cyan-500/20">{loading ? "Creating..." : "Create Account"}</button>
          </form>
          <p className="text-center text-gray-400 text-sm mt-6">Already have an account? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};
export default Signup;
