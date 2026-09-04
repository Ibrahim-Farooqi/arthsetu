import api from './api';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone_number: string | null;
  role: string;
  is_active: boolean;
  kyc_status?: string;
  created_at?: string;
  last_login?: string | null;
  is_premium?: boolean;
}

class UserService {
  /**
   * Fetch current authenticated user's profile
   */
  async getProfile(): Promise<UserProfile> {
    // _suppressSignOut tells the global 401 interceptor NOT to redirect to
    // /login when this specific request gets a 401 (backend JWT verification
    // failure during first login). The AuthContext falls back to Supabase
    // session metadata in that case, so the user still sees their dashboard.
    const config: any = {};
    config._suppressSignOut = true;
    const response = await api.get('/auth/me', config);
    return response.data;
  }

  /**
   * Update current authenticated user's profile
   */
  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await api.put('/users/me', data);
    return response.data;
  }
}

export const userService = new UserService();
export default userService;
