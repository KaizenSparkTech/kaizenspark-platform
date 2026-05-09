import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { api, OfferLetterResponse, OnboardingChecklistResponse } from "@/lib/api";
import { Check, Lock, User, FileText, ClipboardList, Clock, ArrowRight, Edit3, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type Step = "password" | "profile" | "offer" | "checklist" | "waiting";

export default function OnboardingPage() {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<Step>("password");
  const [loading, setLoading] = useState(false);

  // Password form
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Profile form
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    address: "",
    date_of_birth: "",
    github_url: "",
    linkedin_url: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
  });

  // Offer & checklist
  const [offers, setOffers] = useState<OfferLetterResponse[]>([]);
  const [onboarding, setOnboarding] = useState<OnboardingChecklistResponse[]>([]);
  const [signature, setSignature] = useState("");

  useEffect(() => {
    if (!user) return;
    // Determine which step to show
    if (!user.temp_password_changed) {
      setCurrentStep("password");
    } else if (user.onboarding_status === "pending") {
      setCurrentStep("profile");
    } else if (user.onboarding_status === "in_progress") {
      setCurrentStep("offer");
    } else if (user.onboarding_status === "completed") {
      setCurrentStep("waiting");
    } else if (user.onboarding_status === "approved") {
      navigate("/dashboard");
    }

    // Pre-fill profile
    setProfile({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      date_of_birth: user.date_of_birth || "",
      github_url: user.github_url || "",
      linkedin_url: user.linkedin_url || "",
      emergency_contact_name: user.emergency_contact_name || "",
      emergency_contact_phone: user.emergency_contact_phone || "",
    });

    loadOfferData();
  }, [user]);

  const loadOfferData = async () => {
    try {
      const [o, ob] = await Promise.all([
        api.getOfferLetters(),
        api.getOnboardingChecklists(),
      ]);
      setOffers(o);
      setOnboarding(ob);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords don't match", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await api.changePassword(oldPassword, newPassword);
      toast({ title: "Success", description: "Password changed successfully!" });
      await refreshUser();
      setCurrentStep("profile");
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const data: Record<string, any> = {};
      if (profile.name) data.name = profile.name;
      if (profile.phone) data.phone = profile.phone;
      if (profile.address) data.address = profile.address;
      if (profile.date_of_birth) data.date_of_birth = profile.date_of_birth;
      if (profile.github_url) data.github_url = profile.github_url;
      if (profile.linkedin_url) data.linkedin_url = profile.linkedin_url;
      if (profile.emergency_contact_name) data.emergency_contact_name = profile.emergency_contact_name;
      if (profile.emergency_contact_phone) data.emergency_contact_phone = profile.emergency_contact_phone;

      await api.updateMyProfile(data);
      toast({ title: "Saved", description: "Profile updated successfully!" });
      await refreshUser();
      setCurrentStep("offer");
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOffer = async (offerId: number) => {
    if (!signature.trim()) {
      toast({ title: "Error", description: "Please type your full name as a signature.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await api.acceptOfferLetter(offerId, signature);
      toast({ title: "Accepted!", description: "You have accepted the offer letter." });
      await refreshUser();
      await loadOfferData();
      setCurrentStep("checklist");
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async (id: number) => {
    try {
      await api.updateOnboardingTask(id, "completed");
      toast({ title: "Done", description: "Task marked as complete." });
      await loadOfferData();
      // Check if all done
      const updated = onboarding.map(t => t.id === id ? { ...t, status: "completed" } : t);
      if (updated.every(t => t.status === "completed")) {
        setCurrentStep("waiting");
      }
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const steps: { key: Step; icon: any; label: string }[] = [
    { key: "password", icon: Lock, label: "Change Password" },
    { key: "profile", icon: User, label: "Personal Details" },
    { key: "offer", icon: FileText, label: "Accept Offer" },
    { key: "checklist", icon: ClipboardList, label: "Checklist" },
    { key: "waiting", icon: Clock, label: "Approval" },
  ];

  const stepOrder = ["password", "profile", "offer", "checklist", "waiting"];
  const currentIndex = stepOrder.indexOf(currentStep);

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-6 py-3">
          <h1 className="text-xl font-bold">
            <span className="text-blue-400">KaizenSpark</span> Onboarding
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">{user?.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
              {user?.role}
            </span>
          </div>
        </div>
      </header>

      <main className="pt-20 px-6 max-w-3xl mx-auto pb-20">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-12 mt-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = step.key === currentStep;
            const isCompleted = i < currentIndex;
            return (
              <div key={step.key} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted ? "bg-green-500/20 border-green-500 text-green-400" :
                    isActive ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 ring-4 ring-cyan-400/20" :
                    "border-gray-600 text-gray-500"
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs mt-2 ${isActive ? "text-cyan-400 font-medium" : isCompleted ? "text-green-400" : "text-gray-500"}`}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 mb-6 ${i < currentIndex ? "bg-green-500" : "bg-gray-700"}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step: Change Password */}
        {currentStep === "password" && (
          <div className="animate-in fade-in space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold">Change Your Password</h2>
              <p className="text-gray-400 mt-2">You're using a temporary password. Please set a new secure password.</p>
            </div>
            <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Temporary Password</label>
                <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Enter your temporary password" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">New Password</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min. 6 characters" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Confirm New Password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat new password" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/50" />
              </div>
              <button onClick={handleChangePassword} disabled={loading} className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? "Updating..." : <><ArrowRight className="w-5 h-5" /> Set New Password</>}
              </button>
            </div>
          </div>
        )}

        {/* Step: Personal Details */}
        {currentStep === "profile" && (
          <div className="animate-in fade-in space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold">Complete Your Profile</h2>
              <p className="text-gray-400 mt-2">Tell us about yourself so we can set up your workspace.</p>
            </div>
            <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Full Name</label>
                  <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Phone</label>
                  <input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="+91 98765 43210" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Date of Birth</label>
                <input type="date" value={profile.date_of_birth} onChange={e => setProfile({ ...profile, date_of_birth: e.target.value })} className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50" />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">Address</label>
                <textarea value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })} placeholder="Your residential address" rows={2} className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">GitHub Profile</label>
                  <input value={profile.github_url} onChange={e => setProfile({ ...profile, github_url: e.target.value })} placeholder="https://github.com/username" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">LinkedIn Profile</label>
                  <input value={profile.linkedin_url} onChange={e => setProfile({ ...profile, linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/username" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Emergency Contact Name</label>
                  <input value={profile.emergency_contact_name} onChange={e => setProfile({ ...profile, emergency_contact_name: e.target.value })} placeholder="Parent / Guardian name" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">Emergency Contact Phone</label>
                  <input value={profile.emergency_contact_phone} onChange={e => setProfile({ ...profile, emergency_contact_phone: e.target.value })} placeholder="+91 98765 43210" className="w-full px-4 py-3 bg-[#1e293b] border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50" />
                </div>
              </div>
              <button onClick={handleSaveProfile} disabled={loading} className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? "Saving..." : <><ArrowRight className="w-5 h-5" /> Save & Continue</>}
              </button>
            </div>
          </div>
        )}

        {/* Step: Accept Offer */}
        {currentStep === "offer" && (
          <div className="animate-in fade-in space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold">Review & Accept Offer</h2>
              <p className="text-gray-400 mt-2">Read your offer letter and sign to accept.</p>
            </div>
            {offers.filter(o => o.status === "sent").map(offer => (
              <div key={offer.id} className="bg-gradient-to-br from-blue-900/40 to-cyan-900/30 border border-cyan-500/30 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-cyan-50">Offer Letter — {offer.role_offered.replace("_", " ").toUpperCase()}</h3>
                    <p className="text-cyan-200/70 text-sm mt-1">Offered salary / stipend: ${offer.salary_offered?.toLocaleString() || "N/A"}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">PENDING SIGNATURE</span>
                </div>
                <div className="mt-6 bg-black/20 p-4 rounded-xl border border-white/5">
                  <p className="text-sm text-gray-300 mb-3">Type your full name below to sign and accept this offer:</p>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Edit3 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        value={signature}
                        onChange={e => setSignature(e.target.value)}
                        placeholder="Type your full name as e-signature"
                        className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <button
                      onClick={() => handleAcceptOffer(offer.id)}
                      disabled={loading}
                      className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-xl hover:bg-cyan-400 transition-colors flex items-center disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 mr-2" /> Accept
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {offers.filter(o => o.status === "accepted").length > 0 && offers.filter(o => o.status === "sent").length === 0 && (
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 bg-green-500/10 rounded-lg border border-green-500/20 text-green-400 mb-4">
                  <Check className="w-5 h-5 mr-2" /> Offer accepted!
                </div>
                <button onClick={() => setCurrentStep("checklist")} className="block mx-auto mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl font-medium flex items-center gap-2">
                  <ArrowRight className="w-5 h-5" /> Continue to Checklist
                </button>
              </div>
            )}
            {offers.length === 0 && <p className="text-gray-500 text-center py-10">No offer letters found. Please contact your admin.</p>}
          </div>
        )}

        {/* Step: Onboarding Checklist */}
        {currentStep === "checklist" && (
          <div className="animate-in fade-in space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold">Onboarding Checklist</h2>
              <p className="text-gray-400 mt-2">Complete these tasks to finish your onboarding.</p>
            </div>
            <div className="space-y-3">
              {onboarding.map(task => (
                <div key={task.id} className={`p-4 rounded-xl flex items-center justify-between border transition-all ${task.status === "completed" ? "bg-green-500/5 border-green-500/20" : "bg-[#0f172a] border-white/5 hover:border-white/10"}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${task.status === "completed" ? "bg-green-500/20 border-green-500/50 text-green-400" : "border-gray-500 text-transparent"}`}>
                      {task.status === "completed" && <Check className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className={`${task.status === "completed" ? "text-gray-400 line-through" : "text-gray-200 font-medium"}`}>{task.task_title}</span>
                      {task.task_description && <p className="text-xs text-gray-500 mt-0.5">{task.task_description}</p>}
                    </div>
                  </div>
                  {task.status !== "completed" && (
                    <button onClick={() => handleCompleteTask(task.id)} className="text-sm px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors">
                      Mark Done
                    </button>
                  )}
                </div>
              ))}
              {onboarding.length === 0 && <p className="text-gray-500 text-center py-10">No tasks assigned yet.</p>}
            </div>
            {onboarding.length > 0 && onboarding.every(t => t.status === "completed") && (
              <div className="text-center mt-8">
                <button onClick={() => setCurrentStep("waiting")} className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl font-medium text-black flex items-center gap-2 mx-auto">
                  <ArrowRight className="w-5 h-5" /> All Done — Submit for Approval
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step: Waiting for Approval */}
        {currentStep === "waiting" && (
          <div className="animate-in fade-in text-center py-20">
            <div className="w-20 h-20 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-amber-400 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Onboarding Complete! 🎉</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              You've completed all onboarding steps. Your admin will review and approve your profile shortly.
              Once approved, you'll get full access to your dashboard.
            </p>
            <div className="mt-8 inline-flex items-center px-4 py-2 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-400">
              <Clock className="w-4 h-4 mr-2" /> Awaiting admin approval...
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
