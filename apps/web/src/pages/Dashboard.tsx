import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { api, ProjectResponse, MilestoneResponse, InvoiceResponse } from "@/lib/api";
import { Link } from "react-router-dom";
import HRDashboard from "./HRDashboard";
import InternDashboard from "./InternDashboard";

const tabs = ["Overview", "Projects", "Milestones", "Invoices", "Settings"] as const;
type Tab = typeof tabs[number];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [milestones, setMilestones] = useState<MilestoneResponse[]>([]);
  const [invoices, setInvoices] = useState<InvoiceResponse[]>([]);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const loadData = async () => {
    try {
      const [p, m, i] = await Promise.all([api.getProjects(), api.getMilestones(), api.getInvoices()]);
      setProjects(p); setMilestones(m); setInvoices(i);
    } catch {}
  };

  useEffect(() => { loadData(); }, []);

  const handleCreateProject = async () => {
    if (!newTitle || !user) return;
    await api.createProject({ title: newTitle, description: newDesc, client_id: user.id });
    setNewTitle(""); setNewDesc(""); setShowCreateProject(false);
    loadData();
  };

  const totalAmount = invoices.reduce((s, i) => s + i.amount, 0);
  const avgProgress = milestones.length ? Math.round(milestones.reduce((s, m) => s + m.progress, 0) / milestones.length) : 0;

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-6 py-3">
          <Link to="/" className="text-xl font-bold"><span className="text-blue-400">KaizenSpark</span> Tech</Link>
          <div className="hidden md:flex gap-1">{tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-lg text-sm transition-all ${activeTab === t ? "bg-white/10 text-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>{t}</button>
          ))}</div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 hidden sm:block">{user?.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">{user?.role}</span>
            <button onClick={logout} className="text-sm text-red-400 hover:text-red-300 ml-2">Logout</button>
          </div>
        </div>
      </header>

      <main className="pt-20 px-6 max-w-7xl mx-auto pb-20">
        {/* Mobile tabs */}
        <div className="flex md:hidden gap-1 overflow-x-auto pb-4 mb-4">{tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap ${activeTab === t ? "bg-white/10 text-cyan-400" : "text-gray-500"}`}>{t}</button>
        ))}</div>

        {user?.role === "hr" && <HRDashboard />}
        {user?.role === "intern" && <InternDashboard />}
        {user?.role !== "hr" && user?.role !== "intern" && activeTab === "Overview" && (
          <div className="space-y-8 animate-in fade-in">
            <h2 className="text-2xl font-bold">Welcome, {user?.name} 👋</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Projects", value: projects.length, color: "from-blue-500 to-blue-600" },
                { label: "Milestones", value: milestones.length, color: "from-purple-500 to-purple-600" },
                { label: "Avg Progress", value: `${avgProgress}%`, color: "from-green-500 to-emerald-600" },
                { label: "Total Invoiced", value: `$${totalAmount.toLocaleString()}`, color: "from-orange-500 to-amber-600" },
              ].map(c => (
                <div key={c.label} className="relative overflow-hidden rounded-xl bg-[#0f172a] border border-white/5 p-6">
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${c.color} opacity-10 rounded-full blur-xl`} />
                  <p className="text-gray-400 text-sm">{c.label}</p>
                  <p className="text-3xl font-bold mt-1">{c.value}</p>
                </div>
              ))}
            </div>
            {projects.length > 0 && (
              <div className="bg-[#0f172a] border border-white/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
                <div className="space-y-3">{projects.slice(0, 5).map(p => (
                  <div key={p.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div><p className="font-medium">{p.title}</p><p className="text-xs text-gray-500">{p.description || "No description"}</p></div>
                    <span className={`text-xs px-2 py-1 rounded-full ${p.status === "completed" ? "bg-green-500/20 text-green-400" : p.status === "in_progress" ? "bg-blue-500/20 text-blue-400" : "bg-yellow-500/20 text-yellow-400"}`}>{p.status}</span>
                  </div>
                ))}</div>
              </div>
            )}
          </div>
        )}

        {user?.role !== "hr" && user?.role !== "intern" && activeTab === "Projects" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Projects</h2>
              <button onClick={() => setShowCreateProject(true)} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20">+ New Project</button>
            </div>
            {projects.length === 0 ? (
              <div className="text-center py-20 text-gray-500"><p className="text-lg">No projects yet</p><p className="text-sm mt-1">Create your first project to get started</p></div>
            ) : (
              <div className="grid gap-4">{projects.map(p => (
                <div key={p.id} className="bg-[#0f172a] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all">
                  <div className="flex justify-between items-start">
                    <div><h3 className="font-semibold text-lg">{p.title}</h3><p className="text-gray-400 text-sm mt-1">{p.description || "—"}</p></div>
                    <span className={`text-xs px-2 py-1 rounded-full ${p.status === "completed" ? "bg-green-500/20 text-green-400" : p.status === "in_progress" ? "bg-blue-500/20 text-blue-400" : "bg-yellow-500/20 text-yellow-400"}`}>{p.status}</span>
                  </div>
                  <div className="mt-4 flex gap-4 text-xs text-gray-500">
                    <span>Created: {new Date(p.created_at).toLocaleDateString()}</span>
                    <span>Milestones: {milestones.filter(m => m.project_id === p.id).length}</span>
                  </div>
                </div>
              ))}</div>
            )}
            {showCreateProject && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4">
                  <h3 className="text-xl font-semibold mb-4">Create Project</h3>
                  <div className="space-y-4">
                    <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Project title" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" />
                    <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Description (optional)" rows={3} className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" />
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setShowCreateProject(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                      <button onClick={handleCreateProject} className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl font-medium">Create</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {user?.role !== "hr" && user?.role !== "intern" && activeTab === "Milestones" && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold">Milestones</h2>
            {milestones.length === 0 ? <p className="text-gray-500 text-center py-20">No milestones yet</p> : (
              <div className="grid gap-4">{milestones.map(m => (
                <div key={m.id} className="bg-[#0f172a] border border-white/5 rounded-xl p-5">
                  <div className="flex justify-between items-start mb-3"><h3 className="font-semibold">{m.title}</h3><span className="text-sm text-gray-400">{m.progress}%</span></div>
                  <div className="w-full bg-gray-800 rounded-full h-2"><div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all" style={{ width: `${m.progress}%` }} /></div>
                  {m.description && <p className="text-gray-400 text-sm mt-3">{m.description}</p>}
                </div>
              ))}</div>
            )}
          </div>
        )}

        {user?.role !== "hr" && user?.role !== "intern" && activeTab === "Invoices" && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold">Invoices</h2>
            {invoices.length === 0 ? <p className="text-gray-500 text-center py-20">No invoices yet</p> : (
              <div className="bg-[#0f172a] border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-sm"><thead><tr className="border-b border-white/5 text-gray-400"><th className="text-left p-4">ID</th><th className="text-left p-4">Amount</th><th className="text-left p-4">Status</th><th className="text-left p-4">Issued</th></tr></thead>
                <tbody>{invoices.map(inv => (
                  <tr key={inv.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="p-4 font-mono text-gray-300">INV-{String(inv.id).padStart(4, "0")}</td>
                    <td className="p-4 font-semibold">${inv.amount.toLocaleString()}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs ${inv.status === "paid" ? "bg-green-500/20 text-green-400" : inv.status === "overdue" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>{inv.status}</span></td>
                    <td className="p-4 text-gray-400">{inv.issued_date || "—"}</td>
                  </tr>
                ))}</tbody></table>
              </div>
            )}
          </div>
        )}

        {user?.role !== "hr" && user?.role !== "intern" && activeTab === "Settings" && (
          <div className="space-y-6 animate-in fade-in max-w-2xl">
            <h2 className="text-2xl font-bold">Settings</h2>
            <div className="bg-[#0f172a] border border-white/5 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-lg">Profile</h3>
              {[{ l: "Name", v: user?.name }, { l: "Email", v: user?.email }, { l: "Role", v: user?.role }, { l: "Member since", v: user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—" }].map(r => (
                <div key={r.l} className="flex justify-between py-2 border-b border-white/5 last:border-0"><span className="text-gray-400">{r.l}</span><span>{r.v}</span></div>
              ))}
            </div>
            <div className="bg-[#0f172a] border border-red-500/10 rounded-xl p-6">
              <h3 className="font-semibold text-lg text-red-400 mb-2">Danger Zone</h3>
              <p className="text-gray-400 text-sm mb-4">Logging out will clear your session.</p>
              <button onClick={logout} className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-all">Log Out</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
