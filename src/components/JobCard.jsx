import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  Wallet,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function JobCard({ job }) {
  const { isSaved, toggleSaveJob } = useAuth();
  const saved = isSaved(job.id);

  return (
    <article className="job-card group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-extrabold shadow-sm"
          style={{
            color: job.brand,
            backgroundColor: `${job.brand}12`,
          }}
        >
          {job.initials}
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          {job.featured && (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
              Featured
            </span>
          )}
          <button
            onClick={() => toggleSaveJob(job.id)}
            aria-label={saved ? "Remove saved job" : "Save job"}
            title={saved ? "Remove saved job" : "Save job"}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
              saved
                ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                : "border-slate-200 text-slate-500 hover:border-indigo-200 hover:text-indigo-600"
            }`}
          >
            <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="mt-5">
        <Link
          to={`/jobs/${job.id}`}
          className="font-display text-lg font-extrabold leading-snug text-slate-900 transition group-hover:text-indigo-600"
        >
          {job.title}
        </Link>
        <p className="mt-1.5 text-sm font-semibold text-slate-500">
          {job.company}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <MapPin size={14} /> {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <BriefcaseBusiness size={14} /> {job.experience}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-700">
          {job.type}
        </span>
        {job.remote && (
          <span className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">
            Remote friendly
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div>
          <p className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
            <Wallet size={15} className="text-indigo-600" />
            {job.salary}
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
            <Clock3 size={12} /> {job.posted}
          </p>
        </div>

        <Link
          to={`/jobs/${job.id}`}
          className="flex shrink-0 items-center gap-1 rounded-xl bg-slate-900 px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-600 sm:px-4 sm:text-sm"
        >
          Details <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}