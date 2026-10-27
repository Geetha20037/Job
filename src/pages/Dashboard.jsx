import { Link, Navigate } from "react-router-dom";
import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  Search,
  UserRound,
} from "lucide-react";
import { jobs } from "../data/jobs";
import { useAuth } from "../context/AuthContext";
import JobCard from "../components/JobCard";

export default function Dashboard() {
  const { user, savedJobs, appliedJobs } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const appliedJobList = appliedJobs
    .map((application) => ({
      ...application,
      job: jobs.find((job) => job.id === application.jobId),
    }))
    .filter((application) => application.job);

  const savedJobList = jobs.filter((job) => savedJobs.includes(job.id));

  const stats = [
    {
      label: "Applications",
      value: appliedJobList.length,
      Icon: BriefcaseBusiness,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Saved jobs",
      value: savedJobList.length,
      Icon: Bookmark,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Profile",
      value: "Active",
      Icon: UserRound,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-10 sm:py-14">
        <div className="page-container">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="eyebrow">Candidate workspace</span>
              <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Welcome, {user.name.split(" ")[0]}!
              </h1>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Here's an overview of your job search activity.
              </p>
            </div>

            <Link
              to="/jobs"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              Find new jobs <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-container">
          <div className="grid gap-5 sm:grid-cols-3">
            {stats.map(({ label, value, Icon, color }) => (
              <article
                key={label}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-lg sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-xl p-3 ${color}`}>
                    <Icon size={23} />
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Your activity
                  </span>
                </div>
                <p className="mt-5 font-display text-3xl font-extrabold text-slate-950">
                  {value}
                </p>
                <p className="mt-1 text-sm text-slate-500">{label}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <UserRound size={22} />
                </span>
                <div>
                  <h2 className="font-display text-lg font-extrabold text-slate-900">
                    My profile
                  </h2>
                  <p className="text-xs text-slate-500">
                    Your account information
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">
                    Full name
                  </p>
                  <p className="mt-1 break-words text-sm font-bold text-slate-900">
                    {user.name}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">
                    Email address
                  </p>
                  <p className="mt-1 break-all text-sm font-bold text-slate-900">
                    {user.email}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  <CheckCircle2 size={17} /> Signed in successfully
                </div>
              </div>

              <p className="mt-5 text-xs leading-5 text-slate-400">
                This is a demo candidate profile. Profile editing and server
                authentication are not included.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-extrabold text-slate-900">
                    Recent applications
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Jobs you've applied to
                  </p>
                </div>
                <span className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <LayoutDashboard size={21} />
                </span>
              </div>

              {appliedJobList.length ? (
                <div className="mt-5 space-y-3">
                  {appliedJobList.map((application) => (
                    <article
                      key={application.jobId}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 sm:p-4"
                    >
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-extrabold"
                        style={{
                          color: application.job.brand,
                          backgroundColor: `${application.job.brand}12`,
                        }}
                      >
                        {application.job.initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <Link
                          to={`/jobs/${application.job.id}`}
                          className="block truncate text-sm font-bold text-slate-900 hover:text-indigo-600"
                        >
                          {application.job.title}
                        </Link>
                        <p className="mt-1 truncate text-xs text-slate-500">
                          {application.job.company}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                          <CalendarDays size={12} />
                          {new Date(application.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="rounded-lg bg-emerald-50 px-2 py-1.5 text-center text-[10px] font-bold text-emerald-700 sm:text-xs">
                        Submitted
                      </span>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-slate-200 px-5 py-9 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                    <BriefcaseBusiness size={23} />
                  </span>
                  <p className="mt-4 text-sm font-bold text-slate-800">
                    No applications yet
                  </p>
                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    Apply to a job to see it listed here.
                  </p>
                  <Link
                    to="/jobs"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-indigo-600"
                  >
                    Browse jobs <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </section>
          </div>

          <section className="mt-8">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-slate-900">
                  Your saved jobs
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Pick up where you left off.
                </p>
              </div>
              <Link
                to="/saved"
                className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600"
              >
                All saved jobs <ArrowRight size={16} />
              </Link>
            </div>

            {savedJobList.length ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {savedJobList.slice(0, 3).map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
                <span className="rounded-xl bg-amber-50 p-3 text-amber-600">
                  <Bookmark size={23} />
                </span>
                <h3 className="mt-4 font-bold text-slate-900">
                  Your shortlist is empty
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Save interesting jobs to compare them later.
                </p>
                <Link
                  to="/jobs"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-indigo-600"
                >
                  Explore jobs <Search size={16} />
                </Link>
              </div>
            )}
          </section>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <Clock3 size={19} className="mt-0.5 shrink-0 text-blue-600" />
            <p className="text-xs leading-6 text-blue-800 sm:text-sm">
              Application statuses in this project are demo records stored in
              your browser. They do not represent real applications submitted
              to employers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}