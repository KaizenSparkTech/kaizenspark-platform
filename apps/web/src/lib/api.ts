/**
 * API client for KaizenSpark Platform.
 * Handles JWT auth, base URL, and typed request methods.
 */

const API_BASE = import.meta.env.VITE_API_URL || "/api/v1";

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem("kaizen_token");
  }

  private async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {} } = options;
    const token = this.getToken();

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Request failed" }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // --- Auth ---
  async register(data: { name: string; email: string; password: string }) {
    return this.request<{ access_token: string; token_type: string; user: UserResponse }>("/auth/register", { method: "POST", body: data });
  }

  async login(data: { email: string; password: string }) {
    return this.request<{ access_token: string; token_type: string; user: UserResponse }>("/auth/login", { method: "POST", body: data });
  }

  async getMe() {
    return this.request<UserResponse>("/auth/me");
  }

  async changePassword(old_password: string, new_password: string) {
    return this.request<{ message: string }>("/auth/change-password", { method: "POST", body: { old_password, new_password } });
  }

  // --- Users & Org ---
  async getUsers() {
    return this.request<UserResponse[]>("/users/");
  }

  async getUser(id: number) {
    return this.request<UserResponse>(`/users/${id}`);
  }

  async updateMyProfile(data: Partial<UserOnboardingUpdate>) {
    return this.request<UserResponse>("/users/me/profile", { method: "PUT", body: data });
  }

  async updateUser(id: number, data: Partial<UserResponse>) {
    return this.request<UserResponse>(`/users/${id}`, { method: "PUT", body: data });
  }

  async approveOnboarding(userId: number) {
    return this.request<UserResponse>(`/users/${userId}/approve-onboarding`, { method: "POST" });
  }

  async convertToFullTime(userId: number) {
    return this.request<UserResponse>(`/users/${userId}/convert-to-full-time`, { method: "POST" });
  }

  async getDepartments() {
    return this.request<any[]>("/departments/");
  }

  async getTeams() {
    return this.request<any[]>("/teams/");
  }

  // Departments
  async createDepartment(data: { name: string; description?: string }) {
    return this.request<any>("/departments/", { method: "POST", body: data });
  }

  async updateDepartment(id: number, data: any) {
    return this.request<any>(`/departments/${id}`, { method: "PUT", body: data });
  }

  async deleteDepartment(id: number) {
    return this.request<any>(`/departments/${id}`, { method: "DELETE" });
  }

  // Designations
  async getDesignations(departmentId?: number) {
    const params = departmentId ? `?department_id=${departmentId}` : "";
    return this.request<any[]>(`/designations/${params}`);
  }

  async createDesignation(data: { title: string; department_id: number; description?: string }) {
    return this.request<any>("/designations/", { method: "POST", body: data });
  }

  async updateDesignation(id: number, data: any) {
    return this.request<any>(`/designations/${id}`, { method: "PUT", body: data });
  }

  async deleteDesignation(id: number) {
    return this.request<any>(`/designations/${id}`, { method: "DELETE" });
  }

  // --- Projects ---
  async getProjects() {
    return this.request<ProjectResponse[]>("/projects/");
  }

  async createProject(data: { title: string; description?: string; client_id: number; status?: string }) {
    return this.request<ProjectResponse>("/projects/", { method: "POST", body: data });
  }

  async updateProject(id: number, data: Partial<ProjectResponse>) {
    return this.request<ProjectResponse>(`/projects/${id}`, { method: "PUT", body: data });
  }

  async deleteProject(id: number) {
    return this.request<{ message: string }>(`/projects/${id}`, { method: "DELETE" });
  }

  // --- Project Requests (Client submits, Admin approves) ---
  async getProjectRequests() {
    return this.request<ProjectRequestResponse[]>("/project-requests/");
  }

  async createProjectRequest(data: { title: string; description?: string; proposed_budget?: number; expected_deadline?: string; priority?: string }) {
    return this.request<ProjectRequestResponse>("/project-requests/", { method: "POST", body: data });
  }

  async approveProjectRequest(id: number) {
    return this.request<ProjectRequestResponse>(`/project-requests/${id}/approve`, { method: "POST" });
  }

  async rejectProjectRequest(id: number, reason?: string) {
    return this.request<ProjectRequestResponse>(`/project-requests/${id}/reject`, { method: "POST", body: { rejection_reason: reason } });
  }

  // --- Leads ---
  async getLeads() {
    return this.request<LeadResponse[]>("/leads/");
  }

  async submitLead(data: { name: string; email: string; message: string }) {
    return this.request<LeadResponse>("/leads/", { method: "POST", body: data });
  }

  async inviteLead(id: number) {
    return this.request<LeadInviteResponse>(`/leads/${id}/invite`, { method: "POST" });
  }

  // --- Settings ---
  async getSettings() {
    return this.request<SystemSettingResponse[]>("/settings/");
  }

  async getSetting(key: string) {
    return this.request<SystemSettingResponse>(`/settings/${key}`);
  }

  async createSetting(data: { key: string; value: string; description?: string }) {
    return this.request<SystemSettingResponse>("/settings/", { method: "POST", body: data });
  }

  async updateSetting(id: number, data: Partial<SystemSettingResponse>) {
    return this.request<SystemSettingResponse>(`/settings/${id}`, { method: "PUT", body: data });
  }

  // --- HR: Offer Letters ---
  async getOfferLetters() {
    return this.request<OfferLetterResponse[]>("/offer-letters/");
  }

  async createOfferLetter(data: any) {
    return this.request<OfferLetterResponse>("/offer-letters/", { method: "POST", body: data });
  }

  async sendOfferLetter(id: number) {
    return this.request<SendOfferResponse>(`/offer-letters/${id}/send`, { method: "POST" });
  }

  async acceptOfferLetter(id: number, signature_text: string) {
    return this.request<OfferLetterResponse>(`/offer-letters/${id}/accept`, { method: "POST", body: { signature_text } });
  }

  // --- HR: Onboarding ---
  async getOnboardingChecklists(userId?: number) {
    const params = userId ? `?user_id=${userId}` : "";
    return this.request<OnboardingChecklistResponse[]>(`/onboarding/${params}`);
  }

  async createOnboardingTask(data: { user_id: number; task_title: string; task_description?: string }) {
    return this.request<OnboardingChecklistResponse>("/onboarding/", { method: "POST", body: data });
  }

  async updateOnboardingTask(id: number, status: string) {
    return this.request<OnboardingChecklistResponse>(`/onboarding/${id}`, { method: "PUT", body: { status } });
  }

  // --- HR: Attendance ---
  async checkIn(notes?: string) {
    return this.request<any>("/attendance/check-in", { method: "POST", body: { notes } });
  }

  async checkOut(notes?: string) {
    return this.request<any>("/attendance/check-out", { method: "POST", body: { notes } });
  }

  async getAttendanceHistory() {
    return this.request<any[]>("/attendance/history");
  }

  // --- Dev ---
  async seedData() {
    return this.request<{ message: string }>("/dev/seed", { method: "POST" });
  }

  // --- Milestones & Invoices ---
  async getMilestones() {
    return this.request<MilestoneResponse[]>("/milestones/");
  }

  async getInvoices() {
    return this.request<InvoiceResponse[]>("/invoices/");
  }
}

