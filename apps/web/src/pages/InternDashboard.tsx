import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { api, OfferLetterResponse, OnboardingChecklistResponse } from "@/lib/api";
import { Check, Edit3, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function InternDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [offers, setOffers] = useState<OfferLetterResponse[]>([]);
  const [onboarding, setOnboarding] = useState<OnboardingChecklistResponse[]>([]);
  const [signature, setSignature] = useState("");

  const loadData = async () => {
    try {
      const [o, ob] = await Promise.all([
        api.getOfferLetters(),
        api.getOnboardingChecklists()
      ]);
      setOffers(o);
      setOnboarding(ob);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleAcceptOffer = async (id: number) => {
    if (!signature.trim()) {
      toast({ title: "Error", description: "Please type your name as a signature to accept.", variant: "destructive" });
      return;
    }
    try {
      await api.acceptOfferLetter(id, signature);
      toast({ title: "Accepted!", description: "You have accepted the offer." });
      loadData();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const handleCompleteTask = async (id: number) => {
    try {
      await api.updateOnboardingTask(id, "completed");
      toast({ title: "Task Completed", description: "Onboarding task marked as done." });
      loadData();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl">
      <h2 className="text-3xl font-bold">Welcome, {user?.name}! 🎉</h2>
      <p className="text-gray-400 text-lg">Your Intern Portal</p>

      <div className="mt-8 space-y-6">
        <h3 className="text-xl font-semibold text-white/90">Your Documents</h3>
        {offers.map(offer => (
          <div key={offer.id} className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-cyan-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
            <h4 className="text-lg font-bold text-cyan-50">{offer.role_offered === "intern" ? "Internship Offer Letter" : "Offer Letter"}</h4>
            <p className="text-cyan-200/70 mt-1">Salary / Stipend: ${offer.salary_offered.toLocaleString()}</p>
            
            {offer.status === "sent" && (
              <div className="mt-6 space-y-4">
                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                  <p className="text-sm text-gray-300 mb-3">Please sign below to formally accept this offer.</p>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Edit3 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        placeholder="Type your full name as signature"
                        className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <button 
                      onClick={() => handleAcceptOffer(offer.id)}
                      className="px-6 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors flex items-center"
                    >
                      <Send className="w-4 h-4 mr-2" /> Accept Offer
                    </button>
                  </div>
                </div>
              </div>
            )}

            {offer.status === "accepted" && (
              <div className="mt-6 flex items-center text-green-400 bg-green-500/10 w-fit px-4 py-2 rounded-lg border border-green-500/20">
                <Check className="w-5 h-5 mr-2" />
                <span className="font-medium">Offer Accepted on {new Date(offer.accepted_at || "").toLocaleDateString()}</span>
              </div>
            )}
          </div>
        ))}
        {offers.length === 0 && (
           <p className="text-gray-500">You don't have any pending offer letters.</p>
        )}
      </div>

      <div className="mt-12 space-y-6">
        <h3 className="text-xl font-semibold text-white/90">Onboarding Checklist</h3>
        <div className="space-y-3">
          {onboarding.map(task => (
            <div key={task.id} className={`p-4 rounded-xl flex items-center justify-between border transition-all ${task.status === 'completed' ? 'bg-green-500/5 border-green-500/20' : 'bg-[#0f172a] border-white/5 hover:border-white/10'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${task.status === 'completed' ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'border-gray-500 text-transparent'}`}>
                  {task.status === 'completed' && <Check className="w-4 h-4" />}
                </div>
                <span className={`${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-200 font-medium'}`}>{task.task_title}</span>
              </div>
              {task.status !== 'completed' && (
                <button onClick={() => handleCompleteTask(task.id)} className="text-sm px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                  Mark Complete
                </button>
              )}
            </div>
          ))}
          {onboarding.length === 0 && <p className="text-gray-500">No onboarding tasks assigned yet.</p>}
        </div>
      </div>
    </div>
  );
}
