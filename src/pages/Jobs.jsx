import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BriefcaseBusiness, Search, SlidersHorizontal } from "lucide-react";
import { jobs } from "../data/jobs";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";

export default function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("search") || "");
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    type: "",
    experience: "",
    salary: "0",
    category: searchParams.get("category") || "",
  });

  const [sort, setSort] = useState("recent");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    const term = keyword.trim().toLowerCase();

    return jobs
      .filter((job) => {
        const matchesKeyword =
          !term ||
          [
            job.title,
            job.company,
            job.category,
            job.description,
            job.location,
          ].some((value) => value.toLowerCase().includes(term));

        const matchesLocation =
          !filters.location ||
          job.location.toLowerCase().includes(filters.location.toLowerCase());

        const matchesType = !filters.type || job.type === filters.type;
        const matchesExperience =
          !filters.experience || job.experience === filters.experience;
        const matchesSalary = job.salaryMin >= Number(filters.salary);
        const matchesCategory =
          !filters.category || job.category === filters.category;

        return (
          matchesKeyword &&
          matchesLocation &&
          matchesType &&
          matchesExperience &&
          matchesSalary &&
          matchesCategory
        );
      })
      .sort((a, b) => {
        if (sort === "salary") return b.salaryMax - a.salaryMax;
        if (sort === "company") return a.company.localeCompare(b.company);
        return 0;
      });
  }, [keyword, filters, sort]);

  function handleSearch(e) {
    e.preventDefault();
    const next = new URLSearchParams();

    if (keyword.trim()) next.set("search", keyword.trim());
    if (filters.location.trim()) next.set("location", filters.location.trim());
    if (filters.category) next.set("category", filters.category);

    setSearchParams(next);
  }

  return (
    <>
      <section className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-12 sm:py-16">
        <div className="page-container">
          <span className="eyebrow">Your next opportunity</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Find a role that fits you.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Explore open positions, compare opportunities, and discover your
            next career move.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-7 grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-indigo-100/50 sm:grid-cols-[1fr_0.7fr_auto]"
          >
            <label className="flex items-center gap-3 rounded-xl px-3 py-2 focus-within:bg-slate-50">
              <Search size={20} className="shrink-0 text-indigo-500" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, skill or company"
                aria-label="Search jobs"
                className="w-full min-w-0 bg-transparent py-2 text-sm outline-none"
              />
            </label>

            <label className="flex items-center gap-3 rounded-xl border-t border-slate-100 px-3 py-2 focus-within:bg-slate-50 sm:border-l sm:border-t-0">
              <BriefcaseBusiness size={20} className="shrink-0 text-indigo-500" />
              <input
                value={filters.location}
                onChange={(e) =>
                  setFilters((current) => ({
                    ...current,
                    location: e.target.value,
                  }))
                }
                placeholder="City or remote"
                aria-label="Filter by location"
                className="w-full min-w-0 bg-transparent py-2 text-sm outline-none"
              />
            </label>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700"
            >
              Search jobs
            </button>
          </form>
        </div>
      </section>

      <section className="section-space">
        <div className="page-container">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-slate-900">
                Explore jobs
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredJobs.length} opportunities found
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 lg:hidden"
              >
                <SlidersHorizontal size={17} />
                {mobileFiltersOpen ? "Hide filters" : "Filters"}
              </button>

              <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2">
                <span className="whitespace-nowrap text-xs font-semibold text-slate-500">
                  Sort by
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="max-w-40 bg-transparent py-1 text-sm font-bold text-slate-700 outline-none"
                >
                  <option value="recent">Recommended</option>
                  <option value="salary">Highest salary</option>
                  <option value="company">Company name</option>
                </select>
              </label>
            </div>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[270px_1fr] xl:gap-8">
            <div
              className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block`}
            >
              <JobFilters filters={filters} setFilters={setFilters} />
            </div>

            <div className="min-w-0">
              {filteredJobs.length ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Search size={25} />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-slate-900">
                    No jobs found
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Try another keyword or clear some filters to see more
                    opportunities.
                  </p>
                  <button
                    onClick={() => {
                      setKeyword("");
                      setFilters({
                        location: "",
                        type: "",
                        experience: "",
                        salary: "0",
                        category: "",
                      });
                      setSearchParams({});
                    }}
                    className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {filteredJobs.length > 0 && (
                <p className="mt-6 text-center text-xs text-slate-400">
                  You're viewing matching demo opportunities from JOBORA.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}