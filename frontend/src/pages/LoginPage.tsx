import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login({ email, password });
      const target = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/dashboard';
      navigate(target, { replace: true });
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? (err.response?.data?.message || err.message)
        : err instanceof Error
          ? err.message
          : 'Unable to log in.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page flex items-center justify-center px-6">
      <div className="login-card w-full max-w-md p-8">
        <div className="flex items-center gap-3 text-white">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center px-3 shadow-[0_10px_30px_rgba(0,0,0,0.22)] shrink-0">
            <img src="/logo-cropped.png" alt="MrGardenr" className="h-9 w-auto object-contain" />
          </div>
          <div>
            <h1 className="text-[24px] font-semibold">CMS Login</h1>
            <p className="text-[13px] text-white/55 mt-1">Sign in to manage website content and media.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-[13px] text-white/70 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="login-input"
              placeholder="admin@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <label className="block text-[13px] text-white/70 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="login-input"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          {error ? (
            <div className="text-[13px] text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </div>
          ) : null}

          <button type="submit" disabled={isSubmitting} className="login-btn">
            {isSubmitting ? <Loader2 className="w-4 h-4 spin" /> : null}
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};
