import { Link } from "react-router-dom";
import { ArrowRight, Bookmark, Search } from "lucide-react";
import JobCard from "../components/JobCard";
import { jobs } from "../data/jobs";
import { useAuth } from "../context/AuthContext";

export default function SavedJobs() {
  const { savedJobs } = useAuth();
  const savedJobList = jobs.filter((job) => savedJobs.includes(job.id));

  return (
    <>
      <section className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-12 sm:py-16">
        <div className="page-container">
          <span className="eyebrow">Your shortlist</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-slate-950 sm:text-5xl">
            Saved jobs.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Keep the roles you like in one place and come back to them whenever
            you're ready.
          </p>
        </div>
      </section>

      <section className="section-space">
        <div className="page-container">
          <div className="mb-7">
            <h2 className="font-display text-2xl font-extrabold text-slate-900">
              Your saved opportunities
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {savedJobList.length} saved{" "}
              {savedJobList.length === 1 ? "job" : "jobs"}
            </p>
          </div>

          {savedJobList.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {savedJobList.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center sm:py-20">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Bookmark size={28} />
              </span>
              <h3 className="mt-5 font-display text-xl font-extrabold text-slate-900">
                No saved jobs yet
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                When you find an interesting role, select the bookmark icon on
                its job card to save it here.
              </p>
              <Link
                to="/jobs"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700"
              >
                <Search size={17} /> Explore jobs <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}