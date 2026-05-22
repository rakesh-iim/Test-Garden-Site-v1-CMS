import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { api } from '../lib/api';
import { AUTH_LOGOUT_EVENT, clearStoredToken, getStoredToken, storeToken } from '../lib/auth';

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
};

type LoginPayload = {
  email: string;
  password: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getStoredToken();

    if (!token) {
      setIsLoading(false);
      return;
    }

    api.get('/auth/me')
      .then((response) => {
        setUser(response.data?.data?.user ?? null);
      })
      .catch(() => {
        clearStoredToken();
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setUser(null);
    };

    window.addEventListener(AUTH_LOGOUT_EVENT, handleLogout);
    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, handleLogout);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    login: async ({ email, password }) => {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data?.token;
      const nextUser = response.data?.data?.user ?? null;

      if (!token || !nextUser) {
        throw new Error('Invalid login response.');
      }

      storeToken(token);
      setUser(nextUser);
    },
    logout: () => {
      clearStoredToken();
      setUser(null);
    },
  }), [isLoading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
