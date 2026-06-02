import React from "react";
import StatsInfo from "./statsInfo";

const metrics = [
  { id: 1, stat: "18", emphasis: "Member countries", icon: "fa-solid fa-globe-europe" },
  { id: 2, stat: "50+", emphasis: "Local Committees", icon: "fa-solid fa-city" },
  { id: 3, stat: "1K+", emphasis: "Internships", icon: "fa-solid fa-briefcase" },
  { id: 4, stat: "1.5K+", emphasis: "Student Members", icon: "fa-solid fa-users" },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-[#143D59] py-20">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover opacity-20"
          src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
          alt="People working on laptops"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#143D59] via-[#1B75BB]/90 to-[#49C0B5]/80 mix-blend-multiply" />
      </div>

      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-[#49C0B5]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
          <div>
            <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-2xl text-white backdrop-blur">
              <i className="fa-solid fa-circle-info" />
            </span>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-white/70">
              About us
            </p>

            <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-5xl">
              Helping students discover opportunities across Europe.
            </h2>

            <div className="mt-8 space-y-6 text-white/85">
              <StatsInfo id={1} />
              <StatsInfo id={2} />
            </div>

            <div className="mt-10">
              <a
                href="https://iaeste.org/internships"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-2xl bg-white px-6 py-3 font-bold text-[#1B75BB] shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-xl"
              >
                Explore internships
                <i className="fa-solid fa-arrow-up-right-from-square ml-3 text-sm" />
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {metrics.map((item) => (
              <div
                key={item.id}
                className="rounded-[2rem] border border-white/20 bg-white/10 p-6 text-white shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/15"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl">
                  <i className={item.icon} />
                </span>

                <span className="block text-4xl font-black">
                  {item.stat}
                </span>

                <span className="mt-2 block text-sm font-semibold uppercase tracking-wide text-white/70">
                  {item.emphasis}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}