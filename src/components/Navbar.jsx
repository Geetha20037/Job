import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  ChevronDown,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Home", to: "/" },
  { label: "Find Jobs", to: "/jobs" },
  { label: "Companies", to: "/companies" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout, savedJobs } = useAuth();
  const navigate = useNavigate();

  function signOut() {
    logout();
    setProfileOpen(false);
    setMenuOpen(false);
    navigate("/");
  }

  const navClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${
      isActive
        ? "text-indigo-600"
        : "text-slate-600 hover:text-indigo-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="page-container flex h-[72px] items-center justify-between gap-4">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <BriefcaseBusiness size={21} strokeWidth={2.4} />
          </span>
          <span className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
            jobora<span className="text-indigo-600">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/saved"
            aria-label="Saved jobs"
            className="relative rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            <Heart size={20} />
            {savedJobs.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold text-white">
                {savedJobs.length}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 transition hover:border-indigo-200 hover:bg-indigo-50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 font-bold text-indigo-700">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-28 truncate text-sm font-semibold text-slate-800">
                  {user.name}
                </span>
                <ChevronDown size={15} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <div className="border-b border-slate-100 px-3 py-3">
                    <p className="truncate text-sm font-bold">{user.name}</p>
                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                  >
                    <LayoutDashboard size={17} /> My dashboard
                  </Link>
                  <button
                    onClick={signOut}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={17} /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-100 bg-white p-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/saved"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              <Heart size={18} /> Saved jobs ({savedJobs.length})
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <UserRound size={18} /> My dashboard
                </Link>
                <button
                  onClick={signOut}
                  className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Sign out
                </button>
              </>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl border border-slate-200 px-3 py-3 text-center text-sm font-bold"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-indigo-600 px-3 py-3 text-center text-sm font-bold text-white"
                >
                  Get started
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}