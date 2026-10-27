import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CheckCircle2,
  Code2,
  MapPin,
  Megaphone,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  ChartNoAxesColumnIncreasing,
} from "lucide-react";
import JobCard from "../components/JobCard";
import { jobs, categories, companies } from "../data/jobs";

const iconMap = {
  Code2,
  ChartNoAxesCombined,
  Palette,
  Megaphone,
  ChartNoAxesColumnIncreasing,
  Users,
};

const categoryColors = {
  blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
  violet: "bg-violet-50 text-violet-600 group-hover:bg-violet-600",
  pink: "bg-pink-50 text-pink-600 group-hover:bg-pink-600",
  orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-600",
  emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600",
  amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-600",
};

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  function searchJobs(e) {
    e.preventDefault();
    const params = new URLSearchParams();

    if (keyword.trim()) params.set("search", keyword.trim());
    if (location.trim()) params.set("location", location.trim());

    navigate(`/jobs${params.toString() ? `?${params}` : ""}`);
  }

  const featuredJobs = jobs.filter((job) => job.featured).slice(0, 4);

  return (
    <>
      <section className="hero-bg relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="page-container relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-xs font-bold text-indigo-700 shadow-sm sm:text-sm">
              <Sparkles size={15} />
              Your next chapter starts here
            </div>

            <h1 className="mt-7 max-w-2xl font-display text-4xl font-extrabold leading-[1.13] tracking-tight text-slate-950 sm:text-5xl lg:text-[62px]">
              Find work that
              <span className="relative mt-1 block text-indigo-600">
                moves you forward.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Discover meaningful opportunities at companies you'll love.
              Your skills deserve the right place to shine.
            </p>

            <form
              onSubmit={searchJobs}
              className="mt-8 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl shadow-indigo-100/60 sm:p-3"
            >
              <div className="grid gap-2 md:grid-cols-[1fr_0.85fr_auto] md:items-center">
                <label className="flex min-w-0 items-center gap-3 rounded-xl px-3 py-3 transition focus-within:bg-slate-50">
                  <Search className="shrink-0 text-indigo-500" size={20} />
                  <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Job title, skills or company"
                    aria-label="Search job title, skills or company"
                    className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </label>

                <label className="flex min-w-0 items-center gap-3 rounded-xl border-t border-slate-100 px-3 py-3 transition focus-within:bg-slate-50 md:border-l md:border-t-0">
                  <MapPin className="shrink-0 text-indigo-500" size={20} />
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City or remote"
                    aria-label="Search job location"
                    className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </label>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-indigo-700 md:py-3.5"
                >
                  Find jobs <ArrowRight size={17} />
                </button>
              </div>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500 sm:text-sm">
              <span className="font-semibold text-slate-700">Popular:</span>
              {["Frontend Developer", "Remote", "UI/UX Designer"].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() =>
                      navigate(`/jobs?search=${encodeURIComponent(term)}`)
                    }
                    className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 transition hover:border-indigo-200 hover:text-indigo-600"
                  >
                    {term}
                  </button>
                ),
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-500" />
                Curated opportunities
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-emerald-500" />
                Simple job discovery
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-5 text-white shadow-2xl shadow-indigo-300/50 sm:p-8">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
              <div className="absolute -right-4 -top-4 h-40 w-40 rounded-full border border-white/10" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-indigo-100">
                    Opportunity spotlight
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                    Make your next move.
                  </h2>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-indigo-100">
                    Great roles. Good people. A better next step.
                  </p>
                </div>
                <span className="rounded-2xl bg-white/15 p-3">
                  <BriefcaseBusiness size={26} />
                </span>
              </div>

              <div className="relative mt-8 space-y-3">
                {[
                  {
                    name: "Senior Frontend Developer",
                    company: "Stripe",
                    color: "#635bff",
                    initials: "S",
                    salary: "₹18–28 LPA",
                  },
                  {
                    name: "Product Designer",
                    company: "Figma",
                    color: "#f24e1e",
                    initials: "F",
                    salary: "₹12–20 LPA",
                  },
                  {
                    name: "Data Scientist",
                    company: "Google",
                    color: "#4285f4",
                    initials: "G",
                    salary: "₹20–35 LPA",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.12 }}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.10] p-3.5 backdrop-blur-sm sm:p-4"
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl font-extrabold"
                      style={{ color: item.color }}
                    >
                      {item.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{item.name}</p>
                      <p className="mt-1 text-xs text-indigo-100">
                        {item.company}
                      </p>
                    </div>
                    <ArrowUpRight size={18} className="shrink-0 text-indigo-100" />
                  </motion.div>
                ))}
              </div>

              <div className="relative mt-6 flex items-center justify-between border-t border-white/15 pt-5">
                <div>
                  <p className="text-xs text-indigo-100">Your next move</p>
                  <p className="mt-1 font-bold">Starts with a search.</p>
                </div>
                <Link
                  to="/jobs"
                  className="rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-indigo-700 transition hover:bg-indigo-50"
                >
                  Explore jobs
                </Link>
              </div>
            </div>

            <div className="absolute -left-5 top-24 hidden items-center gap-2 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-xl sm:flex">
              <span className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <CheckCircle2 size={18} />
              </span>
              Your next opportunity
            </div>

            <div className="absolute -bottom-5 -right-3 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl sm:flex">
              <span className="rounded-xl bg-amber-50 p-2 text-amber-600">
                <Sparkles size={20} />
              </span>
              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  Find your fit
                </p>
                <p className="text-xs text-slate-500">Explore new careers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-white">
        <div className="page-container grid grid-cols-2 gap-6 py-7 sm:grid-cols-4 sm:py-9">
          {[
            { value: "10K+", label: "Career opportunities" },
            { value: "500+", label: "Hiring companies" },
            { value: "50+", label: "Career categories" },
            { value: "24/7", label: "Explore anytime" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-extrabold text-slate-900 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="page-container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Explore opportunities</span>
              <h2 className="section-title mt-3">Find your kind of work.</h2>
              <p className="section-description">
                Explore roles that match your interests and skills.
              </p>
            </div>
            <Link
              to="/jobs"
              className="hidden items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 sm:flex"
            >
              All categories <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => {
              const Icon = iconMap[category.icon];

              return (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() =>
                    navigate(
                      `/jobs?category=${encodeURIComponent(category.name)}`,
                    )
                  }
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 sm:p-6"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition duration-300 group-hover:text-white ${categoryColors[category.color]}`}
                  >
                    <Icon size={23} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-extrabold text-slate-900">
                      {category.name}
                    </span>
                    <span className="mt-1.5 block text-sm leading-6 text-slate-500">
                      {category.description}
                    </span>
                    <span className="mt-3 flex items-center justify-between text-xs font-bold text-indigo-600">
                      {category.count} opportunities
                      <ArrowUpRight size={16} />
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          <Link
            to="/jobs"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 sm:hidden"
          >
            All categories <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="section-space bg-slate-50/80">
        <div className="page-container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Handpicked for you</span>
              <h2 className="section-title mt-3">Featured opportunities.</h2>
              <p className="section-description">
                Explore a selection of exciting roles from leading companies.
              </p>
            </div>
            <Link
              to="/jobs"
              className="hidden items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 sm:flex"
            >
              View all jobs <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <Link
            to="/jobs"
            className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600 sm:hidden"
          >
            Browse all jobs <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="section-space">
        <div className="page-container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Great places to work</span>
              <h2 className="section-title mt-3">Meet your next team.</h2>
              <p className="section-description">
                Discover companies building products that make a difference.
              </p>
            </div>
            <Link
              to="/companies"
              className="hidden items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 sm:flex"
            >
              All companies <ArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {companies.map((company) => (
              <Link
                key={company.name}
                to="/companies"
                className="group rounded-2xl border border-slate-200 bg-white p-4 text-center transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg sm:p-5"
              >
                <span
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-extrabold transition group-hover:scale-105"
                  style={{
                    color: company.brand,
                    backgroundColor: `${company.brand}12`,
                  }}
                >
                  {company.initials}
                </span>
                <p className="mt-4 truncate text-sm font-extrabold text-slate-900">
                  {company.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {company.openings} openings
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="page-container">
          <div className="relative overflow-hidden rounded-[28px] bg-slate-950 px-6 py-12 text-white sm:px-12 sm:py-14 lg:px-16">
            <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl" />
            <div className="absolute -bottom-36 left-1/3 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-indigo-200">
                  <Sparkles size={14} /> Your future is worth exploring
                </span>
                <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                  One search could change everything.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                  Take the next step in your career. Explore opportunities and
                  discover where your skills can take you.
                </p>
              </div>

              <Link
                to="/jobs"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-indigo-400"
              >
                Start exploring <ArrowDownRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}