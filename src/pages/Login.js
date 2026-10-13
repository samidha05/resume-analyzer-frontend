import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Mail, Lock, AlertCircle, Sparkles, ArrowRight,
  Eye, EyeOff, Zap, Shield, Star, ChevronDown, User
} from 'lucide-react';

/* ── Email suggestion dropdown ── */
function EmailSuggestions({ value, suggestions, onSelect, visible }) {
  if (!visible || suggestions.length === 0) return null;
  const filtered = suggestions.filter(e =>
    e.toLowerCase().includes(value.toLowerCase()) && e !== value
  );
  if (filtered.length === 0) return null;

  return (
    <ul className="absolute z-50 left-0 right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden">
      {filtered.map((email) => (
        <li key={email}>
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); onSelect(email); }}
            className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-sky-600 flex items-center justify-center flex-shrink-0">
              <User className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-gray-700 dark:text-gray-200 font-medium truncate">{email}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

const Login = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { login, getKnownEmails } = useAuth();
  const navigate         = useNavigate();
  const emailRef         = useRef(null);
  const knownEmails      = getKnownEmails();

  /* close suggestions when clicking outside */
  useEffect(() => {
    const handler = (e) => {
      if (emailRef.current && !emailRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ── email/password login ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden bg-gradient-to-br from-blue-600 via-sky-600 to-indigo-700">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:24px_24px]" />

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm shadow-2xl mb-8 animate-float">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-black text-white mb-4 leading-tight">
            CareerCraft
          </h1>
          <p className="text-lg text-white/80 max-w-sm mx-auto leading-relaxed mb-10">
            Supercharge your job search with AI-powered resume analysis and interview preparation.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Resumes Analyzed', value: '10K+', icon: '📄' },
              { label: 'Interview Questions', value: '500+', icon: '🎯' },
              { label: 'Success Rate',        value: '94%',  icon: '⭐' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/25 transition-all duration-300 hover:scale-105">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-white/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3">
            {[
              { icon: Zap,    text: 'Ultra-fast Groq AI — 2-3 second analysis' },
              { icon: Shield, text: 'Secure & private — your data is safe' },
              { icon: Star,   text: '38+ IT roles for mock interviews' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-3">
                <Icon className="h-5 w-5 text-blue-300 flex-shrink-0" />
                <span className="text-sm text-white/90">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-slate-50 dark:bg-gray-950">
        <div className="w-full max-w-md animate-slide-up">

          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-600 shadow-lg mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
              CareerCraft
            </h1>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
            {/* Header */}
            <div className="mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-600 flex items-center justify-center mb-4 shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">Welcome back 👋</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Sign in to continue your journey</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl flex items-center space-x-3 text-red-700 dark:text-red-400 animate-fade-in">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

                    {/* Divider */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        sign in with email
                      </span>
                      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                    </div>

            {/* ── Email / Password form ── */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email with suggestion dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative" ref={emailRef}>
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                    required
                    autoComplete="email"
                    className="w-full pl-12 pr-10 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all outline-none hover:border-blue-300 dark:hover:border-blue-700"
                    placeholder="you@example.com"
                  />
                  {/* Dropdown chevron — only show when there are suggestions */}
                  {knownEmails.length > 0 && (
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowSuggestions(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showSuggestions ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                  <EmailSuggestions
                    value={email}
                    suggestions={knownEmails}
                    visible={showSuggestions}
                    onSelect={(e) => { setEmail(e); setShowSuggestions(false); }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white transition-all outline-none hover:border-blue-300 dark:hover:border-blue-700"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 hover:from-blue-600 hover:via-sky-600 hover:to-indigo-600 text-white font-bold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <><span>Sign In</span><ArrowRight className="h-5 w-5" /></>}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                Create one free →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;