import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { api, ProjectResponse, MilestoneResponse, InvoiceResponse, OfferLetterResponse, UserResponse, SendOfferResponse, OnboardingChecklistResponse } from "@/lib/api";
import { Link } from "react-router-dom";
import { UserPlus, Send, Check, Clock, Shield, Users, Briefcase, FileText, ChevronDown, Copy, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VALID_ROLES = ["super_admin","hr","manager","business_analyst","project_manager","team_lead","employee","developer","intern","mentor","client","finance"];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("Overview");
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [milestones, setMilestones] = useState<MilestoneResponse[]>([]);
  const [invoices, setInvoices] = useState<InvoiceResponse[]>([]);
  const [offers, setOffers] = useState<OfferLetterResponse[]>([]);
  const [employees, setEmployees] = useState<UserResponse[]>([]);
  const [onboarding, setOnboarding] = useState<OnboardingChecklistResponse[]>([]);

  // Create offer modal
  const [showCreateOffer, setShowCreateOffer] = useState(false);
  const [newOffer, setNewOffer] = useState({ candidate_name: "", candidate_email: "", role_offered: "intern", salary_offered: 0 });

  // Credentials modal
  const [showCreds, setShowCreds] = useState(false);
  const [creds, setCreds] = useState<SendOfferResponse | null>(null);
  const [showPass, setShowPass] = useState(false);

  const isAdmin = user?.role === "super_admin" || user?.role === "hr";
  const tabs = isAdmin
    ? ["Overview", "Offer Letters", "Employees", "Projects", "Settings"]
    : ["Overview", "Projects", "Milestones", "Invoices", "Settings"];

  const loadData = async () => {
    try {
      const [p, m, i] = await Promise.all([api.getProjects().catch(() => []), api.getMilestones().catch(() => []), api.getInvoices().catch(() => [])]);
      setProjects(p); setMilestones(m); setInvoices(i);
      if (isAdmin) {
        const [o, emp] = await Promise.all([api.getOfferLetters().catch(() => []), api.getUsers().catch(() => [])]);
        setOffers(o); setEmployees(emp);
      }
    } catch {}
  };

  useEffect(() => { loadData(); }, []);

  const handleCreateOffer = async () => {
    try {
      await api.createOfferLetter(newOffer);
      toast({ title: "Success", description: "Offer letter draft created." });
      setShowCreateOffer(false);
      setNewOffer({ candidate_name: "", candidate_email: "", role_offered: "intern", salary_offered: 0 });
      loadData();
    } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const handleSendOffer = async (id: number) => {
    try {
      const result = await api.sendOfferLetter(id);
      setCreds(result);
      setShowCreds(true);
      toast({ title: "Sent!", description: "Offer sent & user account created." });
      loadData();
    } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const handleApproveOnboarding = async (userId: number) => {
    try {
      await api.approveOnboarding(userId);
      toast({ title: "Approved", description: "User onboarding approved — they now have full access." });
      loadData();
    } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Copied to clipboard." });
  };

  const pendingOnboarding = employees.filter(e => e.status === "onboarding" || (e.onboarding_status && e.onboarding_status !== "none" && e.onboarding_status !== "approved"));

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-6 py-3">
          <Link to="/" className="text-xl font-bold"><span className="text-blue-400">KaizenSpark</span> Tech</Link>
          <div className="hidden md:flex gap-1">{tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === t ? "bg-white/10 text-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>{t}</button>
          ))}</div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 hidden sm:block">{user?.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${user?.role === "super_admin" ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"}`}>{user?.role}</span>
            <button onClick={logout} className="text-sm text-red-400 hover:text-red-300 ml-2">Logout</button>
          </div>
        </div>
      </header>

      <main className="pt-20 px-6 max-w-7xl mx-auto pb-20">
        <div className="flex md:hidden gap-1 overflow-x-auto pb-4 mb-4">{tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap ${activeTab === t ? "bg-white/10 text-cyan-400" : "text-gray-500"}`}>{t}</button>
        ))}</div>

        {/* OVERVIEW */}
        {activeTab === "Overview" && (
          <div className="space-y-8 animate-in fade-in">
            <h2 className="text-2xl font-bold">Welcome, {user?.name} 👋</h2>

            {isAdmin && pendingOnboarding.length > 0 && (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-amber-400 flex items-center gap-2 mb-4"><Clock className="w-5 h-5" /> Pending Onboarding Approvals ({pendingOnboarding.length})</h3>
                <div className="space-y-3">
                  {pendingOnboarding.map(emp => (
                    <div key={emp.id} className="flex items-center justify-between bg-[#0f172a] rounded-lg p-4 border border-white/5">
                      <div>
                        <p className="font-medium">{emp.name}</p>
                        <p className="text-xs text-gray-400">{emp.email} · {emp.role} · Status: {emp.onboarding_status}</p>
                      </div>
                      {(emp.onboarding_status === "completed" || emp.onboarding_status === "in_progress") && (
                        <button onClick={() => handleApproveOnboarding(emp.id)} className="px-4 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                          <Check className="w-4 h-4" /> Approve
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Projects", value: projects.length, color: "from-blue-500 to-blue-600", icon: Briefcase },
                { label: "Employees", value: isAdmin ? employees.length : "—", color: "from-purple-500 to-purple-600", icon: Users },
                { label: "Offer Letters", value: isAdmin ? offers.length : "—", color: "from-green-500 to-emerald-600", icon: FileText },
                { label: "Total Invoiced", value: `$${invoices.reduce((s, i) => s + i.amount, 0).toLocaleString()}`, color: "from-orange-500 to-amber-600", icon: Shield },
              ].map(c => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="relative overflow-hidden rounded-xl bg-[#0f172a] border border-white/5 p-6">
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${c.color} opacity-10 rounded-full blur-xl`} />
                    <Icon className="w-5 h-5 text-gray-400 mb-2" />
                    <p className="text-gray-400 text-sm">{c.label}</p>
                    <p className="text-3xl font-bold mt-1">{c.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* OFFER LETTERS (Admin) */}
        {activeTab === "Offer Letters" && isAdmin && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Offer Letters</h2>
              <button onClick={() => setShowCreateOffer(true)} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2">
                <UserPlus className="w-4 h-4" /> New Offer
              </button>
            </div>
            <div className="grid gap-4">
              {offers.map(offer => (
                <div key={offer.id} className="bg-[#0f172a] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{offer.candidate_name} <span className="text-sm text-gray-400">({offer.candidate_email})</span></h3>
                      <p className="text-gray-400 text-sm mt-1">Role: <span className="text-white">{offer.role_offered}</span> | Salary: ${offer.salary_offered?.toLocaleString() || "N/A"}</p>
                      {offer.generated_email && <p className="text-xs text-cyan-400 mt-1">Platform email: {offer.generated_email}</p>}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${offer.status === "accepted" ? "bg-green-500/20 text-green-400" : offer.status === "sent" ? "bg-blue-500/20 text-blue-400" : offer.status === "rejected" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {offer.status.toUpperCase()}
                    </span>
                  </div>
                  {offer.status === "draft" && (
                    <div className="mt-4">
                      <button onClick={() => handleSendOffer(offer.id)} className="text-sm flex items-center px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                        <Send className="w-4 h-4 mr-2" /> Send Offer & Create Account
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {offers.length === 0 && <p className="text-gray-500 text-center py-10">No offer letters yet. Create one to start onboarding.</p>}
            </div>
          </div>
        )}

        {/* EMPLOYEES (Admin) */}
        {activeTab === "Employees" && isAdmin && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold">Employee Directory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map(emp => (
                <div key={emp.id} className="bg-[#0f172a] border border-white/5 rounded-xl p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{emp.name}</h3>
                    {emp.status === "onboarding" && <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-400">ONBOARDING</span>}
                    {emp.status === "active" && emp.is_verified && <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">ACTIVE</span>}
                  </div>
                  <p className="text-sm text-gray-400">{emp.email}</p>
                  {emp.personal_email && <p className="text-xs text-gray-500">Personal: {emp.personal_email}</p>}
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300">{emp.role}</span>
                    {emp.onboarding_status && emp.onboarding_status !== "none" && emp.onboarding_status !== "approved" && (
                      <button onClick={() => handleApproveOnboarding(emp.id)} className="text-xs px-3 py-1 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20">
                        Approve
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === "Projects" && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold">Projects</h2>
            {projects.length === 0 ? <p className="text-gray-500 text-center py-20">No projects yet.</p> : (
              <div className="grid gap-4">{projects.map(p => (
                <div key={p.id} className="bg-[#0f172a] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all">
                  <div className="flex justify-between items-start">
                    <div><h3 className="font-semibold text-lg">{p.title}</h3><p className="text-gray-400 text-sm mt-1">{p.description || "—"}</p></div>
                    <span className={`text-xs px-2 py-1 rounded-full ${p.status === "completed" ? "bg-green-500/20 text-green-400" : p.status === "in_progress" ? "bg-blue-500/20 text-blue-400" : "bg-yellow-500/20 text-yellow-400"}`}>{p.status}</span>
                  </div>
                </div>
              ))}</div>
            )}
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "Settings" && (
          <div className="space-y-6 animate-in fade-in max-w-2xl">
            <h2 className="text-2xl font-bold">Settings</h2>
            <div className="bg-[#0f172a] border border-white/5 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-lg">Profile</h3>
              {[{ l: "Name", v: user?.name }, { l: "Email", v: user?.email }, { l: "Role", v: user?.role }, { l: "Status", v: user?.status }].map(r => (
                <div key={r.l} className="flex justify-between py-2 border-b border-white/5 last:border-0"><span className="text-gray-400">{r.l}</span><span>{r.v}</span></div>
              ))}
            </div>
          </div>
        )}

        {/* Milestones/Invoices for non-admin */}
        {activeTab === "Milestones" && !isAdmin && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold">Milestones</h2>
            {milestones.map(m => (
              <div key={m.id} className="bg-[#0f172a] border border-white/5 rounded-xl p-5">
                <div className="flex justify-between items-start mb-3"><h3 className="font-semibold">{m.title}</h3><span className="text-sm text-gray-400">{m.progress}%</span></div>
                <div className="w-full bg-gray-800 rounded-full h-2"><div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" style={{ width: `${m.progress}%` }} /></div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Invoices" && !isAdmin && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold">Invoices</h2>
            <div className="bg-[#0f172a] border border-white/5 rounded-xl overflow-hidden">
              <table className="w-full text-sm"><thead><tr className="border-b border-white/5 text-gray-400"><th className="text-left p-4">ID</th><th className="text-left p-4">Amount</th><th className="text-left p-4">Status</th></tr></thead>
              <tbody>{invoices.map(inv => (
                <tr key={inv.id} className="border-b border-white/5"><td className="p-4 font-mono">INV-{String(inv.id).padStart(4,"0")}</td><td className="p-4 font-semibold">${inv.amount.toLocaleString()}</td><td className="p-4"><span className={`px-2 py-1 rounded-full text-xs ${inv.status === "paid" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{inv.status}</span></td></tr>
              ))}</tbody></table>
            </div>
          </div>
        )}
      </main>

      {/* Create Offer Modal */}
      {showCreateOffer && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-4">Draft Offer Letter</h3>
            <div className="space-y-4">
              <div><label className="block text-sm text-gray-300 mb-1">Candidate Name</label><input value={newOffer.candidate_name} onChange={e => setNewOffer({...newOffer, candidate_name: e.target.value})} placeholder="John Doe" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" /></div>
              <div><label className="block text-sm text-gray-300 mb-1">Candidate Personal Email</label><input value={newOffer.candidate_email} onChange={e => setNewOffer({...newOffer, candidate_email: e.target.value})} placeholder="john@gmail.com" type="email" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" /></div>
              <div><label className="block text-sm text-gray-300 mb-1">Role</label>
                <select value={newOffer.role_offered} onChange={e => setNewOffer({...newOffer, role_offered: e.target.value})} className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50">
                  {VALID_ROLES.map(r => <option key={r} value={r}>{r.replace("_"," ").replace(/\b\w/g, c => c.toUpperCase())}</option>)}
                </select>
              </div>
              <div><label className="block text-sm text-gray-300 mb-1">Salary / Stipend</label><input value={newOffer.salary_offered} onChange={e => setNewOffer({...newOffer, salary_offered: Number(e.target.value)})} type="number" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" /></div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowCreateOffer(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                <button onClick={handleCreateOffer} className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl font-medium">Create Draft</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Credentials Modal */}
      {showCreds && creds && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] border border-cyan-500/20 rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-2 text-cyan-400">✅ Account Created!</h3>
            <p className="text-gray-400 text-sm mb-6">Share these credentials with <strong>{creds.offer.candidate_name}</strong> manually (via their personal email).</p>
            <div className="bg-black/30 rounded-xl p-4 space-y-3 border border-white/5">
              <div className="flex justify-between items-center">
                <div><p className="text-xs text-gray-400">Platform Email</p><p className="text-white font-mono">{creds.generated_email}</p></div>
                <button onClick={() => copyText(creds.generated_email)} className="p-2 hover:bg-white/10 rounded-lg"><Copy className="w-4 h-4 text-gray-400" /></button>
              </div>
              <div className="flex justify-between items-center">
                <div><p className="text-xs text-gray-400">Temporary Password</p><p className="text-white font-mono">{showPass ? creds.generated_password : "••••••••••"}</p></div>
                <div className="flex gap-1">
                  <button onClick={() => setShowPass(!showPass)} className="p-2 hover:bg-white/10 rounded-lg">{showPass ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}</button>
                  <button onClick={() => copyText(creds.generated_password)} className="p-2 hover:bg-white/10 rounded-lg"><Copy className="w-4 h-4 text-gray-400" /></button>
                </div>
              </div>
            </div>
            <p className="text-xs text-amber-400 mt-4">⚠️ This password is shown only once. Make sure to copy it.</p>
            <button onClick={() => { setShowCreds(false); setCreds(null); setShowPass(false); }} className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl font-medium">Done</button>
          </div>
        </div>
      )}
    </div>
  );
}
