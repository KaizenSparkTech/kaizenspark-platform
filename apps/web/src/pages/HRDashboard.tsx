import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { api, OfferLetterResponse, OnboardingChecklistResponse, UserResponse } from "@/lib/api";
import { Check, Mail, Send, UserPlus, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function HRDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"OfferLetters" | "Onboarding" | "Employees">("OfferLetters");
  const [offers, setOffers] = useState<OfferLetterResponse[]>([]);
  const [onboarding, setOnboarding] = useState<OnboardingChecklistResponse[]>([]);
  const [employees, setEmployees] = useState<UserResponse[]>([]);
  
  const [showCreateOffer, setShowCreateOffer] = useState(false);
  const [newOffer, setNewOffer] = useState({ candidate_name: "", candidate_email: "", role_offered: "intern", salary_offered: 0 });

  const loadData = async () => {
    try {
      const [o, ob, emp] = await Promise.all([
        api.getOfferLetters(),
        api.getOnboardingChecklists(),
        api.getUsers()
      ]);
      setOffers(o);
      setOnboarding(ob);
      setEmployees(emp);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleCreateOffer = async () => {
    try {
      await api.createOfferLetter(newOffer);
      toast({ title: "Success", description: "Offer letter draft created." });
      setShowCreateOffer(false);
      loadData();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const handleSendOffer = async (id: number) => {
    try {
      await api.sendOfferLetter(id);
      toast({ title: "Sent", description: "Offer letter sent to candidate." });
      loadData();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex gap-4 border-b border-white/10 pb-2">
        {(["OfferLetters", "Onboarding", "Employees"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition-all ${activeTab === tab ? "text-cyan-400 border-b-2 border-cyan-400" : "text-gray-400 hover:text-white"}`}
          >
            {tab.replace(/([A-Z])/g, ' $1').trim()}
          </button>
        ))}
      </div>

      {activeTab === "OfferLetters" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Offer Letters</h2>
            <button onClick={() => setShowCreateOffer(true)} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20">
              <UserPlus className="w-4 h-4 inline mr-2"/> New Offer
            </button>
          </div>
          <div className="grid gap-4">
            {offers.map(offer => (
              <div key={offer.id} className="bg-[#0f172a] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{offer.candidate_name} <span className="text-sm text-gray-400">({offer.candidate_email})</span></h3>
                    <p className="text-gray-400 text-sm mt-1">Role: {offer.role_offered} | Salary: ${offer.salary_offered.toLocaleString()}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${offer.status === "accepted" ? "bg-green-500/20 text-green-400" : offer.status === "sent" ? "bg-blue-500/20 text-blue-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                    {offer.status.toUpperCase()}
                  </span>
                </div>
                {offer.status === "draft" && (
                  <div className="mt-4">
                    <button onClick={() => handleSendOffer(offer.id)} className="text-sm flex items-center px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                      <Send className="w-4 h-4 mr-2" /> Send Offer
                    </button>
                  </div>
                )}
                {offer.status === "accepted" && (
                  <p className="mt-4 text-sm text-green-400 flex items-center">
                    <Check className="w-4 h-4 mr-2" /> Accepted on {offer.accepted_at ? new Date(offer.accepted_at).toLocaleDateString() : 'N/A'}
                  </p>
                )}
              </div>
            ))}
            {offers.length === 0 && <p className="text-gray-500 text-center py-10">No offer letters found.</p>}
          </div>

          {showCreateOffer && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
              <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 w-full max-w-md mx-4">
                <h3 className="text-xl font-semibold mb-4">Draft Offer Letter</h3>
                <div className="space-y-4">
                  <input value={newOffer.candidate_name} onChange={e => setNewOffer({...newOffer, candidate_name: e.target.value})} placeholder="Candidate Name" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" />
                  <input value={newOffer.candidate_email} onChange={e => setNewOffer({...newOffer, candidate_email: e.target.value})} placeholder="Candidate Email" type="email" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" />
                  <select value={newOffer.role_offered} onChange={e => setNewOffer({...newOffer, role_offered: e.target.value})} className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50">
                    <option value="intern">Intern</option>
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                  </select>
                  <input value={newOffer.salary_offered} onChange={e => setNewOffer({...newOffer, salary_offered: Number(e.target.value)})} placeholder="Salary" type="number" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" />
                  
                  <div className="flex justify-end gap-3 mt-6">
                    <button onClick={() => setShowCreateOffer(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                    <button onClick={handleCreateOffer} className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl font-medium">Create Draft</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "Onboarding" && (
        <div className="space-y-6">
           <h2 className="text-2xl font-bold">Onboarding Tracking</h2>
           <div className="grid gap-4">
             {onboarding.map(task => (
                <div key={task.id} className="bg-[#0f172a] border border-white/5 rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{task.task_title}</h3>
                    <p className="text-sm text-gray-400">Status: {task.status}</p>
                  </div>
                  {task.status === "completed" ? <Check className="text-green-400" /> : <Clock className="text-yellow-400" />}
                </div>
             ))}
             {onboarding.length === 0 && <p className="text-gray-500 text-center py-10">No onboarding tasks.</p>}
           </div>
        </div>
      )}

      {activeTab === "Employees" && (
        <div className="space-y-6">
           <h2 className="text-2xl font-bold">Employee Directory</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {employees.map(emp => (
                <div key={emp.id} className="bg-[#0f172a] border border-white/5 rounded-xl p-5">
                  <h3 className="font-semibold text-lg">{emp.name}</h3>
                  <p className="text-sm text-gray-400">{emp.email}</p>
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300">{emp.role}</span>
                  </div>
                </div>
             ))}
           </div>
        </div>
      )}
    </div>
  );
}
