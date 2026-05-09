import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { api, ProjectResponse, MilestoneResponse, InvoiceResponse, OfferLetterResponse, UserResponse, SendOfferResponse, OnboardingChecklistResponse, LeadResponse, LeadInviteResponse, SystemSettingResponse, ProjectRequestResponse } from "@/lib/api";
import { Link } from "react-router-dom";
import { UserPlus, Send, Check, Clock, Shield, Users, Briefcase, FileText, ChevronDown, Copy, Eye, EyeOff, AlertCircle, Plus, Building2, BriefcaseIcon, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("Overview");
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [projectRequests, setProjectRequests] = useState<ProjectRequestResponse[]>([]);
  const [milestones, setMilestones] = useState<MilestoneResponse[]>([]);
  const [invoices, setInvoices] = useState<InvoiceResponse[]>([]);
  const [offers, setOffers] = useState<OfferLetterResponse[]>([]);
  const [employees, setEmployees] = useState<UserResponse[]>([]);
  const [leads, setLeads] = useState<LeadResponse[]>([]);
  const [settings, setSettings] = useState<SystemSettingResponse[]>([]);
  
  const [departments, setDepartments] = useState<any[]>([]);
  const [designations, setDesignations] = useState<any[]>([]);

  // Modals
  const [showCreateOffer, setShowCreateOffer] = useState(false);
  const [showCreateDept, setShowCreateDept] = useState(false);
  const [showCreateDesig, setShowCreateDesig] = useState(false);
  const [showCreds, setShowCreds] = useState(false);

  // Forms
  const [newOffer, setNewOffer] = useState({ candidate_name: "", candidate_email: "", role_offered: "employee", department_id: "", designation_id: "", employment_type: "full_time", internship_end_date: "", salary_offered: 0 });
  const [newDept, setNewDept] = useState({ name: "", description: "" });
  const [newDesig, setNewDesig] = useState({ title: "", department_id: "", description: "" });
  const [newSetting, setNewSetting] = useState({ key: "", value: "", description: "" });

  const [creds, setCreds] = useState<any | null>(null);
  const [showPass, setShowPass] = useState(false);

  const isAdmin = user?.role === "super_admin" || user?.role === "hr";
  const tabs = isAdmin
    ? ["Overview", "Offer Letters", "Employees", "Leads", "Projects", "Organization", "Settings"]
    : ["Overview", "Projects", "Milestones", "Invoices", "Settings"];

  const loadData = async () => {
    try {
      const [p, m, i, s, pr] = await Promise.all([
        api.getProjects().catch(() => []), 
        api.getMilestones().catch(() => []), 
        api.getInvoices().catch(() => []),
        api.getSettings().catch(() => []),
        api.getProjectRequests().catch(() => [])
      ]);
      setProjects(p); setMilestones(m); setInvoices(i); setSettings(s); setProjectRequests(pr);
      if (isAdmin) {
        const [o, emp, ld, deps, desigs] = await Promise.all([
          api.getOfferLetters().catch(() => []), 
          api.getUsers().catch(() => []),
          api.getLeads().catch(() => []),
          api.getDepartments().catch(() => []),
          api.getDesignations().catch(() => [])
        ]);
        setOffers(o); setEmployees(emp); setLeads(ld); setDepartments(deps); setDesignations(desigs);
      }
    } catch {}
  };

  useEffect(() => { loadData(); }, []);

  // Handlers
  const handleCreateOffer = async () => {
    try {
      await api.createOfferLetter({
        ...newOffer,
        department_id: newOffer.department_id ? parseInt(newOffer.department_id) : undefined,
        designation_id: newOffer.designation_id ? parseInt(newOffer.designation_id) : undefined,
      });
      toast({ title: "Success", description: "Offer letter draft created." });
      setShowCreateOffer(false);
      setNewOffer({ candidate_name: "", candidate_email: "", role_offered: "employee", department_id: "", designation_id: "", employment_type: "full_time", internship_end_date: "", salary_offered: 0 });
      loadData();
    } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const handleCreateDepartment = async () => {
    try {
      await api.createDepartment(newDept);
      toast({ title: "Success", description: "Department created." });
      setShowCreateDept(false);
      setNewDept({ name: "", description: "" });
      loadData();
    } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const handleCreateDesignation = async () => {
    try {
      await api.createDesignation({
        ...newDesig,
        department_id: parseInt(newDesig.department_id)
      });
      toast({ title: "Success", description: "Designation (Role) created." });
      setShowCreateDesig(false);
      setNewDesig({ title: "", department_id: "", description: "" });
      loadData();
    } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const handleAddSetting = async () => {
    try {
      await api.createSetting(newSetting);
      toast({ title: "Success", description: "Setting updated." });
      setNewSetting({ key: "", value: "", description: "" });
      loadData();
    } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const handleSendOffer = async (id: number) => {
    try {
      const result = await api.sendOfferLetter(id);
      setCreds({ type: 'offer', ...result });
      setShowCreds(true);
      toast({ title: "Sent!", description: "Offer sent & user account created." });
      loadData();
    } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const handleInviteLead = async (id: number) => {
    try {
      const result = await api.inviteLead(id);
      setCreds({ type: 'lead', ...result });
      setShowCreds(true);
      toast({ title: "Invited!", description: "Client account created." });
      loadData();
    } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const handleConvertIntern = async (id: number) => {
    try {
      await api.convertToFullTime(id);
      toast({ title: "Converted!", description: "Intern converted to full-time." });
      loadData();
    } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const handleApproveOnboarding = async (userId: number) => {
    try {
      await api.approveOnboarding(userId);
      toast({ title: "Approved", description: "User onboarding approved." });
      loadData();
    } catch (e: any) { toast({ title: "Error", description: e.message, variant: "destructive" }); }
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Copied to clipboard." });
  };

  const pendingOnboarding = employees.filter(e => e.status === "onboarding" || (e.onboarding_status && e.onboarding_status !== "none" && e.onboarding_status !== "approved"));
  
  const expiringInterns = employees.filter(e => {
    if (e.employment_type === "intern" && e.internship_end_date) {
      const end = new Date(e.internship_end_date);
      const now = new Date();
      const diffTime = Math.abs(end.getTime() - now.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    }
    return false;
  });

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-6 py-3">
          <Link to="/" className="text-xl font-bold"><span className="text-blue-400">KaizenSpark</span> Tech</Link>
          <div className="hidden md:flex gap-1 overflow-x-auto max-w-[60%]">{tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${activeTab === t ? "bg-white/10 text-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>{t}</button>
          ))}</div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 hidden sm:block">{user?.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full border ${user?.role === "super_admin" ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"}`}>{user?.role}</span>
            <button onClick={logout} className="text-sm text-red-400 hover:text-red-300 ml-2">Logout</button>
          </div>
        </div>
      </header>

      <main className="pt-20 px-6 max-w-7xl mx-auto pb-20">
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
                        <p className="text-xs text-gray-400">{emp.email} · {emp.role}</p>
                      </div>
                      <button onClick={() => handleApproveOnboarding(emp.id)} className="px-4 py-2 bg-green-500/10 text-green-400 hover:bg-green-500/20 rounded-lg text-sm font-medium">
                        Approve
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isAdmin && expiringInterns.length > 0 && (
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5 mt-6">
                <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2 mb-4"><AlertCircle className="w-5 h-5" /> Expiring Internships ({expiringInterns.length})</h3>
                <div className="space-y-3">
                  {expiringInterns.map(emp => (
                    <div key={emp.id} className="flex items-center justify-between bg-[#0f172a] rounded-lg p-4 border border-white/5">
                      <div>
                        <p className="font-medium">{emp.name}</p>
                        <p className="text-xs text-gray-400">Ends: {emp.internship_end_date}</p>
                      </div>
                      <button onClick={() => handleConvertIntern(emp.id)} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg text-sm font-medium">
                        Convert to Full Time
                      </button>
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
                    <Icon className="w-5 h-5 text-gray-400 mb-2" />
                    <p className="text-gray-400 text-sm">{c.label}</p>
                    <p className="text-3xl font-bold mt-1">{c.value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ORGANIZATION (Admin) */}
        {activeTab === "Organization" && isAdmin && (
          <div className="space-y-8 animate-in fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Organizational Structure</h2>
              <div className="flex gap-2">
                <button onClick={() => setShowCreateDept(true)} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-400" /> New Department
                </button>
                <button onClick={() => setShowCreateDesig(true)} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-sm font-medium hover:opacity-90 flex items-center gap-2">
                  <BriefcaseIcon className="w-4 h-4" /> New Role Title
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Departments List */}
              <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400"><Building2 className="w-5 h-5" /> Departments</h3>
                <div className="space-y-3">
                  {departments.map(d => (
                    <div key={d.id} className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-white">{d.name}</p>
                          <p className="text-xs text-gray-400 mt-1">{d.description || "No description"}</p>
                        </div>
                        <button onClick={async () => { if(confirm('Delete department?')) { await api.deleteDepartment(d.id); loadData(); }}} className="text-red-400/50 hover:text-red-400 p-1"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                  {departments.length === 0 && <p className="text-gray-500 text-sm italic">No departments created.</p>}
                </div>
              </div>

              {/* Designations List */}
              <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-cyan-400"><BriefcaseIcon className="w-5 h-5" /> Designations (Role Titles)</h3>
                <div className="space-y-3">
                  {designations.map(d => (
                    <div key={d.id} className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-white">{d.title}</p>
                          <p className="text-xs text-gray-400 mt-1">Dept: {departments.find(dep => dep.id === d.department_id)?.name || "Unknown"}</p>
                        </div>
                        <button onClick={async () => { if(confirm('Delete designation?')) { await api.deleteDesignation(d.id); loadData(); }}} className="text-red-400/50 hover:text-red-400 p-1"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                  {designations.length === 0 && <p className="text-gray-500 text-sm italic">No role titles created.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* OFFER LETTERS (Admin) */}
        {activeTab === "Offer Letters" && isAdmin && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Offer Letters</h2>
              <button onClick={() => setShowCreateOffer(true)} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-sm font-medium hover:opacity-90 flex items-center gap-2">
                <UserPlus className="w-4 h-4" /> New Offer
              </button>
            </div>
            <div className="grid gap-4">
              {offers.map(offer => (
                <div key={offer.id} className="bg-[#0f172a] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{offer.candidate_name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{offer.employment_type === 'intern' ? 'Intern' : 'Full Time'} | Salary: ${offer.salary_offered?.toLocaleString()}</p>
                      {offer.internship_end_date && <p className="text-xs text-amber-400 mt-1">Ends: {offer.internship_end_date}</p>}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${offer.status === 'accepted' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{offer.status.toUpperCase()}</span>
                  </div>
                  {offer.status === "draft" && (
                    <div className="mt-4">
                      <button onClick={() => handleSendOffer(offer.id)} className="text-sm flex items-center px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg">
                        <Send className="w-4 h-4 mr-2" /> Send Offer
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEADS (Admin) */}
        {activeTab === "Leads" && isAdmin && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold">Client Leads & Inquiries</h2>
            <div className="grid gap-4">
              {leads.map(lead => (
                <div key={lead.id} className="bg-[#0f172a] border border-white/5 rounded-xl p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{lead.name}</h3>
                      <p className="text-sm text-cyan-400">{lead.email}</p>
                      <p className="text-gray-300 mt-2 text-sm bg-white/5 p-3 rounded-lg">{lead.message}</p>
                    </div>
                    {lead.status === "pending" ? (
                      <button onClick={() => handleInviteLead(lead.id)} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg text-sm font-medium">
                        Invite Client
                      </button>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">INVITED</span>
                    )}
                  </div>
                </div>
              ))}
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
                  <h3 className="font-semibold text-lg">{emp.name}</h3>
                  <p className="text-sm text-gray-400">{emp.email}</p>
                  <div className="mt-4 pt-4 border-t border-white/5 flex gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300">{emp.employment_type === 'intern' ? 'Intern' : 'Full Time'}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">{emp.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === "Projects" && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold">Projects & Requests</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">Project Requests</h3>
              <div className="grid gap-4">
                {projectRequests.map(pr => (
                  <div key={pr.id} className="bg-[#0f172a] border border-cyan-500/20 rounded-xl p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{pr.title}</h4>
                        <p className="text-sm text-gray-400 mt-1">{pr.description}</p>
                        {pr.proposed_budget && <p className="text-sm text-green-400 mt-1">Budget: ${pr.proposed_budget.toLocaleString()}</p>}
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10">{pr.status}</span>
                    </div>
                    {isAdmin && pr.status === "submitted" && (
                      <div className="mt-4 flex gap-2">
                        <button onClick={async () => { await api.approveProjectRequest(pr.id); loadData(); }} className="text-xs px-3 py-1.5 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30">Approve & Allocate</button>
                      </div>
                    )}
                  </div>
                ))}
                {projectRequests.length === 0 && <p className="text-gray-500 text-sm">No project requests.</p>}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Active Projects</h3>
              <div className="grid gap-4">
                {projects.map(p => (
                  <div key={p.id} className="bg-[#0f172a] border border-white/5 rounded-xl p-5">
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{p.description || "—"}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 mt-3 inline-block">{p.status}</span>
                  </div>
                ))}
                {projects.length === 0 && <p className="text-gray-500 text-sm">No active projects.</p>}
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {activeTab === "Settings" && (
          <div className="space-y-8 animate-in fade-in max-w-4xl">
            <h2 className="text-2xl font-bold">Settings</h2>
            
            {isAdmin && (
              <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-6 text-cyan-400 flex items-center gap-2"><Plus className="w-5 h-5" /> Manage Business Contacts</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                   <div className="space-y-1"><label className="text-xs text-gray-400">Key (e.g. support_email)</label><input value={newSetting.key} onChange={e => setNewSetting({...newSetting, key: e.target.value})} className="w-full px-3 py-2 bg-[#1e293b] rounded-lg border border-white/10" placeholder="support_email" /></div>
                   <div className="space-y-1"><label className="text-xs text-gray-400">Value</label><input value={newSetting.value} onChange={e => setNewSetting({...newSetting, value: e.target.value})} className="w-full px-3 py-2 bg-[#1e293b] rounded-lg border border-white/10" placeholder="support@kaizenspark.com" /></div>
                   <div className="flex items-end"><button onClick={handleAddSetting} className="w-full py-2 bg-blue-500 rounded-lg font-medium hover:bg-blue-600 transition-colors">Add / Update</button></div>
                </div>
                <div className="space-y-2">
                  {settings.map(s => (
                    <div key={s.id} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                      <div><span className="text-xs font-mono text-gray-500 uppercase mr-3">{s.key}</span><span className="text-sm">{s.value}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-400"><Users className="w-5 h-5" /> My Profile</h3>
              <div className="grid gap-3">
                {[{ l: "Name", v: user?.name }, { l: "Email", v: user?.email }, { l: "Role", v: user?.role }].map(r => (
                  <div key={r.l} className="flex justify-between py-3 border-b border-white/5 last:border-0"><span className="text-gray-400">{r.l}</span><span className="font-medium">{r.v}</span></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Milestones for Client */}
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
      </main>

      {/* Modals */}
      
      {/* Create Department Modal */}
      {showCreateDept && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-xl font-semibold mb-4">Create New Department</h3>
            <div className="space-y-4">
              <div><label className="block text-sm text-gray-300 mb-1">Department Name</label><input value={newDept.name} onChange={e => setNewDept({...newDept, name: e.target.value})} placeholder="e.g. Engineering" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white" /></div>
              <div><label className="block text-sm text-gray-300 mb-1">Description</label><textarea value={newDept.description} onChange={e => setNewDept({...newDept, description: e.target.value})} placeholder="What does this dept do?" rows={3} className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white" /></div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowCreateDept(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                <button onClick={handleCreateDepartment} className="px-6 py-2 bg-blue-500 rounded-xl font-medium">Create</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Designation Modal */}
      {showCreateDesig && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] backdrop-blur-sm">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-xl font-semibold mb-4">Create New Role Title</h3>
            <div className="space-y-4">
              <div><label className="block text-sm text-gray-300 mb-1">Role Title</label><input value={newDesig.title} onChange={e => setNewDesig({...newDesig, title: e.target.value})} placeholder="e.g. Senior Frontend Dev" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white" /></div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Department</label>
                <select value={newDesig.department_id} onChange={e => setNewDesig({...newDesig, department_id: e.target.value})} className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white">
                  <option value="">Select Department</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowCreateDesig(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                <button onClick={handleCreateDesignation} className="px-6 py-2 bg-cyan-500 rounded-xl font-medium">Create Role</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Offer Modal */}
      {showCreateOffer && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4 overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-semibold mb-4">Draft Offer Letter</h3>
            <div className="space-y-4">
              <div><label className="block text-sm text-gray-300 mb-1">Candidate Name</label><input value={newOffer.candidate_name} onChange={e => setNewOffer({...newOffer, candidate_name: e.target.value})} placeholder="John Doe" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white" /></div>
              <div><label className="block text-sm text-gray-300 mb-1">Candidate Personal Email</label><input value={newOffer.candidate_email} onChange={e => setNewOffer({...newOffer, candidate_email: e.target.value})} type="email" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white" /></div>
              
              <div>
                <label className="block text-sm text-gray-300 mb-1">Department</label>
                <select value={newOffer.department_id} onChange={e => setNewOffer({...newOffer, department_id: e.target.value})} className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white">
                  <option value="">Select Department</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Designation (Role)</label>
                <select value={newOffer.designation_id} onChange={e => setNewOffer({...newOffer, designation_id: e.target.value})} className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white">
                  <option value="">Select Designation</option>
                  {designations.filter(d => !newOffer.department_id || d.department_id.toString() === newOffer.department_id).map(d => <option key={d.id} value={d.id}>{d.title}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-1">Employment Type</label>
                <select value={newOffer.employment_type} onChange={e => setNewOffer({...newOffer, employment_type: e.target.value})} className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white">
                  <option value="full_time">Full Time</option>
                  <option value="intern">Intern</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              {newOffer.employment_type === "intern" && (
                <div><label className="block text-sm text-gray-300 mb-1">Internship End Date</label><input type="date" value={newOffer.internship_end_date} onChange={e => setNewOffer({...newOffer, internship_end_date: e.target.value})} className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white" /></div>
              )}

              <div><label className="block text-sm text-gray-300 mb-1">Salary / Stipend</label><input value={newOffer.salary_offered} onChange={e => setNewOffer({...newOffer, salary_offered: Number(e.target.value)})} type="number" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white" /></div>
              
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
            <p className="text-gray-400 text-sm mb-6">Share these credentials with <strong>{creds.type === 'offer' ? creds.offer.candidate_name : creds.lead.name}</strong> manually.</p>
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
