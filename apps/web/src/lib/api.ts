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

  // --- Users & Org ---
  async getUsers() {
    return this.request<UserResponse[]>("/users/");
  }

  async getDepartments() {
    return this.request<any[]>("/departments/");
  }

  async getTeams() {
    return this.request<any[]>("/teams/");
  }

  async getDesignations() {
    return this.request<any[]>("/designations/");
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

  // --- HR: Offer Letters ---
  async getOfferLetters() {
    return this.request<OfferLetterResponse[]>("/offer-letters/");
  }

  async createOfferLetter(data: any) {
    return this.request<OfferLetterResponse>("/offer-letters/", { method: "POST", body: data });
  }

  async sendOfferLetter(id: number) {
    return this.request<OfferLetterResponse>(`/offer-letters/${id}/send`, { method: "POST" });
  }

  async acceptOfferLetter(id: number, signature_text: string) {
    return this.request<OfferLetterResponse>(`/offer-letters/${id}/accept`, { method: "POST", body: { signature_text } });
  }

  // --- HR: Onboarding ---
  async getOnboardingChecklists() {
    return this.request<OnboardingChecklistResponse[]>("/onboarding/");
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
}

// --- Types ---
export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface ProjectResponse {
  id: number;
  client_id: number;
  title: string;
  description?: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export interface OfferLetterResponse {
  id: number;
  candidate_name: string;
  candidate_email: string;
  role_offered: string;
  salary_offered: number;
  status: string;
  created_at: string;
  accepted_at?: string;
}

export interface OnboardingChecklistResponse {
  id: number;
  task_title: string;
  status: string;
  due_date?: string;
}

export const api = new ApiClient();
