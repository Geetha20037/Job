import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const result = signup(name, email, password);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    navigate("/dashboard", { replace: true });
  }

  return (
    <section className="auth-bg flex min-h-[75vh] items-center py-12 sm:py-16">
      <div className="page-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="hidden lg:block">
          <span className="eyebrow">Start your journey</span>
          <h1 className="mt-5 max-w-lg font-display text-5xl font-extrabold leading-tight tracking-tight text-slate-950">
            A better career starts with one step.
          </h1>
          <p className="mt-5 max-w-md text-base leading-8 text-slate-600">
            Create your profile to keep your favorite roles and application
            activity together.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Explore curated demo job listings",
              "Save jobs for another time",
              "Track your application activity",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <CheckCircle2 size={19} className="text-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-100/50 sm:p-9">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600">
            <BriefcaseBusiness size={19} /> JOBORA
          </Link>

          <h2 className="mt-6 font-display text-3xl font-extrabold text-slate-950">
            Create your account
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Join JOBORA and start exploring new opportunities.
          </p>

          {error && (
            <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label htmlFor="signup-name" className="text-sm font-bold text-slate-700">
                Full name
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
                <UserRound size={18} className="shrink-0 text-slate-400" />
                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full min-w-0 py-3.5 text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className="text-sm font-bold text-slate-700">
                Email address
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
                <Mail size={18} className="shrink-0 text-slate-400" />
                <input
                  id="signup-email"
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
              <label htmlFor="signup-password" className="text-sm font-bold text-slate-700">
                Password
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
                <LockKeyhole size={18} className="shrink-0 text-slate-400" />
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  minLength={6}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
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

            <div>
              <label htmlFor="signup-confirm" className="text-sm font-bold text-slate-700">
                Confirm password
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
                <LockKeyhole size={18} className="shrink-0 text-slate-400" />
                <input
                  id="signup-confirm"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full min-w-0 py-3.5 text-sm outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-4 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-extrabold text-indigo-600 hover:text-indigo-800">
              Sign in
            </Link>
          </p>

          <p className="mt-5 text-center text-xs leading-5 text-slate-400">
            This demo stores account data in browser localStorage. It is not
            suitable for real user credentials.
          </p>
        </div>
      </div>
    </section>
  );
}