import { supabase } from '../lib/supabaseClient';
import api from './api';
import type { UserProfile } from './user.service';

export interface SignUpWithPasswordRequest {
  email: string;
  password: string;
  fullName: string;
  mobileNumber?: string;
}

export interface SignInWithPasswordRequest {
  email: string;
  password: string;
}

/**
 * Real Supabase Auth integration (email/password + email OTP).
 *
 * Supabase issues the JWT and owns credential storage; the FastAPI backend
 * verifies that JWT (see backend app/api/deps.py) and lazily provisions a
 * lightweight ArthSetu profile row (BRD 6.1 — no Aadhaar/PAN/bank fields)
 * the first time GET /auth/me is called for a given Supabase user.
 */
class AuthService {
  /** Create a new account with email + password. */
  async signUpWithPassword({ email, password, fullName, mobileNumber }: SignUpWithPasswordRequest) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, mobile_number: mobileNumber },
      },
    });
    if (error) throw error;
    return data;
  }

  /** Sign in with email + password. */
  async signInWithPassword({ email, password }: SignInWithPasswordRequest) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  /** Send a 6-digit one-time-passcode to the given email. */
  async sendOtp(email: string) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    if (error) throw error;
  }

  /** Verify a 6-digit OTP previously sent via sendOtp(). */
  async verifyOtp(email: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
    if (error) throw error;
    return data;
  }

  /** Send a password-reset email (link points at /reset-password). */
  async resetPasswordForEmail(email: string) {
    const redirectTo = `${window.location.origin}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw error;
  }

  /** Current Supabase session, if any (reads local storage, no network call). */
  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  /**
   * Fetch (and, on first login, implicitly provision) the ArthSetu profile
   * for the currently signed-in Supabase user.
   */
  async getUserProfile(): Promise<UserProfile> {
    const response = await api.get('/auth/me');
    return response.data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  /** Back-compat alias used by a few older call sites. */
  async logout() {
    await this.signOut();
  }
}

export const authService = new AuthService();
export default authService;
