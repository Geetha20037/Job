import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { jobs } from "../data/jobs";
import { useAuth } from "../context/AuthContext";
import JobCard from "../components/JobCard";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const { user, isSaved, toggleSaveJob, applyToJob, isApplied } = useAuth();

  const job = jobs.find((item) => item.id === id);

  if (!job) {
    return (
      <div className="page-container flex min-h-[55vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-3xl font-extrabold text-slate-900">
          Job not found
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          This opportunity may no longer be available.
        </p>
        <Link
          to="/jobs"
          className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white"
        >
          Browse jobs
        </Link>
      </div>
    );
  }

  const applied = isApplied(job.id);
  const saved = isSaved(job.id);

  function handleApply() {
    if (!user) {
      navigate("/login", {
        state: { from: `/jobs/${job.id}` },
      });
      return;
    }

    if (applied) {
      setMessage("You've already applied to this job.");
      return;
    }

    applyToJob(job.id);
    setMessage("Application recorded successfully! View it in your dashboard.");
  }

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-10 sm:py-14">
        <div className="page-container">
          <button
            onClick={() => navigate(-1)}
            className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-indigo-600"
          >
            <ArrowLeft size={17} /> Back
          </button>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4 sm:gap-5">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl font-extrabold sm:h-20 sm:w-20"
                style={{
                  color: job.brand,
                  backgroundColor: `${job.brand}14`,
                }}
              >
                {job.initials}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {job.featured && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      Featured
                    </span>
                  )}
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                    {job.category}
                  </span>
                </div>

                <h1 className="mt-3 font-display text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl lg:text-4xl">
                  {job.title}
                </h1>
                <p className="mt-2 font-semibold text-slate-600">
                  {job.company}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <MapPin size={16} /> {job.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <BriefcaseBusiness size={16} /> {job.type}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock3 size={16} /> {job.experience}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
              <button
                onClick={handleApply}
                disabled={applied}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-emerald-600"
              >
                {applied ? (
                  <>
                    <CheckCircle2 size={18} /> Applied
                  </>
                ) : (
                  <>
                    Apply now <ArrowRight size={18} />
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  toggleSaveJob(job.id);
                  setMessage(
                    saved ? "Job removed from saved jobs." : "Job saved successfully.",
                  );
                }}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600"
              >
                <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
                {saved ? "Saved" : "Save job"}
              </button>
            </div>
          </div>

          {message && (
            <div
              role="status"
              className="mt-5 rounded-xl border border-indigo-100 bg-white px-4 py-3 text-sm font-medium text-indigo-700"
            >
              {message}
              {message.includes("Application recorded") && (
                <Link to="/dashboard" className="ml-2 underline">
                  Open dashboard
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="section-space">
        <div className="page-container grid items-start gap-8 lg:grid-cols-[1fr_330px]">
          <div className="space-y-6">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                About this role
              </h2>
              <p className="mt-4 text-sm leading-8 text-slate-600">
                {job.description}
              </p>
              <p className="mt-3 text-sm leading-8 text-slate-600">
                {job.about}
              </p>

              <h3 className="mt-8 text-base font-extrabold text-slate-900">
                Key responsibilities
              </h3>
              <ul className="mt-4 space-y-3">
                {job.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-7 text-slate-600"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-1 shrink-0 text-emerald-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="mt-8 text-base font-extrabold text-slate-900">
                Requirements
              </h3>
              <ul className="mt-4 space-y-3">
                {job.requirements.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-7 text-slate-600"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-1 shrink-0 text-emerald-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                About {job.company}
              </h2>
              <div className="mt-5 flex items-center gap-4">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-extrabold"
                  style={{
                    color: job.brand,
                    backgroundColor: `${job.brand}12`,
                  }}
                >
                  {job.initials}
                </span>
                <div>
                  <p className="font-bold text-slate-900">{job.company}</p>
                  <p className="mt-1 text-sm text-slate-500">{job.category}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {job.about}
              </p>
              <Link
                to="/companies"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
              >
                Explore companies <ArrowRight size={16} />
              </Link>
            </article>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h2 className="font-display text-lg font-extrabold text-slate-900">
                Job overview
              </h2>
              <div className="mt-5 space-y-5">
                {[
                  {
                    Icon: Wallet,
                    label: "Salary range",
                    value: job.salary,
                  },
                  {
                    Icon: BriefcaseBusiness,
                    label: "Employment type",
                    value: job.type,
                  },
                  {
                    Icon: CalendarDays,
                    label: "Experience",
                    value: job.experience,
                  },
                  {
                    Icon: MapPin,
                    label: "Location",
                    value: job.location,
                  },
                  {
                    Icon: Clock3,
                    label: "Posted",
                    value: job.posted,
                  },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleApply}
                disabled={applied}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700 disabled:bg-emerald-600"
              >
                {applied ? "Already applied" : "Apply for this role"}{" "}
                {!applied && <ArrowRight size={17} />}
              </button>

              <p className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={14} /> Demo application tracker
              </p>
            </div>

            <div className="rounded-2xl bg-indigo-50 p-5">
              <h3 className="font-bold text-slate-900">
                Interested in more roles?
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore other opportunities that match your career goals.
              </p>
              <Link
                to="/jobs"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-indigo-600"
              >
                Browse jobs <ArrowRight size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-space bg-slate-50">
        <div className="page-container">
          <h2 className="font-display text-2xl font-extrabold text-slate-900">
            You might also like
          </h2>
          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {jobs
              .filter(
                (item) =>
                  item.id !== job.id &&
                  (item.category === job.category ||
                    item.type === job.type),
              )
              .slice(0, 3)
              .map((item) => (
                <JobCard key={item.id} job={item} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}