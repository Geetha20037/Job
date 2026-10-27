import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { categories } from "../data/jobs";

const fieldClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50";

export default function JobFilters({ filters, setFilters }) {
  function update(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function reset() {
    setFilters({
      location: "",
      type: "",
      experience: "",
      salary: "0",
      category: "",
    });
  }

  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-slate-900">
          <SlidersHorizontal size={19} className="text-indigo-600" />
          Filters
        </h2>
        <button
          onClick={reset}
          className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="filter-location" className="text-sm font-bold text-slate-700">
            Location
          </label>
          <input
            id="filter-location"
            className={fieldClass}
            placeholder="e.g. Bengaluru"
            value={filters.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="filter-category" className="text-sm font-bold text-slate-700">
            Category
          </label>
          <select
            id="filter-category"
            className={fieldClass}
            value={filters.category}
            onChange={(e) => update("category", e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-type" className="text-sm font-bold text-slate-700">
            Job type
          </label>
          <select
            id="filter-type"
            className={fieldClass}
            value={filters.type}
            onChange={(e) => update("type", e.target.value)}
          >
            <option value="">All job types</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>

        <div>
          <label htmlFor="filter-experience" className="text-sm font-bold text-slate-700">
            Experience
          </label>
          <select
            id="filter-experience"
            className={fieldClass}
            value={filters.experience}
            onChange={(e) => update("experience", e.target.value)}
          >
            <option value="">Any experience</option>
            <option value="Fresher">Fresher</option>
            <option value="1-3 years">1–3 years</option>
            <option value="2-4 years">2–4 years</option>
            <option value="2-5 years">2–5 years</option>
            <option value="3-5 years">3–5 years</option>
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="filter-salary" className="text-sm font-bold text-slate-700">
              Minimum salary
            </label>
            <span className="text-sm font-extrabold text-indigo-600">
              {filters.salary === "0" ? "Any" : `₹${filters.salary} LPA+`}
            </span>
          </div>
          <input
            id="filter-salary"
            type="range"
            min="0"
            max="30"
            step="2"
            value={filters.salary}
            onChange={(e) => update("salary", e.target.value)}
            className="mt-4 w-full cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>Any salary</span>
            <span>₹30 LPA+</span>
          </div>
        </div>
      </div>
    </aside>
  );
}