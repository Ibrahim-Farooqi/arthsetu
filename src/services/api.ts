import axios from 'axios';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';

// Create an Axios instance configured to communicate with the FastAPI backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15s timeout
});

// Request Interceptor: attach the current Supabase access token to every
// request. supabase-js keeps this fresh in local storage and auto-refreshes
// it in the background (autoRefreshToken: true in supabaseClient.ts), so we
// just read whatever session is current at request time.
api.interceptors.request.use(
  async (config) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor: Global Error Handling & 401 Redirects
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // If the request has _suppressSignOut flag (e.g. /auth/me profile fetch),
      // don't try to refresh or redirect — just reject so the caller can handle.
      if (originalRequest._suppressSignOut) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject})
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
         // supabase-js's autoRefreshToken normally handles this in the
         // background, but force a refresh here to cover the edge case
         // where the backend rejected a token that expired between the
         // request interceptor reading it and the server validating it.
         const { data, error: refreshError } = await supabase.auth.refreshSession();
         const newAccessToken = data.session?.access_token;

         if (refreshError || !newAccessToken) {
            throw refreshError ?? new Error('No session after refresh');
         }

         api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

         processQueue(null, newAccessToken);
         return api(originalRequest);
      } catch (refreshError) {
         processQueue(refreshError, null);
         await supabase.auth.signOut();
         localStorage.removeItem('user');
         window.location.href = '/login';
         return Promise.reject(refreshError);
      } finally {
         isRefreshing = false;
      }
    }
    
    if (error.response) {
      const { status } = error.response;
      if (status === 403) {
        toast.error('You do not have permission to perform this action.');
      } else if (status >= 500) {
        toast.error('A server error occurred. Please try again later.');
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

export default api;
