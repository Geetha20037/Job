import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    navigate(location.state?.from || "/dashboard", { replace: true });
  }

  return (
    <section className="auth-bg flex min-h-[75vh] items-center py-12 sm:py-16">
      <div className="page-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="hidden lg:block">
          <span className="eyebrow">Welcome back</span>
          <h1 className="mt-5 max-w-lg font-display text-5xl font-extrabold leading-tight tracking-tight text-slate-950">
            Your next opportunity is waiting.
          </h1>
          <p className="mt-5 max-w-md text-base leading-8 text-slate-600">
            Sign in to explore jobs, save interesting roles, and keep track of
            your applications in one place.
          </p>

          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-white bg-white/80 p-5 shadow-sm">
            <span className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <BriefcaseBusiness size={24} />
            </span>
            <div>
              <p className="font-extrabold text-slate-900">
                One place for your career journey
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Jobs, saved roles, and applications.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-100/50 sm:p-9">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600">
            <BriefcaseBusiness size={19} /> JOBORA
          </Link>

          <h2 className="mt-6 font-display text-3xl font-extrabold text-slate-950">
            Welcome back
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Enter your details to access your candidate dashboard.
          </p>

          {error && (
            <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="login-email" className="text-sm font-bold text-slate-700">
                Email address
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-4 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
                <Mail size={18} className="shrink-0 text-slate-400" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full min-w-0 py-3.5 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="text-sm font-bold text-slate-700">
                Password
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-4 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
                <LockKeyhole size={18} className="shrink-0 text-slate-400" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full min-w-0 py-3.5 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-slate-400 hover:text-indigo-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-4 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            New to JOBORA?{" "}
            <Link to="/signup" className="font-extrabold text-indigo-600 hover:text-indigo-800">
              Create an account
            </Link>
          </p>

          <p className="mt-5 text-center text-xs leading-5 text-slate-400">
            Demo project: an unregistered email can sign in with any non-empty
            password. Registered accounts use the password created during signup.
          </p>
        </div>
      </div>
    </section>
  );
}