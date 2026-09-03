import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';
import userService from '../services/user.service';
import type { UserProfile } from '../services/user.service';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  login: (token?: string, userData?: UserProfile) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    // 1. Initial session load
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setSessionLoading(false);
    });

    // 2. Real-time auth subscription
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setSessionLoading(false);
      if (!newSession) {
        queryClient.setQueryData(['authUser'], null);
      } else {
        queryClient.invalidateQueries({ queryKey: ['authUser'] });
      }
    });

    return () => subscription.subscription.unsubscribe();
  }, [queryClient]);

  const token = session?.access_token ?? null;

  // Fetch real profile from DB via backend API
  const { data: dbUser = null, isLoading: profileLoading } = useQuery({
    queryKey: ['authUser', session?.user?.id],
    queryFn: async () => {
      try {
        return await userService.getProfile();
      } catch {
        // If backend returns 401/500 (e.g. JWT verification issue or user not
        // yet provisioned), return null — AuthContext will use Supabase session
        // metadata as fallback so the dashboard still renders.
        return null;
      }
    },
    enabled: !!token,
    retry: false,
  });

  // Construct real user profile from Supabase session and database row
  let currentUser: UserProfile | null = null;
  if (session?.user) {
    const meta = session.user.user_metadata || {};
    currentUser = {
      id: session.user.id,
      email: session.user.email || '',
      full_name: dbUser?.full_name || meta.full_name || (session.user.email ? session.user.email.split('@')[0] : 'User'),
      phone_number: dbUser?.phone_number || meta.mobile_number || session.user.phone || null,
      role: dbUser?.role || 'INVESTOR',
      is_active: true,
      is_premium: dbUser?.is_premium || false,
      created_at: session.user.created_at,
    };
  }

  const login = () => {
    // Handled automatically via Supabase onAuthStateChange
  };

  const logout = async () => {
    await supabase.auth.signOut();
    queryClient.setQueryData(['authUser'], null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        token,
        login,
        logout,
        isAuthenticated: !!session,
        // Only show loading spinner during initial session check.
        // Profile loading is best-effort and should not block the dashboard.
        isLoading: sessionLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Kept for backward compatibility if imported elsewhere
export const useDevMock = () => null;
