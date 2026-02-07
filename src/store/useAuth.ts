import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
}
type Plan = 'Free' | 'Pro' | 'Business';
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  plan: Plan;
  login: (userData: User) => void;
  register: (userData: User) => void;
  logout: () => void;
  setPlan: (plan: Plan) => void;
}
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      plan: 'Free',
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      register: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false, plan: 'Free' }),
      setPlan: (plan) => set({ plan }),
    }),
    {
      name: 'onyx-auth-storage',
    }
  )
);