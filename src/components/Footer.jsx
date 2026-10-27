
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  ArrowRight,
  MapPin,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-700">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-2 text-xl font-extrabold text-slate-900"
          >
            <span className="rounded-xl bg-indigo-600 p-2 text-white">
              <BriefcaseBusiness size={21} />
            </span>
            JOBORA
          </Link>
          <p className="max-w-xs text-sm leading-6 text-slate-500">
            Discover opportunities, connect with great companies, and take
            the next step in your career with JOBORA.
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-indigo-600"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-indigo-600"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-indigo-600"
            >
              Facebook
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-slate-900">Explore</h3>
          <ul className="space-y-3 text-sm text-slate-500">
            <li><Link className="hover:text-indigo-600" to="/">Home</Link></li>
            <li><Link className="hover:text-indigo-600" to="/jobs">Find Jobs</Link></li>
            <li><Link className="hover:text-indigo-600" to="/companies">Companies</Link></li>
            <li><Link className="hover:text-indigo-600" to="/about">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-slate-900">For Job Seekers</h3>
          <ul className="space-y-3 text-sm text-slate-500">
            <li><Link className="hover:text-indigo-600" to="/saved">Saved Jobs</Link></li>
            <li><Link className="hover:text-indigo-600" to="/dashboard">My Dashboard</Link></li>
            <li><Link className="hover:text-indigo-600" to="/login">Sign In</Link></li>
            <li><Link className="hover:text-indigo-600" to="/signup">Create Account</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-slate-900">Get in Touch</h3>
          <div className="space-y-4 text-sm text-slate-500">
            <p className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-indigo-600" />
              Connecting talent with opportunities worldwide.
            </p>
            <a
              href="mailto:hello@jobora.com"
              className="flex items-center gap-3 transition hover:text-indigo-600"
            >
              <Mail size={18} className="shrink-0 text-indigo-600" />
              hello@jobora.com
            </a>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Explore opportunities <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} JOBORA. All rights reserved.</p>
          <p>Made for your next career move.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