// --- Types ---
export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatar_url?: string;
  employee_id?: string;
  department_id?: number;
  designation_id?: number;
  team_id?: number;
  reporting_to?: number;
  date_of_joining?: string;
  employment_type?: string;
  internship_end_date?: string;
  status: string;
  is_verified: boolean;
  personal_email?: string;
  address?: string;
  date_of_birth?: string;
  github_url?: string;
  linkedin_url?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  onboarding_status: string;
  temp_password_changed: boolean;
  created_at: string;
}

export interface UserOnboardingUpdate {
  name?: string;
  phone?: string;
  address?: string;
  date_of_birth?: string;
  github_url?: string;
  linkedin_url?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}

export interface ProjectResponse {
  id: number;
  client_id: number;
  title: string;
  description?: string;
  status: string;
  team_id?: number;
  created_at: string;
  updated_at?: string;
}

export interface ProjectRequestResponse {
  id: number;
  client_id: number;
  title: string;
  description?: string;
  proposed_budget?: number;
  expected_deadline?: string;
  priority?: string;
  status: string;
  rejection_reason?: string;
  created_at: string;
}

export interface OfferLetterResponse {
  id: number;
  candidate_name: string;
  candidate_email: string;
  role_offered: string;
  employment_type?: string;
  internship_end_date?: string;
  salary_offered: number;
  status: string;
  generated_user_id?: number;
  generated_email?: string;
  created_at: string;
  accepted_at?: string;
}

export interface SendOfferResponse {
  offer: OfferLetterResponse;
  generated_email: string;
  generated_password: string;
  message: string;
}

export interface OnboardingChecklistResponse {
  id: number;
  user_id: number;
  task_title: string;
  task_description?: string;
  status: string;
  due_date?: string;
  completed_at?: string;
}

export interface MilestoneResponse {
  id: number;
  project_id: number;
  title: string;
  description?: string;
  progress: number;
}

export interface InvoiceResponse {
  id: number;
  project_id: number;
  amount: number;
  status: string;
  issued_date?: string;
}

export interface LeadResponse {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

export interface LeadInviteResponse {
  lead: LeadResponse;
  generated_email: string;
  generated_password: string;
  message: string;
}

export interface SystemSettingResponse {
  id: number;
  key: string;
  value: string;
  description?: string;
  updated_at: string;
}

export const api = new ApiClient();
