import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import { companies, jobs } from "../data/jobs";

export default function Companies() {
  const [search, setSearch] = useState("");

  const filteredCompanies = useMemo(
    () =>
      companies.filter((company) =>
        `${company.name} ${company.industry} ${company.location}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <>
      <section className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-14 sm:py-20">
        <div className="page-container text-center">
          <span className="eyebrow">Meet your future team</span>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Great companies. Exciting possibilities.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Explore organizations, learn about their work, and find a role
            where you can make an impact.
          </p>

          <label className="mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-lg shadow-indigo-100/50">
            <Search size={20} className="shrink-0 text-indigo-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies or industries..."
              aria-label="Search companies"
              className="w-full min-w-0 py-3 text-sm outline-none"
            />
          </label>
        </div>
      </section>

      <section className="section-space">
        <div className="page-container">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-slate-900">
                Popular companies
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredCompanies.length} companies to explore
              </p>
            </div>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
            >
              Browse all jobs <ArrowRight size={17} />
            </Link>
          </div>

          {filteredCompanies.length ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCompanies.map((company) => {
                const companyJobs = jobs.filter(
                  (job) => job.company === company.name,
                );

                return (
                  <article
                    key={company.name}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/40 sm:p-6"
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl font-extrabold"
                        style={{
                          color: company.brand,
                          backgroundColor: `${company.brand}12`,
                        }}
                      >
                        {company.initials}
                      </span>
                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                        Hiring
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-xl font-extrabold text-slate-900">
                      {company.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-indigo-600">
                      {company.industry}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-slate-500">
                      {company.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} /> {company.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={14} /> {company.openings} openings
                      </span>
                    </div>

                    <Link
                      to={`/jobs?search=${encodeURIComponent(company.name)}`}
                      className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-700"
                    >
                      {companyJobs.length
                        ? `View ${companyJobs.length} matching demo roles`
                        : "Explore opportunities"}
                      <ArrowRight size={17} />
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-10 text-center">
              <Building2 className="mx-auto text-slate-400" size={32} />
              <p className="mt-4 font-bold text-slate-800">
                No companies match your search
              </p>
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-sm font-bold text-indigo-600"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}