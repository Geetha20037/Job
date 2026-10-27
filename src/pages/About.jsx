import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const values = [
  {
    Icon: Target,
    title: "Purposeful discovery",
    description:
      "Make it easier to discover roles that fit your skills, goals, and ambitions.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    Icon: HeartHandshake,
    title: "People first",
    description:
      "Create a welcoming experience for candidates exploring their next step.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    Icon: Lightbulb,
    title: "Keep growing",
    description:
      "Encourage curiosity, learning, and new possibilities at every career stage.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    Icon: ShieldCheck,
    title: "Clarity matters",
    description:
      "Present important job information clearly so candidates can explore options.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-24">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="page-container relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-indigo-200">
            <Sparkles size={15} /> About JOBORA
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
            Careers are more than just a job title.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            JOBORA is a job discovery platform concept designed to make
            exploring career opportunities feel clearer, simpler, and more
            inspiring.
          </p>
          <Link
            to="/jobs"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-indigo-400"
          >
            Discover opportunities <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="section-space">
        <div className="page-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">Why we exist</span>
            <h2 className="section-title mt-4">
              Finding the right opportunity should feel exciting.
            </h2>
            <p className="mt-5 text-sm leading-8 text-slate-600 sm:text-base">
              Searching for a job is an important part of building your
              future. JOBORA brings job discovery, useful filters, company
              information, and saved opportunities together in one clear
              experience.
            </p>
            <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
              Whether you are beginning your career, exploring a new field, or
              looking for your next challenge, the goal is to help you explore
              your options with confidence.
            </p>

            <div className="mt-7 flex items-start gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5">
              <span className="rounded-xl bg-white p-3 text-indigo-600 shadow-sm">
                <Compass size={23} />
              </span>
              <div>
                <h3 className="font-bold text-slate-900">Our mission</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Help people discover opportunities that move their careers
                  forward.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-indigo-600 to-violet-800 p-6 text-white sm:p-10">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-white/10" />
            <div className="relative">
              <span className="inline-flex rounded-2xl bg-white/15 p-4">
                <Users size={30} />
              </span>
              <h3 className="mt-8 font-display text-3xl font-extrabold">
                Every career has a next chapter.
              </h3>
              <p className="mt-4 text-sm leading-7 text-indigo-100">
                Explore new possibilities, find inspiration, and take your next
                step with JOBORA.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  ["Explore", "New opportunities"],
                  ["Discover", "Leading companies"],
                  ["Organize", "Saved jobs"],
                  ["Track", "Applications"],
                ].map(([title, subtitle]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4"
                  >
                    <p className="font-extrabold">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-indigo-100">
                      {subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-slate-50">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">What guides us</span>
            <h2 className="section-title mt-3">Built around your journey.</h2>
            <p className="section-description mx-auto">
              A thoughtful job discovery experience begins with the right
              principles.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, description, color }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}
                >
                  <Icon size={23} />
                </span>
                <h3 className="mt-5 font-display text-lg font-extrabold text-slate-900">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="page-container">
          <div className="rounded-[28px] bg-indigo-600 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              Ready to find your next opportunity?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-indigo-100 sm:text-base">
              Start exploring jobs, discover companies, and keep track of the
              opportunities that interest you.
            </p>
            <Link
              to="/jobs"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-extrabold text-indigo-700 transition hover:bg-indigo-50"
            >
              Browse jobs <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}